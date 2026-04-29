// ─────────────────────────────────────────────────────────────────────────────
// Fio Raiz — Edge Function: enviar-receita
// Gera PDF, salva no Storage, envia por email (Resend) e WhatsApp (Z-API)
// Secrets necessários (Supabase Dashboard > Edge Functions > Secrets):
//   SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
//   RESEND_API_KEY
//   ZAPI_INSTANCE, ZAPI_TOKEN, ZAPI_CLIENT_TOKEN
// ─────────────────────────────────────────────────────────────────────────────

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { PDFDocument, rgb, StandardFonts } from "https://esm.sh/pdf-lib@1.17.1";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    // 1. Autenticação ─────────────────────────────────────────────────────────
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Não autorizado" }, 401);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return json({ error: "Não autorizado" }, 401);

    const { data: perfil } = await supabase
      .from("perfis")
      .select("role, nome, crm")
      .eq("id", user.id)
      .single();

    if (!perfil || !["medico", "admin"].includes(perfil.role)) {
      return json({ error: "Acesso negado" }, 403);
    }

    // 2. Payload ──────────────────────────────────────────────────────────────
    const { pedido_id, farmacia_id, medicamentos, observacoes } = await req.json();

    if (!pedido_id || !farmacia_id) {
      return json({ error: "pedido_id e farmacia_id são obrigatórios" }, 400);
    }

    const meds: Array<{ nome: string; posologia: string }> =
      Array.isArray(medicamentos) ? medicamentos : [];

    // 3. Buscar dados ─────────────────────────────────────────────────────────
    const { data: pedido } = await supabase
      .from("pedidos")
      .select("*, prontuario_id, pacientes(nome, cpf, data_nascimento, endereco)")
      .eq("id", pedido_id)
      .single();

    if (!pedido) return json({ error: "Pedido não encontrado" }, 404);

    const { data: farmacia } = await supabase
      .from("farmacias")
      .select("*")
      .eq("id", farmacia_id)
      .single();

    if (!farmacia) return json({ error: "Farmácia não encontrada" }, 404);

    // 4. Gerar PDF ────────────────────────────────────────────────────────────
    const hoje = new Date().toLocaleDateString("pt-BR");
    const pdfBytes = await gerarReceitaPDF({
      medico:       { nome: perfil.nome || "Médico(a)", crm: perfil.crm || "" },
      paciente:     pedido.pacientes || {},
      prontuario_id: pedido.prontuario_id || "—",
      medicamentos: meds,
      observacoes:  observacoes || "",
      data:         hoje,
    });

    // 5. Upload PDF (service role para ignorar RLS) ────────────────────────────
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const fileName = `receita-${pedido.prontuario_id}-${Date.now()}.pdf`;

    const { error: uploadErr } = await admin.storage
      .from("receitas-pdf")
      .upload(fileName, pdfBytes, { contentType: "application/pdf" });

    if (uploadErr) throw new Error(`Upload PDF: ${uploadErr.message}`);

    // URL assinada válida por 7 dias (farmácia precisa de tempo para processar)
    const { data: signed } = await admin.storage
      .from("receitas-pdf")
      .createSignedUrl(fileName, 7 * 24 * 3600);

    const pdfUrl = signed?.signedUrl ?? "";

    // 6. Enviar Email (Resend) ─────────────────────────────────────────────────
    let emailStatus = farmacia.email ? "erro" : "nao_configurado";

    if (farmacia.email) {
      try {
        const resendKey = Deno.env.get("RESEND_API_KEY");
        if (!resendKey) { emailStatus = "sem_chave"; }
        else {
          const r = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${resendKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from:    "Fio Raiz <receitas@fioraiz.com.br>",
              to:      [farmacia.email],
              subject: `📋 Receita ${pedido.prontuario_id} — ${pedido.pacientes?.nome ?? "Paciente"}`,
              html:    buildEmailHtml({
                pedido, farmacia,
                medico:      perfil,
                medicamentos: meds,
                observacoes:  observacoes || "",
                pdfUrl,
                data:         hoje,
              }),
            }),
          });
          emailStatus = r.ok ? "enviado" : "erro";
          if (!r.ok) console.error("Resend error:", await r.text());
        }
      } catch (e) {
        console.error("Email exception:", e);
        emailStatus = "erro";
      }
    }

    // 7. Enviar WhatsApp (Z-API) ───────────────────────────────────────────────
    let whatsappStatus = farmacia.whatsapp ? "erro" : "nao_configurado";

    if (farmacia.whatsapp) {
      try {
        const instance    = Deno.env.get("ZAPI_INSTANCE");
        const token       = Deno.env.get("ZAPI_TOKEN");
        const clientToken = Deno.env.get("ZAPI_CLIENT_TOKEN");

        if (!instance || !token) { whatsappStatus = "sem_chave"; }
        else {
          const numero = farmacia.whatsapp.replace(/\D/g, "");
          const waRes = await fetch(
            `https://api.z-api.io/instances/${instance}/token/${token}/send-document/pdf`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...(clientToken ? { "Client-Token": clientToken } : {}),
              },
              body: JSON.stringify({
                phone:    numero,
                document: pdfUrl,
                fileName: `Receita_${pedido.prontuario_id}.pdf`,
                caption:  buildWhatsAppMsg({ pedido, medico: perfil, medicamentos: meds, data: hoje }),
              }),
            }
          );
          whatsappStatus = waRes.ok ? "enviado" : "erro";
          if (!waRes.ok) console.error("Z-API error:", await waRes.text());
        }
      } catch (e) {
        console.error("WhatsApp exception:", e);
        whatsappStatus = "erro";
      }
    }

    // 8. Persistir no banco ───────────────────────────────────────────────────
    await admin.from("receitas").upsert({
      pedido_id,
      medico_id:       user.id,
      farmacia_id,
      farmacia_nome:   farmacia.nome,
      medicamentos,
      observacoes:     observacoes || "",
      pdf_url:         pdfUrl,
      whatsapp_status: whatsappStatus,
      email_status:    emailStatus,
      status:          "emitida",
    });

    await admin.from("pedidos")
      .update({ status: "prescrito", locked_at: null })
      .eq("id", pedido_id);

    return json({ ok: true, pdf_url: pdfUrl, email_status: emailStatus, whatsapp_status: whatsappStatus });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Edge Function fatal:", msg);
    return json({ error: msg }, 500);
  }
});

