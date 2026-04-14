import { useState } from "react";

const SCENARIOS = {
  pessimista: {
    label: "Pessimista",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    cac: 100,
    churn: 0.20,
    newClients: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65],
    desc: "CAC R$100 · Churn 20% · Médico demora 60 dias para fechar · Farmácia com atrasos"
  },
  realista: {
    label: "Realista",
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    cac: 60,
    churn: 0.12,
    newClients: [20, 35, 55, 80, 110, 145, 180, 220, 260, 300, 340, 380],
    desc: "CAC R$60 · Churn 12% · Parceiros fechados no mês 1 · Ads performando bem"
  },
  otimista: {
    label: "Otimista",
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    cac: 40,
    churn: 0.07,
    newClients: [30, 60, 110, 170, 250, 350, 460, 580, 700, 830, 960, 1100],
    desc: "CAC R$40 · Churn 7% · Viral orgânico · Indicações funcionando"
  }
};

const AVG_PRICE = 120;
const COGS_M1 = 106;
const COGS_M2 = 66;
const FIXED = 530;

function calcPL(key) {
  const s = SCENARIOS[key];
  const months = [];
  let activeClients = 0;
  let cumulative = 0;

  for (let i = 0; i < 12; i++) {
    const newC = s.newClients[i];
    const churned = i === 0 ? 0 : Math.round(activeClients * s.churn);
    activeClients = Math.max(0, activeClients - churned + newC);

    const revenue = activeClients * AVG_PRICE;
    const cogs = (newC * COGS_M1) + ((activeClients - newC) * COGS_M2);
    const grossProfit = revenue - cogs;
    const cacSpend = newC * s.cac;
    const ebitda = grossProfit - cacSpend - FIXED;
    cumulative += ebitda;

    months.push({
      mes: i + 1, newC, churned, activeClients,
      revenue: Math.round(revenue),
      cogs: Math.round(cogs),
      grossProfit: Math.round(grossProfit),
      cacSpend: Math.round(cacSpend),
      ebitda: Math.round(ebitda),
      cumulative: Math.round(cumulative),
    });
  }
  return months;
}

const BOTTLENECKS = [
  {
    titulo: "Médico parceiro",
    risco: "Alto",
    cor: "#dc2626",
    desc: "Sem médico, sem prescrição. Sem prescrição, sem produto. É o gargalo número 1.",
    impacto: "Trava o lançamento completamente",
    mitigacao: [
      "Abordar 10+ médicos em paralelo — não depender de um só",
      "Ter pelo menos 2 médicos antes de lançar",
      "Backup: plataforma Conexa Saúde como contingência",
      "Oferecer contrato simples de 3 meses com cláusula de saída"
    ]
  },
  {
    titulo: "Farmácia de manipulação",
    risco: "Alto",
    cor: "#dc2626",
    desc: "Atrasos na entrega destroem retenção. Cliente que não recebe, cancela.",
    impacto: "Churn alto, reviews negativos, reputação comprometida",
    mitigacao: [
      "Fechar com 2 farmácias parceiras — uma de backup",
      "Testar entrega antes de lançar (pedir amostras)",
      "SLA contratual: despacho em até 48h após prescrição",
      "Monitorar NPS de entrega nos primeiros 30 clientes"
    ]
  },
  {
    titulo: "CAC acima do projetado",
    risco: "Médio",
    cor: "#d97706",
    desc: "Se os anúncios não converterem bem, o modelo financeiro colapsa rápido.",
    impacto: "Break-even atrasado, capital esgotado antes da escala",
    mitigacao: [
      "Testar com R$ 500/semana antes de escalar",
      "Meta: CAC abaixo de R$ 80 antes de aumentar budget",
      "Testar 3 hooks diferentes na semana 1",
      "Otimizar landing → quiz → checkout antes de gastar mais"
    ]
  },
  {
    titulo: "Churn alto nos primeiros 90 dias",
    risco: "Médio",
    cor: "#d97706",
    desc: "O shedding (queda inicial) assusta. Cliente sem educação cancela achando que piorou.",
    impacto: "LTV cai de R$ 464 para menos de R$ 200",
    mitigacao: [
      "Email educativo sobre shedding no dia 7",
      "WhatsApp proativo no mês 1 e 2",
      "Marco de 30 dias com explicação detalhada",
      "Suporte rápido para dúvidas — resposta em até 2h"
    ]
  },
  {
    titulo: "Regulatório ANVISA/CFM",
    risco: "Médio",
    cor: "#d97706",
    desc: "Regras de telemedicina e publicidade de medicamentos são restritivas no Brasil.",
    impacto: "Anúncios bloqueados, prescrições questionadas",
    mitigacao: [
      "Nunca afirmar que a Fio Raiz prescreve — sempre 'médicos parceiros'",
      "Disclaimer em todas as páginas e anúncios",
      "Não usar marcas de medicamentos nos anúncios (Finasterida, não Propecia)",
      "Consultar advogado especializado em saúde digital antes de escalar"
    ]
  },
  {
    titulo: "Dependência de um só fundador",
    risco: "Baixo",
    cor: "#16a34a",
    desc: "Modelo Medvi — vulnerabilidade conhecida. Quando o sistema cai, não tem ninguém.",
    impacto: "Operação parada, clientes sem suporte",
    mitigacao: [
      "Automatizar o máximo antes de escalar",
      "Documentar todos os processos desde o início",
      "Agente de IA para atendimento de primeiro nível",
      "Contratar assistente virtual quando atingir 200 clientes"
    ]
  },
];

