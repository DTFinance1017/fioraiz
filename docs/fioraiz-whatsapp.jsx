import { useState } from "react";

const FLOWS = {
  // ── ONBOARDING ─────────────────────────────────────────────────────────────
  onboarding: {
    label: "Onboarding (dia 1)",
    color: "#2563eb",
    messages: [
      {
        type: "brand",
        text: "Oi, *Rafael*! 👋\n\nSou o assistente da *Fio Raiz*. Vou te ajudar a não esquecer o tratamento — porque consistência é o segredo do resultado.\n\nSeu protocolo:\n• 💊 *Finasterida 1mg* — 1 cápsula por dia\n• 💧 *Minoxidil 5%* — 2x por dia (manhã e noite)\n\nEm que horário você quer ser lembrado?",
        replies: ["Configurar horários", "Agora mesmo"]
      },
      {
        type: "brand",
        text: "Ótimo! Me fala:\n\n1️⃣ Que horas você costuma tomar o café da manhã?\n2️⃣ Que horas você costuma ir dormir?\n\nVou programar os lembretes nos melhores horários pra você.",
        replies: null
      },
      {
        type: "brand",
        text: "Perfeito! Seus lembretes ficaram assim:\n\n☀️ *Manhã:* Finasterida + Minoxidil às *08:00*\n🌙 *Noite:* Minoxidil às *22:00*\n\nPosso ajustar qualquer horário quando quiser. A gente se fala amanhã de manhã! 💪",
        replies: null
      }
    ]
  },

  // ── LEMBRETE MANHÃ ─────────────────────────────────────────────────────────
  lembrete_manha: {
    label: "Lembrete — Manhã",
    color: "#d97706",
    messages: [
      {
        type: "brand",
        text: "☀️ Bom dia, *Rafael*.\n\nIsso aqui é o básico bem feito.\n2 minutos agora evitam arrependimento depois.\n\n💊 + 💧\n\nMandou hoje?",
        replies: ["✅ Já apliquei/tomei", "⏰ Me lembra em...", "🔄 Reprogramar horário"]
      }
    ]
  },

  // ── LEMBRETE NOITE ─────────────────────────────────────────────────────────
  lembrete_noite: {
    label: "Lembrete — Noite",
    color: "#7c3aed",
    messages: [
      {
        type: "brand",
        text: "🌙 Boa noite, *Rafael*!\n\nÚltimo passo do dia:\n💧 *Minoxidil 5%* — aplicar antes de dormir\n\nLembra de deixar secar uns 4 minutinhos antes de deitar.",
        replies: ["✅ Já apliquei", "⏰ Me lembra em...", "🔄 Reprogramar horário"]
      }
    ]
  },

  // ── JÁ TOMEI ──────────────────────────────────────────────────────────────
  ja_tomei: {
    label: "Resposta: Já tomei ✅",
    color: "#16a34a",
    messages: [
      {
        type: "user",
        text: "✅ Já apliquei/tomei"
      },
      {
        type: "brand",
        text: "É isso. 💪\n\nMais um dia que você fez o que precisava.\nResultado vem da repetição.\n\nDia *{X}* ✔️\n\nSegue firme. Amanhã tem mais.",
        replies: null
      }
    ]
  },

  // ── LEMBRAR DEPOIS ────────────────────────────────────────────────────────
  lembrar_depois: {
    label: "Resposta: Me lembra em... ⏰",
    color: "#ea580c",
    messages: [
      {
        type: "user",
        text: "⏰ Me lembra em..."
      },
      {
        type: "brand",
        text: "Claro! Em quanto tempo?",
        replies: ["15 minutos", "30 minutos", "1 hora", "2 horas"]
      },
      {
        type: "user",
        text: "30 minutos"
      },
      {
        type: "brand",
        text: "Combinado! Te aviso às *{nova_hora}*. ⏰",
        replies: null
      },
      {
        type: "brand",
        text: "⏰ *Rafael*, lembrete reprogramado!\n\nHora do tratamento agora:\n💧 *Minoxidil 5%* — pode aplicar?\n\n_(esse lembrete foi adiado uma vez hoje)_",
        replies: ["✅ Já apliquei", "Pular hoje"]
      }
    ]
  },

  // ── REPROGRAMAR ───────────────────────────────────────────────────────────
  reprogramar: {
    label: "Resposta: Reprogramar horário 🔄",
    color: "#0891b2",
    messages: [
      {
        type: "user",
        text: "🔄 Reprogramar horário"
      },
      {
        type: "brand",
        text: "Qual lembrete você quer mudar?\n\n☀️ *Manhã* (Finasterida + Minoxidil) — atualmente às 08:00\n🌙 *Noite* (Minoxidil) — atualmente às 22:00",
        replies: ["☀️ Manhã", "🌙 Noite", "Os dois"]
      },
      {
        type: "user",
        text: "☀️ Manhã"
      },
      {
        type: "brand",
        text: "Que horas prefere receber o lembrete de manhã?",
        replies: ["07:00", "08:00", "09:00", "Outro horário"]
      },
      {
        type: "user",
        text: "07:00"
      },
      {
        type: "brand",
        text: "✅ Atualizado!\n\nSeu novo lembrete de manhã é às *07:00*.\n\nPrecisa mudar mais alguma coisa?",
        replies: ["Não, tá bom", "Mudar noite também"]
      }
    ]
  },

  // ── PULAR HOJE ────────────────────────────────────────────────────────────
  pular: {
    label: "Resposta: Pular hoje",
    color: "#dc2626",
    messages: [
      {
        type: "user",
        text: "Pular hoje"
      },
      {
        type: "brand",
        text: "Sem culpa.\n\nMas não se sabota.\nVocê já começou — não perde isso por bobeira.\n\nAmanhã volta. 👊",
        replies: null
      }
    ]
  },

  // ── MARCO 30 DIAS ─────────────────────────────────────────────────────────
  marco_30dias: {
    label: "Marco: 30 dias 🎉",
    color: "#16a34a",
    messages: [
      {
        type: "brand",
        text: "30 dias, *Rafael*.\n\nPode parecer que piorou — é normal.\nSeu cabelo tá renovando.\n\nQuem continua aqui… começa a colher depois.\n\n⚠️ Se notou mais queda, é o *shedding* — o fio velho caindo pra entrar o novo. Faz parte do processo.",
        replies: ["Entendi, vou continuar", "Estou preocupado com a queda"]
      }
    ]
  },

  // ── PREOCUPADO COM QUEDA ──────────────────────────────────────────────────
  preocupado: {
    label: "Dúvida: Preocupado com a queda",
    color: "#dc2626",
    messages: [
      {
        type: "user",
        text: "Estou preocupado com a queda"
      },
      {
        type: "brand",
        text: "Entendo, isso assusta. Mas é provável que seja o *shedding* — e é boa notícia.\n\n*O que é shedding?*\nO minoxidil acelera o ciclo capilar. Os fios antigos e fracos caem para dar lugar a fios novos e mais fortes. É temporário e dura de 2 a 8 semanas.\n\n*Quando se preocupar de verdade:*\n• Queda intensa após o 3º mês\n• Irritação ou coceira no couro cabeludo\n\nQuer falar com um médico sobre o seu caso?",
        replies: ["Quero falar com um médico", "Entendi, vou continuar"]
      }
    ]
  },

  // ── MARCO 90 DIAS ─────────────────────────────────────────────────────────
  marco_90dias: {
    label: "Marco: 90 dias + pedido de foto",
    color: "#16a34a",
    messages: [
      {
        type: "brand",
        text: "90 dias. 🔥\n\nAgora começa a ficar visível.\n\nMe manda uma foto de hoje pra comparar com quando você começou.\n\n_(Sua foto é privada — só pra seu acompanhamento)_",
        replies: ["Enviar foto", "Não tenho foto inicial"]
      }
    ]
  },

  // ── INDICAÇÃO ─────────────────────────────────────────────────────────────
  indicacao: {
    label: "Programa de indicação (mês 4)",
    color: "#7c3aed",
    messages: [
      {
        type: "brand",
        text: "Oi *Rafael*! 👋\n\nVocê está no tratamento há 4 meses — e isso merece reconhecimento.\n\nTemos uma novidade pra você:\n\n🎁 *Programa de indicação Fio Raiz*\n\nIndica um amigo → você ganha *R$ 30 de desconto* na próxima mensalidade. Ele ganha *R$ 30 de desconto* na primeira compra.\n\nSeu link exclusivo:\nfioraiz.com.br/indica/*{codigo}*\n\nQuer compartilhar?",
        replies: ["Quero compartilhar! 🚀", "Agora não"]
      }
    ]
  }
};