// ── PDF ───────────────────────────────────────────────────────────────────────
interface PdfInput {
  medico:        { nome: string; crm: string };
  paciente:      Record<string, unknown>;
  prontuario_id: string;
  medicamentos:  Array<{ nome: string; posologia: string }>;
  observacoes:   string;
  data:          string;
}

async function gerarReceitaPDF(input: PdfInput): Promise<Uint8Array> {
  const { medico, paciente, prontuario_id, medicamentos, observacoes, data } = input;

  const doc  = await PDFDocument.create();
  const page = doc.addPage([595.28, 841.89]); // A4
  const W = page.getWidth();
  const H = page.getHeight();

  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const reg  = await doc.embedFont(StandardFonts.Helvetica);

  const navy    = rgb(0.008, 0.114, 0.204); // #021d34
  const teal    = rgb(0.012, 0.176, 0.267); // #012e46
  const white   = rgb(1, 1, 1);
  const gray    = rgb(0.45, 0.45, 0.45);
  const lgray   = rgb(0.88, 0.88, 0.88);
  const black   = rgb(0.1, 0.1, 0.1);

  // ── Header ───────────────────────────────────────────────────────────────
  page.drawRectangle({ x: 0, y: H - 75, width: W, height: 75, color: navy });
  page.drawText("FIO RAIZ", { x: 40, y: H - 38, size: 20, font: bold, color: white });
  page.drawText("Plataforma de Saúde Capilar · fioraiz.com.br", { x: 40, y: H - 55, size: 8, font: reg, color: rgb(0.65, 0.78, 0.88) });
  page.drawText("RECEITA MÉDICA", { x: W - 155, y: H - 38, size: 10, font: bold, color: white });
  page.drawText(`Prontuário: ${prontuario_id}`, { x: W - 155, y: H - 53, size: 8, font: reg, color: rgb(0.7, 0.8, 0.9) });

  let y = H - 100;

  // ── Médico ────────────────────────────────────────────────────────────────
  page.drawText("MÉDICO RESPONSÁVEL", { x: 40, y, size: 7.5, font: bold, color: gray });
  y -= 15;
  page.drawText(`Dr(a). ${medico.nome}`, { x: 40, y, size: 13, font: bold, color: navy });
  y -= 14;
  page.drawText(`CRM: ${medico.crm || "—"}   ·   Especialidade: Tricologia`, { x: 40, y, size: 8.5, font: reg, color: gray });
  page.drawText(`Data: ${data}`, { x: W - 120, y: H - 100, size: 9, font: reg, color: gray });

  y -= 18;
  page.drawLine({ start: { x: 40, y }, end: { x: W - 40, y }, thickness: 0.5, color: lgray });

  // ── Paciente ──────────────────────────────────────────────────────────────
  y -= 18;
  page.drawText("DADOS DO PACIENTE", { x: 40, y, size: 7.5, font: bold, color: gray });
  y -= 15;
  page.drawText(String(paciente?.nome ?? "—"), { x: 40, y, size: 13, font: bold, color: navy });
  y -= 14;

  const nascStr = paciente?.data_nascimento
    ? new Date(String(paciente.data_nascimento)).toLocaleDateString("pt-BR")
    : "—";
  page.drawText(
    `CPF: ${String(paciente?.cpf ?? "—")}   ·   Nascimento: ${nascStr}`,
    { x: 40, y, size: 8.5, font: reg, color: gray }
  );

  y -= 18;
  page.drawLine({ start: { x: 40, y }, end: { x: W - 40, y }, thickness: 0.5, color: lgray });

  // ── Prescrição ────────────────────────────────────────────────────────────
  y -= 18;
  page.drawText("PRESCRIÇÃO", { x: 40, y, size: 7.5, font: bold, color: gray });
  y -= 18;

  for (let i = 0; i < medicamentos.length; i++) {
    const med = medicamentos[i];
    page.drawText(`${i + 1}.`, { x: 40, y, size: 10, font: bold, color: teal });
    page.drawText(med.nome || "", { x: 58, y, size: 11, font: bold, color: black });
    y -= 15;
    if (med.posologia) {
      // wrap posologia
      const words = med.posologia.split(" ");
      let line = "";
      for (const word of words) {
        if ((line + word).length > 72) {
          page.drawText(line.trim(), { x: 58, y, size: 9.5, font: reg, color: gray });
          y -= 13; line = word + " ";
        } else { line += word + " "; }
      }
      if (line.trim()) {
        page.drawText(line.trim(), { x: 58, y, size: 9.5, font: reg, color: gray });
        y -= 13;
      }
    }
    y -= 10;
  }

  // ── Observações ───────────────────────────────────────────────────────────
  if (observacoes.trim()) {
    y -= 6;
    page.drawLine({ start: { x: 40, y }, end: { x: W - 40, y }, thickness: 0.5, color: lgray });
    y -= 18;
    page.drawText("ORIENTAÇÕES AO PACIENTE", { x: 40, y, size: 7.5, font: bold, color: gray });
    y -= 15;
    const words = observacoes.split(" ");
    let line = "";
    for (const word of words) {
      if ((line + word).length > 78) {
        page.drawText(line.trim(), { x: 40, y, size: 9.5, font: reg, color: black });
        y -= 13; line = word + " ";
      } else { line += word + " "; }
    }
    if (line.trim()) {
      page.drawText(line.trim(), { x: 40, y, size: 9.5, font: reg, color: black });
      y -= 13;
    }
  }

  // ── Assinatura ────────────────────────────────────────────────────────────
  const sigY = 130;
  page.drawLine({ start: { x: W / 2 - 90, y: sigY }, end: { x: W / 2 + 90, y: sigY }, thickness: 0.5, color: gray });
  page.drawText(`Dr(a). ${medico.nome}`, { x: W / 2 - 65, y: sigY - 14, size: 9, font: bold, color: navy });
  page.drawText(`CRM: ${medico.crm || "—"}`, { x: W / 2 - 30, y: sigY - 26, size: 8, font: reg, color: gray });

  // ── Rodapé ────────────────────────────────────────────────────────────────
  page.drawRectangle({ x: 0, y: 0, width: W, height: 38, color: rgb(0.96, 0.97, 0.98) });
  page.drawLine({ start: { x: 0, y: 38 }, end: { x: W, y: 38 }, thickness: 0.4, color: lgray });
  page.drawText(
    "Fio Raiz — Plataforma de Saúde Capilar  ·  www.fioraiz.com.br  ·  Documento de uso profissional",
    { x: 40, y: 14, size: 7, font: reg, color: gray }
  );
  page.drawText(`Gerado em: ${data}`, { x: W - 120, y: 14, size: 7, font: reg, color: gray });

  return await doc.save();
}