const CHALLENGES = [
  {
    cat: "Mercado",
    items: [
      "Manual tem 500k clientes e R$ 213M investidos — não é fácil competir em branding",
      "Desconfiança do homem brasileiro com saúde online ainda é alta",
      "Custo de aquisição pode subir com mais concorrentes anunciando",
      "Risco de a Manual reduzir preço para responder à concorrência",
    ]
  },
  {
    cat: "Operação",
    items: [
      "Coordenar médico + farmácia + entrega sem tecnologia robusta no início",
      "Controle de qualidade das fórmulas manipuladas é terceirizado",
      "Suporte ao cliente 100% dependente de automação no início",
      "Gestão de devoluções e reembolsos sem equipe",
    ]
  },
  {
    cat: "Financeiro",
    items: [
      "Margem do mês 1 é baixa (18%) — capital de giro necessário",
      "Ads podem consumir caixa rápido se CAC não for controlado",
      "Farmácia pode exigir pedido mínimo que compromete capital",
      "Chargeback de cartão é risco em produtos de saúde",
    ]
  },
  {
    cat: "Produto",
    items: [
      "Resultado visível leva 3-6 meses — longo para manter engajamento",
      "Efeitos colaterais raros mas podem gerar cancelamentos e reviews negativos",
      "Shedding inicial é mal compreendido — precisa de educação constante",
      "Dependência de prescrição médica limita automação total",
    ]
  },
];

const ROADMAP = [
  {
    fase: "Pré-lançamento",
    periodo: "Semanas 1–3",
    cor: "#7c3aed",
    itens: [
      "Fechar médico parceiro (prioridade #1)",
      "Fechar farmácia de manipulação parceira",
      "Deploy do site na Vercel",
      "Integrar Pagar.me",
      "Configurar WhatsApp Business API",
      "Testar fluxo completo: quiz → pagamento → prescrição → entrega",
    ]
  },
  {
    fase: "MVP Beta",
    periodo: "Semanas 4–6",
    cor: "#2563eb",
    itens: [
      "Lançar para 30–50 clientes beta (preço cheio)",
      "Monitorar retenção 30 dias",
      "Ativar chatbot WhatsApp de lembretes",
      "Coletar NPS e primeiros depoimentos",
      "Medir CAC real dos primeiros anúncios (R$ 30/dia)",
    ]
  },
  {
    fase: "Lançamento",
    periodo: "Mês 2",
    cor: "#0891b2",
    itens: [
      "Escalar ads se CAC < R$ 80",
      "Publicar os 3 vídeos HeyGen + ElevenLabs",
      "Ativar email educativo automático (shedding)",
      "Meta: 100 clientes ativos",
      "Primeiros depoimentos no site",
    ]
  },
  {
    fase: "Escala",
    periodo: "Meses 3–6",
    cor: "#16a34a",
    itens: [
      "Dobrar budget de ads (se CAC controlado)",
      "Lançar programa de indicação",
      "Testar UGC com 2–3 criadores",
      "Negociar volume com farmácia (reduzir COGS)",
      "Meta: 400–500 clientes ativos",
    ]
  },
  {
    fase: "Consolidação",
    periodo: "Meses 7–12",
    cor: "#d97706",
    itens: [
      "Migrar para Conexa Saúde se volume > 200 avaliações/mês",
      "App de tracking de progresso (diferencial vs. Manual)",
      "Programa de fidelidade estruturado",
      "PR e assessoria de imprensa",
      "Meta: 1.000–1.500 clientes ativos",
    ]
  },
];