function MessageBubble({ msg, isLast }) {
  const isBrand = msg.type === "brand";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: isBrand ? "flex-start" : "flex-end", marginBottom: 8 }}>
      {isBrand && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <div style={{ width: 20, height: 20, background: "#111", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 9 }}>FR</span>
          </div>
          <span style={{ fontSize: 10, color: "#aaa" }}>Fio Raiz</span>
        </div>
      )}
      <div style={{
        maxWidth: "82%", padding: "10px 14px",
        background: isBrand ? "#fff" : "#dcf8c6",
        borderRadius: isBrand ? "0 12px 12px 12px" : "12px 0 12px 12px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        fontSize: 13, lineHeight: 1.6, color: "#111",
        whiteSpace: "pre-wrap"
      }}>
        {msg.text.replace(/\*(.*?)\*/g, '$1').replace(/_(.*?)_/g, '$1')}
      </div>
      {msg.replies && isLast && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8, maxWidth: "90%" }}>
          {msg.replies.map((r, i) => (
            <div key={i} style={{
              background: "#e7f3ff", color: "#2563eb",
              padding: "6px 12px", borderRadius: 16,
              fontSize: 12, fontWeight: 500, cursor: "pointer",
              border: "1px solid #bfdbfe"
            }}>{r}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WhatsAppFlows() {
  const [active, setActive] = useState("onboarding");
  const flow = FLOWS[active];

  return (
    <div style={{ minHeight: "100vh", background: "#F9F8F6", fontFamily: "'Jost',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&family=Cormorant+Garamond:wght@700&display=swap');`}</style>

      {/* Header */}
      <div style={{ background: "#111", padding: "20px 16px" }}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Fio Raiz</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Chatbot WhatsApp — Fluxos de mensagens</div>
      </div>

      {/* Flow selector */}
      <div style={{ overflowX: "auto", background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.08)", padding: "12px 16px", display: "flex", gap: 8, whiteSpace: "nowrap" }}>
        {Object.entries(FLOWS).map(([key, f]) => (
          <button key={key}
            onClick={() => setActive(key)}
            style={{
              padding: "7px 14px", border: `1.5px solid ${active === key ? f.color : "rgba(0,0,0,0.1)"}`,
              background: active === key ? f.color : "transparent",
              color: active === key ? "#fff" : "#555",
              borderRadius: 20, fontSize: 11, fontWeight: 500,
              cursor: "pointer", fontFamily: "'Jost',sans-serif",
              transition: "all 0.2s", whiteSpace: "nowrap"
            }}>{f.label}</button>
        ))}
      </div>

      {/* WhatsApp preview */}
      <div style={{ padding: "16px", maxWidth: 480, margin: "0 auto" }}>

        {/* Phone frame */}
        <div style={{ background: "#e5ddd5", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8bdb5' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}>

          {/* WA header */}
          <div style={{ background: "#075e54", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, background: "#128c7e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>FR</span>
            </div>
            <div>
              <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>Fio Raiz</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>Assistente de tratamento</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ padding: "16px 12px", minHeight: 320, display: "flex", flexDirection: "column", gap: 4 }}>
            {flow.messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} isLast={i === flow.messages.length - 1} />
            ))}
          </div>

          {/* Input bar */}
          <div style={{ background: "#f0f0f0", padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, background: "#fff", borderRadius: 20, padding: "8px 14px", fontSize: 13, color: "#aaa" }}>
              Mensagem
            </div>
            <div style={{ width: 36, height: 36, background: "#128c7e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 14 }}>→</span>
            </div>
          </div>
        </div>

        {/* Flow info */}
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", padding: "16px", marginTop: 12, borderRadius: 8 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: 8 }}>Sobre este fluxo</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: flow.color }}/>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{flow.label}</span>
          </div>
          <div style={{ fontSize: 12, color: "#777", lineHeight: 1.7 }}>
            {active === "onboarding" && "Enviado automaticamente após confirmação do pagamento. Coleta horário preferido e configura os lembretes."}
            {active === "lembrete_manha" && "Enviado todos os dias no horário configurado pelo cliente. Dispara o fluxo de resposta."}
            {active === "lembrete_noite" && "Segundo lembrete diário para aplicação noturna do minoxidil."}
            {active === "ja_tomei" && "Confirmação positiva. Mostra progresso em dias e barra de evolução para engajamento."}
            {active === "lembrar_depois" && "Cliente pede para ser lembrado mais tarde. Oferece opções de tempo e reenvia o lembrete."}
            {active === "reprogramar" && "Cliente muda o horário permanentemente. Atualiza a configuração no sistema."}
            {active === "pular" && "Cliente decide não usar hoje. Resposta empática sem pressão, mas reforça importância da consistência."}
            {active === "marco_30dias" && "Enviado automaticamente no 30º dia. Parabéns + explicação do shedding para reduzir cancelamento."}
            {active === "preocupado" && "Resposta para clientes assustados com queda no início. Educa sobre shedding e oferece médico."}
            {active === "marco_90dias" && "Marco de 90 dias + pedido de foto para comparação. Aumenta engajamento e prova social."}
            {active === "indicacao" && "Enviado no 4º mês. Programa de indicação com benefício bilateral."}
          </div>
        </div>

        {/* Implementation note */}
        <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", padding: "14px", marginTop: 12, borderRadius: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Implementação técnica</div>
          <div style={{ fontSize: 12, color: "#78350f", lineHeight: 1.7 }}>
            <strong>Stack recomendada:</strong><br/>
            • <strong>Twilio WhatsApp API</strong> — R$ 0,05/mensagem enviada<br/>
            • <strong>Make (Integromat)</strong> — automatiza os gatilhos por horário<br/>
            • <strong>Airtable</strong> — armazena clientes, horários e progresso<br/>
            • <strong>Custo estimado:</strong> R$ 80–150/mês para 500 clientes<br/>
            <br/>
            Alternativa BR: <strong>Z-API</strong> (mais barato, menos estável)
          </div>
        </div>
      </div>
    </div>
  );
}