// ── Email HTML ────────────────────────────────────────────────────────────────
function buildEmailHtml(p: {
  pedido:      Record<string, unknown>;
  farmacia:    Record<string, unknown>;
  medico:      Record<string, unknown>;
  medicamentos: Array<{ nome: string; posologia: string }>;
  observacoes: string;
  pdfUrl:      string;
  data:        string;
}): string {
  const pac = (p.pedido?.pacientes as Record<string, unknown>) ?? {};
  const medsRows = p.medicamentos.map((m, i) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-weight:700;color:#021d34;">${i + 1}. ${m.nome}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#555;">${m.posologia}</td>
    </tr>`).join("");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><title>Receita Fio Raiz</title></head>
<body style="margin:0;padding:0;background:#f4f7f9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 20px;">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

  <!-- Header -->
  <tr><td style="background:#021d34;padding:28px 36px;">
    <div style="font-size:22px;font-weight:900;color:#fff;letter-spacing:-0.5px;">FIO RAIZ</div>
    <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:4px;">Plataforma de Saúde Capilar · fioraiz.com.br</div>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:36px;">
    <p style="margin:0 0 24px;color:#333;font-size:15px;">
      Olá, <strong style="color:#021d34;">${String(p.farmacia?.nome ?? "")}</strong>!<br>
      A receita abaixo foi emitida via plataforma Fio Raiz em <strong>${p.data}</strong>.
    </p>

    <!-- Paciente -->
    <div style="margin-bottom:24px;padding:16px;background:#f8fbfd;border-radius:8px;border-left:4px solid #021d34;">
      <div style="font-size:10px;font-weight:700;color:#94b8d7;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">Paciente</div>
      <div style="font-size:16px;font-weight:800;color:#021d34;">${String(pac?.nome ?? "—")}</div>
      <div style="font-size:12px;color:#888;margin-top:4px;">Prontuário: ${String(p.pedido?.prontuario_id ?? "—")}</div>
    </div>

    <!-- Médico -->
    <div style="margin-bottom:24px;padding:16px;background:#f8fbfd;border-radius:8px;border-left:4px solid #012e46;">
      <div style="font-size:10px;font-weight:700;color:#94b8d7;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">Médico Responsável</div>
      <div style="font-size:15px;font-weight:700;color:#021d34;">Dr(a). ${String(p.medico?.nome ?? "")}</div>
      <div style="font-size:12px;color:#888;margin-top:2px;">CRM: ${String(p.medico?.crm ?? "—")}</div>
    </div>

    <!-- Medicamentos -->
    <div style="margin-bottom:24px;">
      <div style="font-size:10px;font-weight:700;color:#94b8d7;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px;">Prescrição</div>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:8px;overflow:hidden;">
        <thead><tr style="background:#f0f7fa;">
          <th style="padding:10px 12px;text-align:left;font-size:11px;color:#555;font-weight:700;">Medicamento</th>
          <th style="padding:10px 12px;text-align:left;font-size:11px;color:#555;font-weight:700;">Posologia</th>
        </tr></thead>
        <tbody>${medsRows}</tbody>
      </table>
    </div>

    ${p.observacoes ? `
    <div style="margin-bottom:24px;padding:16px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;">
      <div style="font-size:10px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">Orientações ao Paciente</div>
      <div style="font-size:13px;color:#555;line-height:1.6;">${p.observacoes}</div>
    </div>` : ""}

    <!-- CTA -->
    <a href="${p.pdfUrl}" style="display:inline-block;background:#021d34;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;margin-top:8px;">
      📄 Baixar Receita em PDF
    </a>
    <p style="margin:16px 0 0;font-size:11px;color:#aaa;">O link do PDF expira em 7 dias.</p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#f4f7f9;padding:20px 36px;font-size:11px;color:#aaa;text-align:center;">
    Fio Raiz · www.fioraiz.com.br · Este e-mail é automatizado pela plataforma.<br>
    Em caso de dúvidas entre em contato pelo site.
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

// ── WhatsApp message ──────────────────────────────────────────────────────────
function buildWhatsAppMsg(p: {
  pedido:       Record<string, unknown>;
  medico:       Record<string, unknown>;
  medicamentos: Array<{ nome: string; posologia: string }>;
  data:         string;
}): string {
  const pac = (p.pedido?.pacientes as Record<string, unknown>) ?? {};
  const medsList = p.medicamentos
    .map((m, i) => `  ${i + 1}. *${m.nome}*\n     _${m.posologia}_`)
    .join("\n");

  return `🧾 *Receita Médica — Fio Raiz*

*Paciente:* ${String(pac?.nome ?? "—")}
*Prontuário:* ${String(p.pedido?.prontuario_id ?? "—")}
*Médico:* Dr(a). ${String(p.medico?.nome ?? "")} | CRM: ${String(p.medico?.crm ?? "—")}
*Data:* ${p.data}

*Prescrição:*
${medsList}

📄 A receita em PDF está anexa acima.
Por favor, confirme o recebimento.

_Enviado automaticamente pela plataforma Fio Raiz_`;
}