function fmt(n) {
  const abs = Math.abs(n);
  if (abs >= 1000) return (n < 0 ? "-" : "") + "R$" + (abs/1000).toFixed(1) + "k";
  return (n < 0 ? "-R$" : "R$") + abs;
}

const TABS = ["Visão Geral", "Cenários P&L", "Gargalos", "Desafios", "Roadmap"];

export default function BusinessPlan() {
  const [tab, setTab] = useState(0);
  const [scenario, setScenario] = useState("realista");
  const [expandedMonth, setExpandedMonth] = useState(null);
  const [expandedBottleneck, setExpandedBottleneck] = useState(null);

  const pl = calcPL(scenario);
  const sc = SCENARIOS[scenario];

  const s = {
    wrap: { minHeight: "100vh", background: "#F9F8F6", fontFamily: "'Jost',sans-serif", color: "#111" },
    header: { background: "#111", padding: "20px 16px 0", position: "sticky", top: 0, zIndex: 100 },
    tab: (active) => ({
      padding: "10px 12px", background: "none", border: "none",
      borderBottom: active ? "2px solid #fff" : "2px solid transparent",
      color: active ? "#fff" : "rgba(255,255,255,0.3)",
      fontSize: 10, fontWeight: 600, cursor: "pointer",
      fontFamily: "'Jost',sans-serif", whiteSpace: "nowrap",
      letterSpacing: "0.1em", textTransform: "uppercase"
    }),
    card: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", padding: "16px", marginBottom: 12, borderRadius: 4 },
    label: { fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: 8 },
    scenBtn: (active, color) => ({
      flex: 1, padding: "10px 6px", border: `1.5px solid ${active ? color : "rgba(0,0,0,0.1)"}`,
      background: active ? color : "#fff", color: active ? "#fff" : "#666",
      fontFamily: "'Jost',sans-serif", fontSize: 10, fontWeight: 700,
      letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
      transition: "all 0.2s", borderRadius: 2
    }),
  };

  // ── TAB 0: Visão Geral ──
  const tab0 = (
    <div>
      {/* Resumo executivo */}
      <div style={s.card}>
        <div style={s.label}>Resumo executivo</div>
        <p style={{ fontSize: 14, color: "#444", lineHeight: 1.8, marginBottom: 12 }}>
          A <strong>Fio Raiz</strong> é uma plataforma de telemedicina capilar masculina que conecta homens com calvície androgenética a médicos parceiros para prescrição de finasterida e minoxidil, com entrega discreta em casa.
        </p>
        <p style={{ fontSize: 14, color: "#444", lineHeight: 1.8 }}>
          Modelo baseado na Medvi (EUA, US$1.8B em 2026): a plataforma cuida de tecnologia, marketing e aquisição. Médicos e farmácias parceiras cuidam da parte clínica e logística.
        </p>
      </div>

      {/* Números do negócio */}
      <div style={s.card}>
        <div style={s.label}>Unit economics base</div>
        {[
          ["Preço médio ponderado", "R$ 120/mês"],
          ["Custo total mês 1 (COGS)", "R$ 106"],
          ["Custo total mês 2+", "R$ 66"],
          ["Margem bruta mês 2+", "45%"],
          ["CAC estimado", "R$ 40–100"],
          ["LTV médio (churn 12%)", "R$ 464"],
          ["LTV/CAC (realista)", "7.7x"],
          ["Break-even (realista)", "Mês 3"],
          ["Custos fixos mensais", "R$ 530"],
        ].map(([k, v], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <span style={{ fontSize: 13, color: "#555" }}>{k}</span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Comparativo 3 cenários — mês 12 */}
      <div style={s.card}>
        <div style={s.label}>Resultado mês 12 — comparativo</div>
        {Object.entries(SCENARIOS).map(([key, sc2]) => {
          const data = calcPL(key);
          const last = data[11];
          return (
            <div key={key} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: sc2.color, letterSpacing: "0.06em", textTransform: "uppercase" }}>{sc2.label}</span>
                <span style={{ fontSize: 12, color: "#888" }}>{last.activeClients} clientes</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { l: "Receita", v: fmt(last.revenue) },
                  { l: "Lucro/mês", v: fmt(last.ebitda) },
                  { l: "Acumulado", v: fmt(last.cumulative) },
                ].map((m, i) => (
                  <div key={i} style={{ flex: 1, background: sc2.bg, padding: "8px 10px", border: `1px solid ${sc2.border}`, borderRadius: 4 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: sc2.color }}>{m.v}</div>
                    <div style={{ fontSize: 10, color: "#aaa", marginTop: 2 }}>{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stack de ferramentas */}
      <div style={s.card}>
        <div style={s.label}>Stack completo</div>
        {[
          { cat: "Produto", tools: "React + Vite · Vercel · GitHub" },
          { cat: "Pagamento", tools: "Pagar.me (PIX + cartão + recorrência)" },
          { cat: "Telemedicina", tools: "Médico parceiro independente → Conexa Saúde" },
          { cat: "Farmácia", tools: "Manipulação parceira ANVISA" },
          { cat: "Atendimento", tools: "WhatsApp Business API · ElevenLabs · Agente IA" },
          { cat: "Marketing", tools: "Meta Ads · HeyGen · Midjourney · Runway" },
          { cat: "Copy/Código", tools: "Claude · ChatGPT · Grok" },
          { cat: "Análise", tools: "Dashboard próprio · Meta Pixel" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <span style={{ fontSize: 11, color: "#aaa", minWidth: 90, paddingTop: 1, fontWeight: 600, letterSpacing: "0.04em" }}>{r.cat}</span>
            <span style={{ fontSize: 13, color: "#444" }}>{r.tools}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ── TAB 1: Cenários P&L ──
  const tab1 = (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {Object.entries(SCENARIOS).map(([key, sc2]) => (
          <button key={key} style={s.scenBtn(scenario === key, sc2.color)}
            onClick={() => setScenario(key)}>{sc2.label}</button>
        ))}
      </div>

      <div style={{ ...s.card, background: sc.bg, border: `1px solid ${sc.border}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: sc.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
          Cenário {sc.label}
        </div>
        <p style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{sc.desc}</p>
      </div>

      {/* Métricas chave */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {[
          { l: "Clientes M12", v: pl[11].activeClients.toLocaleString("pt-BR") },
          { l: "Receita M12", v: fmt(pl[11].revenue) },
          { l: "Lucro M12", v: fmt(pl[11].ebitda) },
        ].map((m, i) => (
          <div key={i} style={{ flex: 1, background: "#fff", border: "1px solid rgba(0,0,0,0.08)", padding: "14px 12px", borderRadius: 4, textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: sc.color, letterSpacing: "-0.02em" }}>{m.v}</div>
            <div style={{ fontSize: 10, color: "#aaa", marginTop: 3 }}>{m.l}</div>
          </div>
        ))}
      </div>

      {/* P&L mês a mês */}
      {pl.map((m, i) => (
        <div key={i} style={{ border: `1px solid ${expandedMonth === i ? "#111" : "rgba(0,0,0,0.08)"}`, marginBottom: 8, background: expandedMonth === i ? "#111" : "#fff", borderRadius: 4, overflow: "hidden", cursor: "pointer" }}
          onClick={() => setExpandedMonth(expandedMonth === i ? null : i)}>
          <div style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 600, color: expandedMonth === i ? "#fff" : "#111" }}>Mês {m.mes}</span>
              <span style={{ fontSize: 11, color: expandedMonth === i ? "rgba(255,255,255,0.35)" : "#aaa", marginLeft: 8 }}>
                {m.activeClients} clientes · +{m.newC} novos
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: m.ebitda >= 0 ? (expandedMonth === i ? "#86efac" : "#16a34a") : (expandedMonth === i ? "#fca5a5" : "#dc2626") }}>
                {fmt(m.ebitda)}
              </div>
              <div style={{ fontSize: 10, color: expandedMonth === i ? "rgba(255,255,255,0.3)" : "#ccc" }}>
                acum: {fmt(m.cumulative)}
              </div>
            </div>
          </div>

          {expandedMonth === i && (
            <div style={{ background: "#1a1a1a", padding: "12px 14px" }}>
              {[
                { l: "Receita bruta", v: m.revenue, pos: true },
                { l: "(-) COGS", v: -m.cogs, pos: false },
                { l: "= Lucro bruto", v: m.grossProfit, pos: m.grossProfit > 0, bold: true },
                { l: "(-) CAC / Ads", v: -m.cacSpend, pos: false },
                { l: "(-) Fixos", v: -FIXED, pos: false },
                { l: "= EBITDA", v: m.ebitda, pos: m.ebitda > 0, bold: true },
              ].map((row, j) => (
                <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: 12, color: row.bold ? "#fff" : "rgba(255,255,255,0.45)", fontWeight: row.bold ? 700 : 400 }}>{row.l}</span>
                  <span style={{ fontSize: 12, fontWeight: row.bold ? 700 : 500, color: row.pos ? "#86efac" : "#fca5a5" }}>
                    {fmt(row.v)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Custo médico separado */}
      <div style={s.card}>
        <div style={s.label}>Custo médico detalhado</div>
        {[
          { mes: "Mês 1 (realista, 20 clientes)", custo: "R$ 800", pct: "33% da receita" },
          { mes: "Mês 6 (realista, 80 novos/mês)", custo: "R$ 3.200", pct: "5.3% da receita" },
          { mes: "Mês 12 (realista, 150 novos/mês)", custo: "R$ 6.000", pct: "3.3% da receita" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <div>
              <div style={{ fontSize: 13, color: "#333" }}>{r.mes}</div>
              <div style={{ fontSize: 11, color: "#aaa" }}>R$ 40/avaliação · só novos clientes</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{r.custo}</div>
              <div style={{ fontSize: 11, color: "#888" }}>{r.pct}</div>
            </div>
          </div>
        ))}
        <p style={{ fontSize: 12, color: "#888", marginTop: 12, lineHeight: 1.6 }}>
          O custo médico se dilui com escala — no mês 12 representa menos de 4% da receita. A partir de 200 avaliações/mês, negociar com Conexa Saúde para R$ 25–30/caso.
        </p>
      </div>
    </div>
  );

  // ── TAB 2: Gargalos ──
  const tab2 = (
    <div>
      <div style={{ ...s.card, background: "#fffbeb", border: "1px solid #fcd34d" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>⚠️ Atenção</div>
        <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.7 }}>
          Os dois primeiros gargalos (médico + farmácia) precisam estar resolvidos ANTES de gastar qualquer dinheiro em anúncios. Sem eles, o produto não existe.
        </p>
      </div>

      {BOTTLENECKS.map((b, i) => (
        <div key={i} style={{ border: `1px solid ${expandedBottleneck === i ? b.cor : "rgba(0,0,0,0.08)"}`, marginBottom: 10, background: "#fff", borderRadius: 4, overflow: "hidden" }}
          onClick={() => setExpandedBottleneck(expandedBottleneck === i ? null : i)}>
          <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: b.cor, flexShrink: 0 }}/>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{b.titulo}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", background: b.cor, padding: "2px 8px", borderRadius: 100, letterSpacing: "0.06em" }}>
                  {b.risco}
                </span>
              </div>
              <p style={{ fontSize: 12, color: "#666", lineHeight: 1.5, paddingLeft: 18 }}>{b.desc}</p>
            </div>
            <span style={{ fontSize: 18, color: "#ccc", marginLeft: 12, transition: "transform 0.3s", transform: expandedBottleneck === i ? "rotate(45deg)" : "none" }}>+</span>
          </div>

          {expandedBottleneck === i && (
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", padding: "14px 16px", background: "#fafaf8" }}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: b.cor, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Impacto</div>
                <p style={{ fontSize: 13, color: "#444" }}>{b.impacto}</p>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Mitigação</div>
                {b.mitigacao.map((m, j) => (
                  <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                    <span style={{ color: "#16a34a", fontSize: 12, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // ── TAB 3: Desafios ──
  const tab3 = (
    <div>
      {CHALLENGES.map((cat, i) => (
        <div key={i} style={{ ...s.card, marginBottom: 12 }}>
          <div style={{ ...s.label, marginBottom: 14 }}>{cat.cat}</div>
          {cat.items.map((item, j) => (
            <div key={j} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: j < cat.items.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
              <span style={{ color: "#dc2626", fontSize: 12, flexShrink: 0, marginTop: 1 }}>→</span>
              <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
      ))}

      {/* Concorrência */}
      <div style={s.card}>
        <div style={s.label}>Concorrência direta</div>
        {[
          { nome: "Manual", nota: "Principal", desc: "500k clientes, R$ 213M investidos, presença forte no Brasil", ameaca: "Alta" },
          { nome: "Omens", nota: "Secundário", desc: "Menor, nota 8.7 no Reclame Aqui, mais personalizado", ameaca: "Média" },
          { nome: "Farmácias", nota: "Indireto", desc: "Genéricos baratos sem consulta — público diferente", ameaca: "Baixa" },
        ].map((c, i) => (
          <div key={i} style={{ padding: "12px 0", borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{c.nome}</span>
              <span style={{ fontSize: 11, color: c.ameaca === "Alta" ? "#dc2626" : c.ameaca === "Média" ? "#d97706" : "#16a34a", fontWeight: 700 }}>
                Ameaça {c.ameaca}
              </span>
            </div>
            <p style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Vantagem competitiva */}
      <div style={{ ...s.card, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
        <div style={{ ...s.label, color: "#16a34a", marginBottom: 14 }}>Nossa vantagem competitiva</div>
        {[
          "Tom provocador e humano — Manual fala como clínica, Fio Raiz fala como amigo",
          "Custo operacional zero (IA + automação) → margem superior",
          "Foco único em calvície → especialização vs. generalismo da Manual",
          "WhatsApp de retenção proativo → churn menor",
          "Velocidade de execução — uma pessoa com IA vs. empresa com 200+",
        ].map((v, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < 4 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
            <span style={{ color: "#16a34a", fontSize: 12, flexShrink: 0, marginTop: 1 }}>✓</span>
            <span style={{ fontSize: 13, color: "#166534", lineHeight: 1.5 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ── TAB 4: Roadmap ──
  const tab4 = (
    <div>
      {ROADMAP.map((fase, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: fase.cor, flexShrink: 0 }}/>
            <div>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{fase.fase}</span>
              <span style={{ fontSize: 12, color: "#aaa", marginLeft: 8 }}>{fase.periodo}</span>
            </div>
          </div>
          <div style={{ paddingLeft: 24, borderLeft: `2px solid ${fase.cor}20`, marginLeft: 5 }}>
            {fase.itens.map((item, j) => (
              <div key={j} style={{ display: "flex", gap: 8, padding: "8px 0 8px 12px", borderBottom: j < fase.itens.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                <span style={{ color: fase.cor, fontSize: 11, flexShrink: 0, marginTop: 2 }}>→</span>
                <span style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Investimento inicial */}
      <div style={{ ...s.card, marginTop: 8 }}>
        <div style={s.label}>Investimento inicial estimado</div>
        {[
          ["Domínio fioraiz.com.br", "✅ Pago"],
          ["Hospedagem Vercel", "R$ 0"],
          ["Midjourney (imagens)", "~R$ 60/mês"],
          ["ElevenLabs + HeyGen", "~R$ 100/mês"],
          ["Pagar.me setup", "R$ 0"],
          ["Médico parceiro (primeiros 50 casos)", "~R$ 2.000"],
          ["Primeiros anúncios Meta", "R$ 1.000"],
          ["WhatsApp Business API", "~R$ 150/mês"],
          ["Total para lançar", "~R$ 3.300"],
        ].map(([k, v], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < 8 ? "1px solid rgba(0,0,0,0.05)" : "none", fontWeight: i === 8 ? 700 : 400 }}>
            <span style={{ fontSize: 13, color: i === 8 ? "#111" : "#555" }}>{k}</span>
            <span style={{ fontSize: 13, color: i === 8 ? "#111" : "#666" }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Próximas ações imediatas */}
      <div style={{ ...s.card, background: "#111", border: "none" }}>
        <div style={{ ...s.label, color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>Próximas ações — esta semana</div>
        {[
          "Mandar email de parceria para 10 médicos",
          "Pesquisar 3 farmácias de manipulação em SP",
          "Criar conta no Pagar.me",
          "Chegar no computador → deploy na Vercel",
          "Criar conta Meta Ads com pixel no site",
        ].map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
            <span style={{ color: "#4ade80", fontSize: 12, flexShrink: 0, marginTop: 1 }}>→</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{a}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={s.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap');`}</style>

      <div style={s.header}>
        <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Fio Raiz</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
          Plano de Negócio · Abril 2026
        </div>
        <div style={{ display: "flex", overflowX: "auto", borderBottom: "1px solid rgba(255,255,255,0.1)", gap: 0 }}>
          {TABS.map((t, i) => (
            <button key={i} style={s.tab(tab === i)} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px" }}>
        {tab === 0 && tab0}
        {tab === 1 && tab1}
        {tab === 2 && tab2}
        {tab === 3 && tab3}
        {tab === 4 && tab4}
      </div>
    </div>
  );
}
