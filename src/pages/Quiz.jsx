import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ── Logo ──────────────────────────────────────────────────────────────────────
function Logo({ dark = true }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/")}
      style={{ display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none", WebkitTapHighlightColor: "transparent" }}
      role="link" aria-label="Voltar para a página inicial">
      <img src="/logo-v2.png" alt="Fio Raiz" style={{ height: 52, width: "auto", display: "block", filter: dark ? "none" : "brightness(0) invert(1)" }} />
    </div>
  );
}

// ── Cabeça SVG com padrão de calvície ─────────────────────────────────────────
function HairHead({ type }) {
  const baseHead = (
    <>
      <ellipse cx="50" cy="45" rx="32" ry="38" fill="#f5f0e8" stroke="#ddd" strokeWidth="1"/>
      <ellipse cx="50" cy="88" rx="18" ry="10" fill="#f5f0e8" stroke="#ddd" strokeWidth="1"/>
      <line x1="32" y1="88" x2="32" y2="95" stroke="#ddd" strokeWidth="1"/>
      <line x1="68" y1="88" x2="68" y2="95" stroke="#ddd" strokeWidth="1"/>
      <circle cx="41" cy="42" r="2" fill="#ccc"/>
      <circle cx="59" cy="42" r="2" fill="#ccc"/>
      <path d="M44 52 Q50 56 56 52" stroke="#ccc" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </>
  );
  const hairColor = "#2a2a2a";
  const hairs = {
    normal: <ellipse cx="50" cy="18" rx="30" ry="22" fill={hairColor}/>,
    entradas: (
      <>
        <path d="M20 30 Q25 10 50 12 Q75 10 80 30 Q65 20 50 22 Q35 20 20 30Z" fill={hairColor}/>
      </>
    ),
    entradas_coroa: (
      <>
        <path d="M22 32 Q27 12 50 14 Q73 12 78 32 Q65 22 50 24 Q35 22 22 32Z" fill={hairColor}/>
        <ellipse cx="50" cy="32" rx="12" ry="10" fill="#f5f0e8"/>
      </>
    ),
    moderada: (
      <>
        <path d="M25 35 Q30 15 50 17 Q70 15 75 35 Q65 28 50 30 Q35 28 25 35Z" fill={hairColor}/>
        <ellipse cx="50" cy="28" rx="16" ry="14" fill="#f5f0e8"/>
      </>
    ),
    extrema: (
      <>
        <path d="M28 38 Q33 25 50 26 Q67 25 72 38 Q65 34 50 35 Q35 34 28 38Z" fill={hairColor}/>
        <ellipse cx="50" cy="28" rx="20" ry="18" fill="#f5f0e8"/>
      </>
    ),
    irregular: (
      <>
        <path d="M20 28 Q28 8 50 10 Q72 8 80 28 Q70 18 55 20 Q45 16 35 22 Q28 25 20 28Z" fill={hairColor}/>
        <ellipse cx="38" cy="28" rx="8" ry="7" fill="#f5f0e8"/>
        <ellipse cx="60" cy="22" rx="6" ry="5" fill="#f5f0e8"/>
      </>
    ),
    total: <></>,
  };
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      {hairs[type] || hairs.normal}
      {baseHead}
    </svg>
  );
}

// ── Countdown ─────────────────────────────────────────────────────────────────
function Countdown({ onClose, onApply }) {
  const [time, setTime] = useState({ h: 1, m: 59, s: 47 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--; if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { clearInterval(t); return { h: 0, m: 0, s: 0 }; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = n => String(n).padStart(2, "0");
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end" }}>
      <div style={{ background: "#fff", width: "100%", maxWidth: "100vw", boxSizing: "border-box", borderRadius: "20px 20px 0 0", padding: "28px clamp(16px, 4vw, 24px) 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888" }}>Oferta de hoje</span>
          <button onClick={onClose} style={{ background: "#EDF5F8", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 14, color: "#666" }}>×</button>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 20 }}>
          {[[pad(time.h), "Horas"], [pad(time.m), "Minutos"], [pad(time.s), "Segundos"]].map(([v, l], i) => (
            <div key={i} style={{ flex: 1, background: "#F0F7FA", borderRadius: 10, padding: "14px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#021d34", fontFamily: "'Outfit',sans-serif" }}>{v}</div>
              <div style={{ fontSize: 10, color: "#aaa", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
        <h2 style={{ textAlign: "center", fontSize: 26, fontWeight: 800, color: "#021d34", marginBottom: 8, letterSpacing: "-0.02em" }}>
          30% OFF Primeiro Pedido
        </h2>
        <p style={{ textAlign: "center", fontSize: 14, color: "#888", marginBottom: 20 }}>
          Seu desconto está reservado. Finalize agora!
        </p>
        <button onClick={onApply} style={{ width: "100%", background: "#012e46", color: "#fff", border: "none", borderRadius: 100, padding: "17px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif", letterSpacing: "0.04em" }}>
          QUERO O DESCONTO
        </button>
      </div>
    </div>
  );
}

// ── Dados das perguntas ───────────────────────────────────────────────────────
const HAIR_TYPES = [
  // All six illustrations live in a single 2×3 sprite at /calvicie-tipos.png
  // Each card shows its own cell via background-position
  { id: "entradas",       label: "Entradas Frontais",   stage: 2, col: 0, row: 0 },
  { id: "entradas_coroa", label: "Entradas e Coroa",    stage: 3, col: 1, row: 0 },
  { id: "moderada",       label: "Calvície Moderada",   stage: 4, col: 0, row: 1 },
  { id: "extensa",        label: "Calvície Extensa",    stage: 5, col: 1, row: 1 },
  { id: "irregular",      label: "Queda Irregular",     stage: 0, col: 0, row: 2 },
  { id: "total",          label: "Queda Total",         stage: 6, col: 1, row: 2 },
];

const CONDITIONS = [
  "Queda de libido ou disfunção erétil recorrente",
  "Ginecomastia (aumento do tecido mamário)",
  "Quadro cardiovascular, hipertensão instável ou episódios de tontura",
  "Disfunção renal crônica",
  "Diagnóstico oncológico atual ou pregresso (próstata, mama, hormônio-dependente)",
  "Comprometimento hepático (hepatite, cirrose ou esteatose avançada)",
  "Quadro de ansiedade, depressão ou síndrome do pânico em acompanhamento",
  "Nenhuma das situações acima",
];

// ── Motor de blindagem: mapeia condições para categorias ────────────────────
function getSafetyFlags(conds = [], scalpConds = [], perf = {}) {
  const has = (rx) => conds.some(c => rx.test(c));
  const cardiac   = has(/cardiovascular|hipertens|tontur/i);
  const endocrine = has(/libido|ereç|erét|ginecomastia/i);
  const hepatic   = has(/hepát|hepatit|cirrose|esteatose/i);
  const renal     = has(/renal/i);
  const oncologic = has(/oncológico|oncologico|câncer|cancer/i);

  // Reação adversa a qualquer comprimido reportado no drill-down de performance
  const ORAL_IDS = ["mnx_oral","fin_1mg","dut_05","saw","vitaminas"];
  const pillAdverse = ORAL_IDS.some(id => perf[id] === "efx");

  // Upgrade de potência: Finasterida 1mg sem evolução → sugerir Dutasterida
  const finasteridaFail = perf["fin_1mg"] === "none";

  // Couro cabeludo
  const dermatitis = (scalpConds || []).some(c => /caspa|dermatit|psorías/i.test(c));
  const topicalContraindicated =
    (scalpConds || []).includes("Vermelhidão ou dor") ||
    (scalpConds || []).includes("Psoríase (diagnóstico médico)");

  return {
    cardiac, endocrine, hepatic, renal, oncologic,
    pillAdverse, finasteridaFail, dermatitis, topicalContraindicated,
    // Derivados de alto nível
    blockMinoxOral:   cardiac || hepatic || renal || (perf["mnx_oral"] === "efx"),
    blockOralDHT:     endocrine || hepatic || renal || pillAdverse,
    blockAllOral:     hepatic || renal,
  };
}


// ── Termo de Consentimento Modal ─────────────────────────────────────────────
const SECTIONS = [
  {
    titulo: "1. Natureza do Serviço",
    texto: `Pelo presente Termo, declaro que estou informado e esclarecido de que minha consulta médica será realizada por telemedicina na modalidade assíncrona, em conformidade com a Resolução n.º 2.314/2022 do Conselho Federal de Medicina (CFM) e a Lei n.º 14.510, de 27 de dezembro de 2022.

A Fio Raiz opera exclusivamente como plataforma digital de intermediação, conectando pacientes a médicos parceiros independentes e farmácias de manipulação credenciadas pela ANVISA. A Fio Raiz não é uma clínica médica, não emprega médicos e não interfere, influencia ou participa das decisões clínicas tomadas durante as consultas.`
  },
  {
    titulo: "2. Independência dos Médicos Parceiros",
    texto: `As consultas médicas oferecidas são serviços independentes e distintos dos serviços prestados pela Fio Raiz. Os médicos parceiros são profissionais autônomos, devidamente habilitados e registrados no Conselho Regional de Medicina (CRM) de seu estado de atuação.

Esses profissionais são os únicos responsáveis por fornecer a avaliação clínica, o diagnóstico e indicar o tratamento, caso o considerem adequado ao perfil do paciente. A Fio Raiz não garante a emissão de prescrição — a decisão é exclusiva do médico avaliador.`
  },
  {
    titulo: "3. Modalidade Assíncrona",
    texto: `Declaro ter ciência de que a telemedicina assíncrona ocorre à distância e não é realizada em tempo real nem por videochamada. As informações clínicas fornecidas por mim por meio do questionário de saúde no site da Fio Raiz serão analisadas por um médico parceiro que, após a consulta assíncrona, emitirá uma avaliação e, se indicado, um plano de tratamento com prescrição médica digital.

Estou ciente de que o atendimento à distância é limitado por não permitir a realização de exame físico presencial. Comprometo-me a informar todos os dados de saúde relevantes, sem omissões, colaborando para a qualidade da avaliação.`
  },
  {
    titulo: "4. Limitações do Atendimento",
    texto: `Estou ciente das seguintes limitações inerentes ao atendimento por telemedicina assíncrona:

a) Impossibilidade de realização de exame físico presencial;
b) Eventual necessidade de envio de dados complementares ou fotografias;
c) Eventual necessidade de realização de exames laboratoriais ou de imagem;
d) Possibilidade de recusa da prescrição pelo médico, a depender da complexidade ou contraindicações do caso clínico;
e) Possibilidade de encaminhamento para atendimento presencial ou especialista;
f) Limitação na visualização de detalhes clínicos por meio de respostas ao questionário.`
  },
  {
    titulo: "5. Produtos Manipulados e Farmácias Parceiras",
    texto: `Declaro ter ciência de que os medicamentos fornecidos são fórmulas manipuladas, produzidas por farmácias de manipulação parceiras devidamente credenciadas pela ANVISA. A Fio Raiz não produz, armazena ou dispensa medicamentos.

Os produtos manipulados não são medicamentos industrializados com aprovação de eficácia e segurança pela ANVISA como produto acabado, mas são produzidos em farmácias regularizadas, seguindo a prescrição médica e as normas regulatórias vigentes. Os resultados podem variar de acordo com características individuais de cada organismo.`
  },
  {
    titulo: "6. Proteção de Dados (LGPD)",
    texto: `Autorizo a coleta, transmissão, compartilhamento e tratamento dos meus dados pessoais (nome, idade, endereço, e-mail, CPF) e dados clínicos (respostas ao questionário de saúde) com a plataforma Fio Raiz, o médico parceiro responsável pela minha avaliação e a farmácia de manipulação responsável pelo preparo do meu tratamento, para as finalidades exclusivas de prestação do serviço contratado.

Declaro ter ciência de que minha privacidade será mantida e todos os dados sensíveis serão preservados sob sigilo, em conformidade com a Lei Geral de Proteção de Dados (Lei n.º 13.709/2018 — LGPD). Quando tecnicamente possível e não prejudicial ao atendimento, os dados serão anonimizados.`
  },
  {
    titulo: "7. Confidencialidade",
    texto: `Comprometo-me a preservar e manter a confidencialidade das informações, orientações, prescrições e de todo o conteúdo referente ao atendimento ao qual fui submetido. Afirmo não gravar, fotografar, publicar ou compartilhar qualquer etapa ou conteúdo do atendimento sem autorização expressa do médico responsável.`
  },
  {
    titulo: "8. Veracidade das Informações",
    texto: `Declaro que todas as informações prestadas no questionário de saúde são verídicas e completas. Comprometo-me a informar imediatamente ao médico parceiro sobre quaisquer alterações em meu estado de saúde que possam influenciar na avaliação ou no curso do tratamento.

Estou ciente de que este atendimento é pessoal e intransferível, não podendo ser utilizado por terceiros. Possuo capacidade civil plena para celebrar o presente termo.`
  },
  {
    titulo: "9. Aceitação e Consentimento",
    texto: `Ao concordar com este Termo, expresso minha autorização livre, informada e esclarecida para iniciar o processo de análise clínica especializada assíncrona através da plataforma Fio Raiz, nos termos descritos acima, em conformidade com a Resolução CFM n.º 2.314/2022 e a Lei n.º 14.510/2022.`
  },
];

function ConsentModal({ onClose, onAccept }) {
  const [accepted, setAccepted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  function handleScroll(e) {
    const el = e.target;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) setScrolled(true);
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 600, background: "#F0F7FA", display: "flex", flexDirection: "column", fontFamily: "'Outfit',sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#fff", padding: "14px 20px", borderBottom: "1px solid rgba(0,0,0,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 10, color: "#aaa", letterSpacing: "0.14em", textTransform: "uppercase" }}>Documento legal</div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Termo de Consentimento</div>
        </div>
        <button onClick={onClose} style={{ background: "#EDF5F8", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 16, color: "#666", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
      </div>

      {/* Aviso */}
      {!scrolled && (
        <div style={{ background: "#fffbeb", borderBottom: "1px solid #fcd34d", padding: "10px 20px", fontSize: 12, color: "#78350f", flexShrink: 0 }}>
          📋 Role até o final para aceitar o termo.
        </div>
      )}

      {/* Conteúdo scrollável */}
      <div onScroll={handleScroll} style={{ flex: 1, overflowY: "auto", padding: "24px 20px" }}>
        <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, marginBottom: 24 }}>
          Em conformidade com a Resolução CFM n.º 2.314/2022 e Lei n.º 14.510/2022
        </p>
        {SECTIONS.map((sec, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>{sec.titulo}</div>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{sec.texto}</div>
            {i < SECTIONS.length - 1 && <div style={{ width: "100%", height: 1, background: "rgba(0,0,0,0.05)", marginTop: 24 }}/>}
          </div>
        ))}
        <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.08)", fontSize: 11, color: "#aaa", lineHeight: 1.7 }}>
          Fio Raiz Saúde Digital Ltda · fioraiz.com.br · contato@fioraiz.com.br<br/>
          Documento: TCLE-FIORAIZ-2026 · Versão 1.0 · Abril de 2026
        </div>
      </div>

      {/* Footer com aceite */}
      <div style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.07)", padding: "16px 20px", flexShrink: 0 }}>
        <div onClick={() => setAccepted(!accepted)} style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", marginBottom: 14 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${accepted ? "#021d34" : "rgba(0,0,0,0.2)"}`, background: accepted ? "#021d34" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
            {accepted && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
          </div>
          <p style={{ fontSize: 13, color: "#333", lineHeight: 1.6 }}>
            Li e compreendi o Termo de Consentimento Livre e Esclarecido e autorizo o início da análise clínica especializada.
          </p>
        </div>
        <button
          onClick={() => { if (accepted) { onAccept(); onClose(); } }}
          style={{ width: "100%", background: accepted ? "#021d34" : "rgba(0,0,0,0.15)", color: "#fff", border: "none", borderRadius: 100, padding: "16px", fontSize: 14, fontWeight: 700, cursor: accepted ? "pointer" : "not-allowed", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s" }}>
          {accepted ? "Aceitar e fechar →" : "Role até o final para aceitar"}
        </button>
        <button onClick={onClose}
          style={{ width:"100%", background:"none", border:"none", cursor:"pointer", fontSize:13,
            color:"#aaa", marginTop:12, fontFamily:"'Outfit',sans-serif", padding:"4px 0" }}>
          ← Voltar
        </button>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Quiz() {
  const [phase, setPhase] = useState("intro");
  const [showConsent, setShowConsent] = useState(false);
  const [consentDone, setConsentDone] = useState(false);
  const [hairStep, setHairStep] = useState(0);
  const [healthStep, setHealthStep] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [format, setFormat] = useState("unicas");
  const [planPeriod, setPlanPeriod] = useState("semestral");
  const [contactInfo, setContactInfo] = useState({ nome:"", email:"", whatsapp:"" });
  const [contactError, setContactError] = useState("");
  const [showConsentTooltip, setShowConsentTooltip] = useState(false);

  // ── Loading animation ──────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "loading") return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setLoadingStep(i);
      if (i >= 3) {
        clearInterval(interval);
        setTimeout(() => setPhase("result"), 900);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [phase]);

  const prices = {
    semestral: { intro: discountApplied ? "R$ 69,38" : "R$ 99,12", after: "R$ 141,60", label: "6 meses", badge: "Maior desconto" },
    trimestral: { intro: discountApplied ? "R$ 77,09" : "R$ 110,13", after: "R$ 157,33", label: "3 meses", badge: null },
  };
  const activePrice = prices[planPeriod];

  // ── Styles ─────────────────────────────────────────────────────────────────
  const s = {
    wrap: { minHeight:"100vh", background:"#F0F7FA", fontFamily:"'Outfit',sans-serif", color:"#021d34", display:"flex", flexDirection:"column", width:"100%", maxWidth:"100vw", overflowX:"hidden" },
    nav: { background:"#fff", padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(0,0,0,0.07)", position:"sticky", top:0, zIndex:100, width:"100%", maxWidth:"100vw", boxSizing:"border-box", gap:10 },
    progressBar: { height:3, background:"#012e46", transition:"width 0.4s ease" },
    progressBg: { height:3, background:"rgba(0,0,0,0.08)" },
    body: { flex:1, padding:"28px clamp(14px, 4vw, 20px) 100px", maxWidth:520, margin:"0 auto", width:"100%", boxSizing:"border-box" },
    tag: { fontSize:10, fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", color:"#888", marginBottom:12 },
    heading: { fontSize:"clamp(22px,5vw,32px)", fontWeight:800, lineHeight:1.2, letterSpacing:"-0.02em", marginBottom:8 },
    sub: { fontSize:14, color:"#888", lineHeight:1.65, marginBottom:24, fontWeight:400 },
    option: (active) => ({
      width:"100%", textAlign:"left", padding:"16px 18px",
      background: active ? "#021d34" : "#fff",
      color: active ? "#fff" : "#021d34",
      border: `1.5px solid ${active ? "#021d34" : "rgba(0,0,0,0.1)"}`,
      borderRadius:12, cursor:"pointer", marginBottom:10,
      fontFamily:"'Outfit',sans-serif", fontSize:15, fontWeight: active ? 600 : 400,
      display:"flex", alignItems:"center", gap:12, transition:"all 0.15s"
    }),
    why: { background:"#EDF5F8", borderRadius:10, padding:"14px 16px", marginTop:4, marginBottom:20 },
    cta: { position:"fixed", bottom:0, left:0, right:0, padding:"16px 20px", background:"#fff", borderTop:"1px solid rgba(0,0,0,0.07)", zIndex:90 },
    ctaBtn: { width:"100%", background:"#012e46", color:"#fff", border:"none", borderRadius:100, padding:"17px", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" },
  };

  // ── Navigation helpers ──────────────────────────────────────────────────────
  function answerHair(key, val) {
    const updated = { ...answers, [key]: val };
    setAnswers(updated);
    if (key === "gradual" && val === "Repentina") { setPhase("abrupt-stop"); return; }
    if (key === "hairType" && (val === "Queda Irregular" || val === "Queda Total")) { setPhase("abrupt-stop"); return; }
    if (hairStep < 4) setHairStep(p => p + 1);
    else { setPhase("health-intro"); setHealthStep(0); }
  }

  function answerHealthSingle(key, val) {
    const updated = { ...answers, [key]: val };
    setAnswers(updated);
    const sel = updated.treatments || [];
    if (healthStep === 0) { setHealthStep(1); } // scalp multi handled by nextHealthMulti
    else if (healthStep === 1) { val === "Sim" ? setHealthStep(2) : setHealthStep(5); }
    else if (healthStep === 6) { setHealthStep(7); }
    else if (healthStep === 7) { setPhase("section3-intro"); }
  }

  function nextHealthMulti() {
    if (healthStep === 0) {
      const sc = answers.scalpConditions || [];
      if (sc.includes("Queda de pelos em outras partes do corpo")) { setPhase("presential-stop"); return; }
      setHealthStep(1);
      return;
    }
    const sel = answers.treatments || [];
    if (healthStep === 2) {
      // Se selecionou ao menos 1 ativo, vai para drill-down de performance; senão, pula para condições
      if (sel.length > 0) setHealthStep(3);
      else setHealthStep(5);
    } else if (healthStep === 3) {
      setHealthStep(5);
    } else if (healthStep === 5) {
      const conds = answers.conditions || [];
      // Bloqueio oncológico: interrompe o fluxo
      if (conds.some(c => /oncológico|oncologico|câncer|cancer/i.test(c))) {
        setPhase("oncology-stop"); return;
      }
      setHealthStep(6);
    }
  }

  function saveLead() {
    const lead = {
      id: Date.now(),
      timestamp: new Date().toLocaleString("pt-BR"),
      nome: contactInfo.nome,
      email: contactInfo.email,
      whatsapp: contactInfo.whatsapp,
      answers,
    };
    try {
      const existing = JSON.parse(localStorage.getItem("fioraiz_leads") || "[]");
      existing.push(lead);
      localStorage.setItem("fioraiz_leads", JSON.stringify(existing));
    } catch {}
  }

  function continueFromContact() {
    if (!contactInfo.nome.trim()) { setContactError("Por favor, informe seu nome."); return; }
    if (!contactInfo.whatsapp.trim()) { setContactError("Por favor, informe seu WhatsApp."); return; }
    setContactError("");
    saveLead();
    setPhase("plan");
    setTimeout(() => setShowDiscount(true), 800);
  }

  function continueFromPlan() { setPhase("checkout"); }

  // ── CONSENT MODAL ──────────────────────────────────────────────────────────
  if (showConsent) return (
    <ConsentModal
      onClose={() => setShowConsent(false)}
      onAccept={() => { setConsentDone(true); setShowConsent(false); }}
    />
  );

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (phase === "intro") return (
    <div style={s.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={s.nav}><Logo /><span style={{ fontSize:11, color:"#aaa" }}>Avaliação gratuita</span></div>
      <div style={s.progressBg}><div style={{ ...s.progressBar, width:"0%" }}/></div>

      <div style={s.body}>
        <p style={{ fontSize:13, color:"#888", marginBottom:20, lineHeight:1.6 }}>
          Vamos fazer algumas perguntas para encontrar seu plano ideal.
        </p>
        <h1 style={{ ...s.heading, fontSize:"clamp(22px,6vw,30px)", marginBottom:28 }}>
          Primeiro, precisamos saber<br/>como está seu cabelo.
        </h1>

        <div style={{ display:"flex", flexDirection:"column", gap:0, marginBottom:28,
          border:"1px solid rgba(0,0,0,0.08)", borderRadius:16, overflow:"hidden", background:"#fff" }}>
          {[
            { n:"1", label:"Como está seu cabelo?",  active:true  },
            { n:"2", label:"Falando da sua saúde",   active:false },
            { n:"3", label:"Seu Plano Fio Raiz",     active:false },
          ].map((item, i, arr) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 18px",
              borderBottom: i < arr.length-1 ? "1px solid rgba(0,0,0,0.06)" : "none",
              background: item.active ? "#fafaf8" : "#fff" }}>
              <div style={{ width:30, height:30, borderRadius:"50%", flexShrink:0,
                background: item.active ? "#021d34" : "#ececea",
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:13, fontWeight:700,
                  color: item.active ? "#fff" : "#aaa" }}>{item.n}</span>
              </div>
              <span style={{ flex:1, fontSize:14,
                fontWeight: item.active ? 700 : 400,
                color: item.active ? "#021d34" : "#aaa" }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Bloco de consentimento com checkbox clicável */}
        <div onClick={() => !consentDone && setShowConsent(true)}
          style={{ background: consentDone ? "#f0fdf4" : "#F0F7FA", borderRadius:12, padding:"14px 16px",
            border:`1.5px solid ${consentDone ? "#86efac" : showConsentTooltip ? "#f87171" : "rgba(0,0,0,0.06)"}`,
            cursor: consentDone ? "default" : "pointer", transition:"border 0.2s" }}>
          <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
            {/* Checkbox */}
            <div style={{ width:20, height:20, borderRadius:5, flexShrink:0, marginTop:1,
              border:`2px solid ${consentDone ? "#16a34a" : "#ccc"}`,
              background: consentDone ? "#16a34a" : "#fff",
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all 0.2s" }}>
              {consentDone && <span style={{ color:"#fff", fontSize:11, fontWeight:800 }}>✓</span>}
            </div>
            <p style={{ fontSize:12, color: consentDone ? "#15803d" : "#666", lineHeight:1.75, flex:1 }}>
              Li e compreendi o{" "}
              <a href="#" onClick={e => { e.preventDefault(); e.stopPropagation(); setShowConsent(true); }}
                style={{ color: consentDone ? "#15803d" : "#021d34", fontWeight:700, textDecoration:"underline" }}>
                Termo de Consentimento Livre e Esclarecido
              </a>{" "}e autorizo o início da análise clínica especializada.{" "}
              <a href="/politica-privacidade" target="_blank" onClick={e => e.stopPropagation()}
                style={{ color:"#888", textDecoration:"underline" }}>
                Política de Privacidade
              </a>{" "}·{" "}
              <a href="/termos-uso" target="_blank" onClick={e => e.stopPropagation()}
                style={{ color:"#888", textDecoration:"underline" }}>
                Termos de Uso
              </a>
            </p>
          </div>
        </div>
      </div>

      <div style={s.cta}>
        {/* Tooltip de aviso */}
        {showConsentTooltip && (
          <div style={{ marginBottom:10, background:"#fffbeb", border:"1.5px solid #fcd34d",
            borderRadius:10, padding:"10px 14px", display:"flex", gap:8, alignItems:"flex-start",
            position:"relative" }}>
            <span style={{ fontSize:16, flexShrink:0 }}>⚠️</span>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:"#78350f", marginBottom:2 }}>
                Termo não aceito
              </div>
              <div style={{ fontSize:12, color:"#92400e", lineHeight:1.5 }}>
                Leia e aceite o Termo de Consentimento Livre e Esclarecido para continuar.
              </div>
            </div>
            <button onClick={() => setShowConsentTooltip(false)}
              style={{ position:"absolute", top:8, right:10, background:"none", border:"none",
                cursor:"pointer", fontSize:14, color:"#aaa", lineHeight:1 }}>×</button>
          </div>
        )}
        <button style={s.ctaBtn} onClick={() => {
          if (consentDone) { setPhase("quiz-hair"); setHairStep(0); }
          else { setShowConsentTooltip(true); setShowConsent(true); }
        }}>
          Começar →
        </button>
      </div>
    </div>
  );

  // ── QUIZ — CABELO ──────────────────────────────────────────────────────────
  if (phase === "quiz-hair") {
    const pct = Math.round(((hairStep + 1) / 5) * 45);

    const HAIR_STEPS = [
      // 0 – Tipo visual
      {
        tag: "Leitura capilar · Bloco 1 de 2",
        question: "Qual imagem mais representa a situação do seu cabelo hoje?",
        render: () => (
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(2, minmax(0, 1fr))",
            gap:"clamp(8px, 2.5vw, 14px)",
            width:"100%",
          }}>
            {HAIR_TYPES.map(ht => {
              const active = answers.hairType === ht.label;
              return (
                <div key={ht.id} onClick={() => answerHair("hairType", ht.label)}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    cursor: "pointer",
                    border: `2px solid ${active ? "#012e46" : "#E3EEF3"}`,
                    boxShadow: active
                      ? "0 8px 20px rgba(0,67,88,0.18), 0 0 0 4px rgba(0,67,88,0.08)"
                      : "0 1px 3px rgba(0,0,0,0.04)",
                    transition: "all 0.2s ease",
                    position: "relative",
                    overflow: "hidden",
                    WebkitTapHighlightColor: "transparent",
                  }}>
                  {active && (
                    <div style={{
                      position:"absolute", top:10, right:10, width:24, height:24, borderRadius:"50%",
                      background:"#012e46", display:"flex", alignItems:"center", justifyContent:"center",
                      zIndex:2, boxShadow:"0 2px 6px rgba(0,67,88,0.25)"
                    }}>
                      <span style={{ fontSize:13, fontWeight:800, color:"#fff", lineHeight:1 }}>✓</span>
                    </div>
                  )}
                  {/* Sprite cell from /calvicie-tipos.png (2 cols × 3 rows) */}
                  <div style={{
                    width:"100%",
                    aspectRatio:"241 / 270",
                    backgroundImage:"url('/calvicie-tipos.png')",
                    backgroundSize:"200% 300%",
                    backgroundPosition:`${ht.col * 100}% ${ht.row * 50}%`,
                    backgroundRepeat:"no-repeat",
                  }} />
                </div>
              );
            })}
          </div>
        ),
        noAuto: false,
      },
      // 1 – Gradual ou repentina
      {
        tag: "Leitura capilar · Bloco 1 de 2",
        question: "Como a queda está acontecendo?",
        render: () => (
          <>
            {[
              { val:"Gradual", label:"Devagar — fui percebendo com o tempo." },
              { val:"Repentina", label:"De repente — aconteceu rápido, em dias ou semanas.", sub:"Quedas abruptas podem ter outras causas, como estresse ou medicamentos." },
            ].map(opt => (
              <button key={opt.val} style={s.option(answers.gradual === opt.val)}
                onClick={() => answerHair("gradual", opt.val)}>
                <div style={{ width:20, height:20, borderRadius:"50%",
                  border:`2px solid ${answers.gradual === opt.val ? "#fff" : "#ddd"}`,
                  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {answers.gradual === opt.val && <div style={{ width:10, height:10, borderRadius:"50%", background:"#fff" }}/>}
                </div>
                <div>
                  <div>{opt.label}</div>
                  {opt.sub && <div style={{ fontSize:12, opacity:0.65, marginTop:3 }}>{opt.sub}</div>}
                </div>
              </button>
            ))}
          </>
        ),
      },
      // 2 – Couro cabeludo
      {
        tag: "Leitura capilar · Bloco 1 de 2",
        question: "Como você classificaria o seu couro cabeludo?",
        render: () => (
          <>
            {["Oleoso — fica gorduroso rápido", "Seco — ressecado, com descamação",
              "Misto — oleoso na raiz, seco nas pontas", "Não tenho certeza"].map(opt => (
              <button key={opt} style={s.option(answers.hairTexture === opt)}
                onClick={() => answerHair("hairTexture", opt)}>
                <div style={{ width:20, height:20, borderRadius:"50%",
                  border:`2px solid ${answers.hairTexture === opt ? "#fff" : "#ddd"}`,
                  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {answers.hairTexture === opt && <div style={{ width:10, height:10, borderRadius:"50%", background:"#fff" }}/>}
                </div>
                {opt}
              </button>
            ))}
          </>
        ),
      },
      // 3 – Histórico familiar
      {
        tag: "Leitura capilar · Bloco 1 de 2",
        question: "Alguém da sua família paterna ou materna perdeu cabelo?",
        why: "Cerca de 95% das calvícies masculinas têm origem genética. Saber o histórico da família ajuda o médico a entender a causa provável da sua queda.",
        render: () => (
          <>
            {["Sim", "Não"].map(opt => (
              <button key={opt} style={s.option(answers.family === opt)}
                onClick={() => answerHair("family", opt)}>
                <div style={{ width:20, height:20, borderRadius:"50%",
                  border:`2px solid ${answers.family === opt ? "#fff" : "#ddd"}`,
                  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {answers.family === opt && <div style={{ width:10, height:10, borderRadius:"50%", background:"#fff" }}/>}
                </div>
                {opt}
              </button>
            ))}
          </>
        ),
      },
      // 4 – Objetivo
      {
        tag: "Leitura capilar · Bloco 1 de 2",
        question: "O que você quer conquistar com o tratamento?",
        render: () => (
          <>
            {[
              "Fazer os fios voltarem — recuperar o que perdi",
              "Travar onde está — evitar que piore",
              "Os dois — recuperar e segurar de vez",
            ].map(opt => (
              <button key={opt} style={s.option(answers.goal === opt)}
                onClick={() => answerHair("goal", opt)}>
                <div style={{ width:20, height:20, borderRadius:"50%",
                  border:`2px solid ${answers.goal === opt ? "#fff" : "#ddd"}`,
                  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {answers.goal === opt && <div style={{ width:10, height:10, borderRadius:"50%", background:"#fff" }}/>}
                </div>
                {opt}
              </button>
            ))}
          </>
        ),
      },
    ];

    const step = HAIR_STEPS[hairStep];

    return (
      <div style={s.wrap}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
        <div style={s.nav}>
          <Logo />
          <span style={{ fontSize:11, color:"#aaa" }}>{hairStep + 1} / 5</span>
        </div>
        <div style={s.progressBg}><div style={{ ...s.progressBar, width:`${pct}%` }}/></div>

        <div style={s.body}>
          <div style={s.tag}>{step.tag}</div>
          <h2 style={s.heading}>{step.question}</h2>
          {step.render()}
          {step.why && (
            <div style={s.why}>
              <div style={{ fontSize:12, fontWeight:700, marginBottom:4 }}>Por que estamos perguntando?</div>
              <p style={{ fontSize:13, color:"#666", lineHeight:1.6 }}>{step.why}</p>
            </div>
          )}
        </div>
        <div style={{ position:"fixed", bottom:0, left:0, right:0, padding:"16px 20px",
            background:"#fff", borderTop:"1px solid rgba(0,0,0,0.07)", zIndex:90,
            textAlign:"center" }}>
            <button onClick={() => hairStep > 0 ? setHairStep(p => p - 1) : setPhase("intro")}
              style={{ background:"none", border:"none", cursor:"pointer", fontSize:13,
                color:"#aaa", fontFamily:"'Outfit',sans-serif" }}>← Voltar</button>
          </div>
      </div>
    );
  }

  // ── PARADA ABRUPTA ────────────────────────────────────────────────────────
  if (phase === "abrupt-stop") return (
    <div style={s.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={s.nav}><Logo /></div>
      <div style={s.progressBg}><div style={{ ...s.progressBar, width:"22%" }}/></div>
      <div style={s.body}>
        <div style={{ textAlign:"center", padding:"40px 0 20px" }}>
          <div style={{ width:64, height:64, borderRadius:"50%", background:"#FFF8E7",
            border:"2px solid #FCD34D", display:"flex", alignItems:"center",
            justifyContent:"center", margin:"0 auto 24px", fontSize:28 }}>⚠️</div>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.14em",
            textTransform:"uppercase", color:"#aaa", marginBottom:12 }}>Atenção</div>
          <h2 style={{ fontSize:"clamp(22px,5vw,30px)", fontWeight:800,
            letterSpacing:"-0.02em", lineHeight:1.2, color:"#021d34", marginBottom:16 }}>
            Vamos pausar aqui.
          </h2>
          <p style={{ fontSize:15, color:"#555", lineHeight:1.75, maxWidth:420, margin:"0 auto 28px" }}>
            Você mencionou que a queda de cabelo aconteceu de forma <strong>rápida, em dias ou semanas</strong>.
          </p>
        </div>
        <div style={{ background:"#EDF5F8", border:"1px solid #c8dde6", borderRadius:14,
          padding:"24px 20px", marginBottom:20 }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#021d34", marginBottom:10 }}>
            Por que isso importa?
          </div>
          <p style={{ fontSize:14, color:"#555", lineHeight:1.75 }}>
            Quedas abruptas podem ter causas que vão além da alopecia androgenética — como estresse intenso
            (eflúvio telógeno), deficiências nutricionais, condições hormonais ou reações a medicamentos.
          </p>
          <p style={{ fontSize:14, color:"#555", lineHeight:1.75, marginTop:10 }}>
            Nesses casos, o nosso protocolo pode não ser o mais indicado <em>sem uma análise clínica especializada presencial</em> primeiro.
          </p>
        </div>
        <div style={{ background:"#fff", border:"1px solid rgba(0,0,0,0.08)", borderRadius:14,
          padding:"20px", marginBottom:24 }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#021d34", marginBottom:8 }}>O que recomendamos:</div>
          <ul style={{ paddingLeft:18, fontSize:14, color:"#555", lineHeight:1.85 }}>
            <li>Consulte um dermatologista ou tricologista presencialmente</li>
            <li>Realize exames de sangue básicos (ferritina, TSH, zinco, vitamina D)</li>
            <li>Depois da avaliação, volte à Fio Raiz — teremos prazer em ajudar</li>
          </ul>
        </div>
        <button style={{ ...s.ctaBtn, background:"#021d34", marginBottom:12 }}
          onClick={() => { setHairStep(1); setPhase("quiz-hair"); }}>
          Entendido — quero continuar mesmo assim
        </button>
        <button style={{ background:"none", border:"none", color:"#aaa", fontSize:13,
          cursor:"pointer", width:"100%", padding:"12px 0", fontFamily:"'Outfit',sans-serif" }}
          onClick={() => { setHairStep(0); setPhase("quiz-hair"); }}>
          ← Voltar
        </button>
      </div>
    </div>
  );

  // ── BLOQUEIO ONCOLÓGICO ────────────────────────────────────────────────────
  if (phase === "oncology-stop") return (
    <div style={s.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={s.nav}><Logo /></div>
      <div style={s.progressBg}><div style={{ ...s.progressBar, width:"85%" }}/></div>
      <div style={s.body}>
        <div style={{ textAlign:"center", padding:"40px 0 20px" }}>
          <div style={{ width:64, height:64, borderRadius:"50%", background:"#FFF4F4",
            border:"2px solid #F87171", display:"flex", alignItems:"center",
            justifyContent:"center", margin:"0 auto 24px", fontSize:28 }}>🛡️</div>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.14em",
            textTransform:"uppercase", color:"#aaa", marginBottom:12 }}>Protocolo de Risco Crítico</div>
          <h2 style={{ fontSize:"clamp(22px,5vw,30px)", fontWeight:800,
            letterSpacing:"-0.02em", lineHeight:1.2, color:"#1A1A1A", marginBottom:16 }}>
            A sua jornada pede acompanhamento presencial.
          </h2>
          <p style={{ fontSize:15, color:"#555", lineHeight:1.75, maxWidth:460, margin:"0 auto 28px" }}>
            Você sinalizou um histórico oncológico. Por compromisso ético, encerramos aqui a triagem digital — ativos hormonais e sistêmicos exigem leitura presencial por especialistas em parceria com a sua equipe médica.
          </p>
        </div>
        <div style={{ background:"#EDF5F8", border:"1px solid #c8dde6", borderRadius:14,
          padding:"22px 20px", marginBottom:16 }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#1A1A1A", marginBottom:10 }}>Próximos passos sugeridos:</div>
          <ul style={{ paddingLeft:18, fontSize:14, color:"#555", lineHeight:1.9 }}>
            <li>Converse com o seu oncologista antes de qualquer protocolo capilar</li>
            <li>Procure um dermatologista com experiência em pacientes oncológicos</li>
            <li>Quando houver liberação clínica, retorne — teremos protocolos seguros adaptados</li>
          </ul>
        </div>
        <button style={{ background:"none", border:"1px solid #c8dde6", color:"#1A1A1A",
          borderRadius:6, padding:"14px 0", fontSize:14, fontWeight:600,
          cursor:"pointer", width:"100%", fontFamily:"'Outfit',sans-serif" }}
          onClick={() => { setHealthStep(5); setPhase("quiz-health"); }}>
          ← Voltar ao questionário
        </button>
      </div>
    </div>
  );

  // ── PARADA PRESENCIAL ──────────────────────────────────────────────────────
  if (phase === "presential-stop") return (
    <div style={s.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={s.nav}><Logo /></div>
      <div style={s.progressBg}><div style={{ ...s.progressBar, width:"65%" }}/></div>
      <div style={s.body}>
        <div style={{ textAlign:"center", padding:"40px 0 20px" }}>
          <div style={{ width:64, height:64, borderRadius:"50%", background:"#F0F7FA",
            border:"2px solid #c8dde6", display:"flex", alignItems:"center",
            justifyContent:"center", margin:"0 auto 24px", fontSize:28 }}>🩺</div>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.14em",
            textTransform:"uppercase", color:"#aaa", marginBottom:12 }}>Avaliação necessária</div>
          <h2 style={{ fontSize:"clamp(22px,5vw,30px)", fontWeight:800,
            letterSpacing:"-0.02em", lineHeight:1.2, color:"#021d34", marginBottom:16 }}>
            Recomendamos uma consulta presencial.
          </h2>
          <p style={{ fontSize:15, color:"#555", lineHeight:1.75, maxWidth:420, margin:"0 auto 28px" }}>
            Você indicou <strong>queda de pelos em outras partes do corpo</strong>, o que pode sinalizar condições sistêmicas que exigem análise clínica especializada mais ampla.
          </p>
        </div>
        <div style={{ background:"#EDF5F8", border:"1px solid #c8dde6", borderRadius:14,
          padding:"24px 20px", marginBottom:20 }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#021d34", marginBottom:10 }}>
            Por que uma consulta presencial?
          </div>
          <p style={{ fontSize:14, color:"#555", lineHeight:1.75 }}>
            A queda de pelos em sobrancelhas, cílios, corpo ou barba pode estar associada a condições como alopecia areata,
            doenças autoimunes ou desequilíbrios hormonais. Uma avaliação completa é fundamental para o diagnóstico correto.
          </p>
        </div>
        <div style={{ background:"#fff", border:"1px solid rgba(0,0,0,0.08)", borderRadius:14,
          padding:"20px", marginBottom:24 }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#021d34", marginBottom:8 }}>Próximos passos:</div>
          <ul style={{ paddingLeft:18, fontSize:14, color:"#555", lineHeight:1.85 }}>
            <li>Procure um dermatologista especialista em cabelo e pelos</li>
            <li>Mencione todos os locais onde percebeu a queda</li>
            <li>Após diagnóstico, a Fio Raiz pode complementar o seu tratamento</li>
          </ul>
        </div>
        <button style={{ background:"none", border:"1px solid #c8dde6", color:"#021d34",
          borderRadius:100, padding:"14px 0", fontSize:14, fontWeight:600,
          cursor:"pointer", width:"100%", fontFamily:"'Outfit',sans-serif", marginBottom:12 }}
          onClick={() => { setHealthStep(0); setPhase("quiz-health"); }}>
          ← Voltar ao questionário
        </button>
      </div>
    </div>
  );

  // ── PROVA SOCIAL ───────────────────────────────────────────────────────────
  if (phase === "proof") return (
    <div style={s.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={s.nav}><Logo /></div>
      <div style={s.progressBg}><div style={{ ...s.progressBar, width:"50%" }}/></div>
      <div style={s.body}>
        <div style={s.tag}>Você está no lugar certo</div>
        <h2 style={s.heading}>
          A Fio Raiz já ajudou homens a{" "}
          <span style={{ background:"#d4f0d4", padding:"0 4px", borderRadius:4 }}>recuperar o cabelo</span>{" "}
          e{" "}
          <span style={{ background:"#d4f0d4", padding:"0 4px", borderRadius:4 }}>prevenir perdas futuras.</span>
        </h2>
        <div style={{ display:"flex", gap:12, marginTop:24, marginBottom:12, overflowX:"auto", paddingBottom:8 }}>
          {[
            { name:"Rafael, 34", stage:"Entradas frontais", months:"5 meses" },
            { name:"Bruno, 29",  stage:"Entradas e coroa",  months:"6 meses" },
          ].map((t, i) => (
            <div key={i} style={{ minWidth:160, borderRadius:12, overflow:"hidden", background:"#fff", flexShrink:0 }}>
              <div style={{ display:"flex", height:120 }}>
                <div style={{ flex:1, background:"#e8e0d0", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:10, color:"#aaa" }}>Antes</span>
                </div>
                <div style={{ flex:1, background:"#d0e0d0", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                  <div style={{ position:"absolute", bottom:6, right:6, background:"#012e46", color:"#fff", fontSize:9, padding:"2px 6px", borderRadius:100 }}>{t.months}</div>
                </div>
              </div>
              <div style={{ padding:"10px 12px" }}>
                <div style={{ fontSize:13, fontWeight:700 }}>{t.name}</div>
                <div style={{ fontSize:11, color:"#aaa" }}>{t.stage}</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize:12, color:"#aaa", marginBottom:28 }}>Os resultados são individuais e cada organismo responde de uma maneira.</p>
      </div>
      <div style={s.cta}>
        <button style={s.ctaBtn} onClick={() => { setPhase("health-intro"); setHealthStep(0); }}>Continuar</button>
      </div>
    </div>
  );

  // ── TRANSIÇÃO: SAÚDE ───────────────────────────────────────────────────────
  if (phase === "health-intro") return (
    <div style={s.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={s.nav}><Logo /></div>
      <div style={s.progressBg}><div style={{ ...s.progressBar, width:"50%" }}/></div>

      <div style={{ ...s.body, paddingTop:48 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:0, marginBottom:32,
          border:"1px solid rgba(0,0,0,0.08)", borderRadius:16, overflow:"hidden", background:"#fff" }}>
          {[
            { n:"✓", label:"Como está seu cabelo?",  done:true,   active:false },
            { n:"2", label:"Falando da sua saúde",   done:false,  active:true  },
            { n:"3", label:"Seu Plano Fio Raiz",     done:false,  active:false },
          ].map((item, i, arr) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 18px",
              borderBottom: i < arr.length-1 ? "1px solid rgba(0,0,0,0.06)" : "none",
              background: item.active ? "#fafaf8" : "#fff" }}>
              <div style={{ width:30, height:30, borderRadius:"50%", flexShrink:0,
                background: item.done ? "#16a34a" : item.active ? "#021d34" : "#ececea",
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:13, fontWeight:700, color: (item.done || item.active) ? "#fff" : "#aaa" }}>{item.n}</span>
              </div>
              <span style={{ flex:1, fontSize:14,
                fontWeight: item.active ? 700 : 400,
                color: item.active ? "#021d34" : item.done ? "#555" : "#aaa" }}>{item.label}</span>
            </div>
          ))}
        </div>

        <h2 style={{ ...s.heading, marginBottom:12 }}>Hora de falar sobre a sua saúde!</h2>
        <p style={s.sub}>
          Algumas informações de saúde são necessárias para o médico garantir que o tratamento é seguro para você.
          Tudo é confidencial.
        </p>

        <div style={{ background:"#fff", borderRadius:12, padding:"16px 18px", border:"1px solid rgba(0,0,0,0.06)" }}>
          {["🔒 Seus dados são protegidos", "👨‍⚕️ Avaliados por médicos parceiros", "⚡ Resultado em minutos"].map((t, i) => (
            <div key={i} style={{ fontSize:13, color:"#555", padding:"8px 0",
              borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>{t}</div>
          ))}
        </div>
      </div>

      <div style={s.cta}>
        <button style={s.ctaBtn} onClick={() => setPhase("quiz-health")}>Entendido, continuar →</button>
      </div>
    </div>
  );

  // ── QUIZ — SAÚDE ───────────────────────────────────────────────────────────
  if (phase === "quiz-health") {
    // healthStep 0: couro (Sim/Não) → auto
    // healthStep 1: tratamento 12mo (Sim/Não) → auto (Não→5)
    // healthStep 2: quais tratamentos (multi) → Continuar
    // healthStep 3: eficácia Minoxidil 5% (conditional, Sim/Não) → auto
    // healthStep 4: eficácia Minoxidil oral (conditional, Sim/Não) → auto
    // healthStep 5: condições médicas (multi) → Continuar
    // healthStep 6: preferência de medicamento (single) → auto
    // healthStep 7: tipo de Minoxidil (single) → auto → section3-intro

    const TREATMENTS_LIST = [
      { id:"mnx_topico",  label:"Minoxidil 5% (Spray/Tópico)",          route:"topica" },
      { id:"mnx_oral",    label:"Minoxidil Oral",                       route:"oral"   },
      { id:"fin_1mg",     label:"Finasterida 1mg (Comprimido)",         route:"oral"   },
      { id:"fin_topico",  label:"Finasterida Tópica",                   route:"topica" },
      { id:"dut_05",      label:"Dutasterida 0,5mg",                    route:"oral"   },
      { id:"saw",         label:"Saw Palmetto",                         route:"oral"   },
      { id:"vitaminas",   label:"Suplementação Vitamínica",             route:"oral"   },
      { id:"higiene",     label:"Higiene Terapêutica (shampoo clínico)", route:"topica" },
    ];
    const PERFORMANCE_OPTS = [
      { val:"sat",  label:"Resultados satisfatórios sem reações" },
      { val:"efx",  label:"Eficaz, mas apresentou efeitos indesejados" },
      { val:"none", label:"Não houve evolução perceptível" },
    ];

    const totalHealthSteps = 8;
    // Visible steps: map actual healthStep to display step number
    const displayStep = healthStep + 1;
    const pct = 50 + Math.round((healthStep / totalHealthSteps) * 45);

    function renderHealthStep() {
      // Step 0 – Sinais no couro cabeludo (multi-select)
      if (healthStep === 0) {
        const SCALP_OPTS = [
          "Coceira intensa ou irritação",
          "Vermelhidão ou dor",
          "Psoríase (diagnóstico médico)",
          "Caspa frequente",
          "Queda de pelos em outras partes do corpo",
          "Feridas ou lesões",
          "Nenhum desses",
        ];
        const sel0 = answers.scalpConditions || [];
        const toggle0 = (opt) => {
          let next;
          if (opt === "Nenhum desses") { next = sel0.includes(opt) ? [] : ["Nenhum desses"]; }
          else { const without = sel0.filter(x => x !== "Nenhum desses"); next = without.includes(opt) ? without.filter(x => x !== opt) : [...without, opt]; }
          setAnswers(p => ({ ...p, scalpConditions: next }));
        };
        return (
          <div>
            <div style={s.tag}>Sua saúde · Passo 2 de 2</div>
            <h2 style={s.heading}>Você notou algum desses sinais no couro cabeludo nos últimos meses?</h2>
            <p style={s.sub}>Selecione todos que se aplicam.</p>
            <div style={s.why}>
              <div style={{ fontSize:12, fontWeight:700, marginBottom:4 }}>Por que estamos perguntando?</div>
              <p style={{ fontSize:13, color:"#666", lineHeight:1.6 }}>Algumas condições precisam ser avaliadas antes de iniciar o tratamento capilar.</p>
            </div>
            {SCALP_OPTS.map(opt => (
              <button key={opt} style={{ ...s.option(sel0.includes(opt)), alignItems:"center" }}
                onClick={() => toggle0(opt)}>
                <div style={{ width:18, height:18, borderRadius:4, flexShrink:0,
                  border:`2px solid ${sel0.includes(opt) ? "#fff" : "#ddd"}`,
                  background: sel0.includes(opt) ? "#fff" : "transparent",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {sel0.includes(opt) && <span style={{ color:"#021d34", fontSize:11, fontWeight:700 }}>✓</span>}
                </div>
                <span style={{ fontSize:14 }}>{opt}</span>
              </button>
            ))}
          </div>
        );
      }

      // Step 1 – Tratamento nos últimos 12 meses?
      if (healthStep === 1) return (
        <div>
          <div style={s.tag}>Sua saúde · Passo 2 de 2</div>
          <h2 style={s.heading}>Você já usou algum tratamento para queda de cabelo nos últimos 12 meses?</h2>
          {[
            { val:"Sim", label:"Sim — já usei algum tratamento." },
            { val:"Não", label:"Não — nunca usei nenhum tratamento." },
          ].map(opt => (
            <button key={opt.val} style={s.option(answers.prevTreatment12mo === opt.val)}
              onClick={() => answerHealthSingle("prevTreatment12mo", opt.val)}>
              <div style={{ width:20, height:20, borderRadius:"50%",
                border:`2px solid ${answers.prevTreatment12mo === opt.val ? "#fff" : "#ddd"}`,
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                {answers.prevTreatment12mo === opt.val && <div style={{ width:10, height:10, borderRadius:"50%", background:"#fff" }}/>}
              </div>
              {opt.label}
            </button>
          ))}
        </div>
      );

      // Step 2 – Quais tratamentos?
      if (healthStep === 2) {
        const sel = answers.treatments || [];
        const toggle = (opt) => {
          const newSel = sel.includes(opt) ? sel.filter(x => x !== opt) : [...sel, opt];
          setAnswers(p => ({ ...p, treatments: newSel }));
        };
        return (
          <div>
            <div style={s.tag}>Sua saúde · Passo 2 de 2</div>
            <h2 style={s.heading}>Quais tratamentos você já usou?</h2>
            <p style={s.sub}>Marque todos os ativos que fizeram parte do seu protocolo.</p>
            {TREATMENTS_LIST.map(opt => (
              <button key={opt.id} style={{ ...s.option(sel.includes(opt.id)), alignItems:"center" }}
                onClick={() => toggle(opt.id)}>
                <div style={{ width:18, height:18, borderRadius:4, flexShrink:0,
                  border:`2px solid ${sel.includes(opt.id) ? "#fff" : "#ddd"}`,
                  background: sel.includes(opt.id) ? "#fff" : "transparent",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {sel.includes(opt.id) && <span style={{ color:"#021d34", fontSize:11, fontWeight:700 }}>✓</span>}
                </div>
                <span style={{ fontSize:14 }}>{opt.label}</span>
              </button>
            ))}
          </div>
        );
      }

      // Step 3 – Drill-down de performance por ativo
      if (healthStep === 3) {
        const selIds = answers.treatments || [];
        const perf = answers.performance || {};
        const setPerf = (id, val) => setAnswers(p => ({ ...p, performance: { ...(p.performance||{}), [id]: val } }));
        const selectedTreatments = TREATMENTS_LIST.filter(t => selIds.includes(t.id));
        return (
          <div>
            <div style={s.tag}>Sua saúde · Passo 2 de 2</div>
            <h2 style={s.heading}>Qual foi a sua percepção sobre cada ativo utilizado?</h2>
            <p style={s.sub}>Esta leitura orienta o médico a manter, ajustar ou evoluir o seu protocolo.</p>
            {selectedTreatments.map(t => (
              <div key={t.id} style={{ background:"#fff", border:"1px solid rgba(0,0,0,0.08)",
                borderRadius:12, padding:"14px 16px", marginBottom:10 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#1A1A1A", marginBottom:10 }}>
                  {t.label}
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {PERFORMANCE_OPTS.map(opt => {
                    const active = perf[t.id] === opt.val;
                    return (
                      <button key={opt.val} onClick={() => setPerf(t.id, opt.val)}
                        style={{ display:"flex", alignItems:"center", gap:10,
                          background: active ? "#012e46" : "#F6FAFC",
                          color: active ? "#fff" : "#1A1A1A",
                          border: `1.5px solid ${active ? "#012e46" : "#E3EEF3"}`,
                          borderRadius:10, padding:"10px 14px", cursor:"pointer",
                          fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:500,
                          textAlign:"left", transition:"all 0.15s" }}>
                        <div style={{ width:16, height:16, borderRadius:"50%",
                          border:`2px solid ${active ? "#fff" : "#94b8d7"}`,
                          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          {active && <div style={{ width:8, height:8, borderRadius:"50%", background:"#fff" }}/>}
                        </div>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        );
      }

      // Step 5 – Condições médicas (multi-select)
      if (healthStep === 5) {
        const sel = answers.conditions || [];
        const toggle = (opt) => {
          const excl = "Não, eu nunca tive nenhum desses";
          let newSel;
          if (opt === excl) newSel = [excl];
          else newSel = sel.filter(x => x !== excl).includes(opt)
            ? sel.filter(x => x !== opt)
            : [...sel.filter(x => x !== excl), opt];
          setAnswers(p => ({ ...p, conditions: newSel }));
        };
        return (
          <div>
            <div style={s.tag}>Sua saúde · Passo 2 de 2</div>
            <h2 style={s.heading}>Alguma dessas condições faz parte do seu histórico?</h2>
            <div style={s.why}>
              <div style={{ fontSize:12, fontWeight:700, marginBottom:4 }}>Por que estamos perguntando?</div>
              <p style={{ fontSize:13, color:"#666", lineHeight:1.6 }}>Essas informações são confidenciais e usadas exclusivamente pelo médico para garantir que o tratamento seja seguro para você.</p>
            </div>
            {CONDITIONS.map(opt => (
              <button key={opt} style={{ ...s.option(sel.includes(opt)), alignItems:"center", marginBottom:8 }}
                onClick={() => toggle(opt)}>
                <div style={{ width:18, height:18, borderRadius:4, flexShrink:0,
                  border:`2px solid ${sel.includes(opt) ? "#fff" : "#ddd"}`,
                  background: sel.includes(opt) ? "#fff" : "transparent",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {sel.includes(opt) && <span style={{ color:"#021d34", fontSize:11, fontWeight:700 }}>✓</span>}
                </div>
                <span style={{ fontSize:13 }}>{opt}</span>
              </button>
            ))}
          </div>
        );
      }

      // Step 6 – Preferência do bloqueador de DHT (com blindagem)
      if (healthStep === 6) {
        const flags = getSafetyFlags(answers.conditions, answers.scalpConditions, answers.performance);
        const allOpts = [
          { val:"Dutasterida",           label:"Protocolo de Alta Potência",      sub:"Dutasterida 0,5mg — bloqueio ampliado da via DHT",                route:"oral",   key:"dutOral" },
          { val:"Finasterida",           label:"Protocolo Equilibrado",           sub:"Finasterida 1mg — perfil consolidado de eficácia e tolerância",   route:"oral",   key:"finOral" },
          { val:"Finasterida tópica",    label:"Protocolo de Ação Local",         sub:"Finasterida Tópica — aplicação direta, menor exposição sistêmica", route:"topica", key:"finTop"  },
          { val:"Saw Palmetto",          label:"Protocolo Fitoterápico",          sub:"Saw Palmetto — rota natural, sem fármaco sintético",               route:"oral",   key:"saw"     },
        ];
        const visible = allOpts.filter(o => {
          if (o.route === "any" || o.route === "topica") return !flags.topicalContraindicated ? true : o.route !== "topica" || true;
          // orais bloqueados por insuficiência hepato-renal, endócrino, ou reação adversa
          if (o.route === "oral" && flags.blockOralDHT) return false;
          return true;
        });
        const suggestDut = flags.finasteridaFail && !flags.blockOralDHT;
        const filtered = visible.length !== allOpts.length;
        return (
          <div>
            <div style={s.tag}>Sua saúde · Passo 2 de 2</div>
            <h2 style={s.heading}>Qual rota terapêutica ressoa melhor com você?</h2>
            <p style={s.sub}>Esta é apenas uma sinalização de preferência — a Análise Clínica Especializada define o plano final.</p>
            {filtered && (
              <div style={{ background:"#FFF8E7", border:"1px solid #FCD34D", borderRadius:8, padding:"10px 14px", marginBottom:14, fontSize:13, color:"#78350F", lineHeight:1.6 }}>
                <strong>Blindagem clínica ativa:</strong> algumas vias orais foram ocultadas com base no seu histórico para preservar a sua segurança.
              </div>
            )}
            {suggestDut && (
              <div style={{ background:"#EDF5F8", border:"1px solid #c8dde6", borderRadius:8, padding:"10px 14px", marginBottom:14, fontSize:13, color:"#021d34", lineHeight:1.6 }}>
                <strong>Sugestão do motor:</strong> você reportou ausência de evolução com Finasterida 1mg — o Protocolo de Alta Potência (Dutasterida) pode trazer ganho clínico.
              </div>
            )}
            {visible.map(opt => (
              <button key={opt.val}
                style={{ ...s.option(answers.medication === opt.val), flexDirection:"column", alignItems:"flex-start" }}
                onClick={() => answerHealthSingle("medication", opt.val)}>
                <div style={{ fontWeight:600 }}>{opt.label}</div>
                <div style={{ fontSize:12, opacity:0.6 }}>{opt.sub}</div>
              </button>
            ))}
          </div>
        );
      }

      // Step 7 – Tipo de Minoxidil preferido
      if (healthStep === 7) {
        const flags7 = getSafetyFlags(answers.conditions, answers.scalpConditions, answers.performance);
        const hideTopico = flags7.topicalContraindicated;
        const hideOral = flags7.blockMinoxOral;
        const minoxOpts = [
          ...(!hideOral ? [{ val:"Minoxidil oral", label:"Via Sistêmica", sub:"Minoxidil Oral — cobertura ampla via comprimido" }] : []),
          ...(!hideTopico ? [{ val:"Minoxidil 5% tópico", label:"Via Local", sub:"Minoxidil 5% Spray — aplicação direta no couro cabeludo" }] : []),
        ];
        return (
          <div>
            <div style={s.tag}>Sua saúde · Passo 2 de 2</div>
            <h2 style={s.heading}>Para ativar o crescimento capilar, qual rota prefere?</h2>
            {(hideTopico || hideOral) && (
              <div style={{ background:"#FFF8E7", border:"1px solid #FCD34D", borderRadius:8, padding:"10px 14px", marginBottom:14, fontSize:13, color:"#78350F", lineHeight:1.6 }}>
                <strong>Blindagem clínica ativa:</strong> {hideOral && hideTopico ? "ambas as rotas estão restritas — consulte o suporte." : hideOral ? "a via sistêmica (oral) foi ocultada para preservar o seu perfil cardiovascular/metabólico." : "a via local (tópica) não é recomendada devido a sinais no couro cabeludo."}
              </div>
            )}
            {minoxOpts.map(opt => (
              <button key={opt.val}
                style={{ ...s.option(answers.minoxidilType === opt.val), flexDirection:"column", alignItems:"flex-start" }}
                onClick={() => answerHealthSingle("minoxidilType", opt.val)}>
                <div style={{ fontWeight:600 }}>{opt.label}</div>
                <div style={{ fontSize:12, opacity:0.6 }}>{opt.sub}</div>
              </button>
            ))}
          </div>
        );
      }

      return null;
    }

    const isMultiStep = healthStep === 0 || healthStep === 2 || healthStep === 3 || healthStep === 5;
    const selIds_ = answers.treatments || [];
    const perf_ = answers.performance || {};
    const canContinueMulti =
      healthStep === 0 ? (answers.scalpConditions || []).length > 0 :
      healthStep === 2 ? (answers.treatments || []).length > 0 :
      healthStep === 3 ? selIds_.every(id => perf_[id]) :
                         (answers.conditions || []).length > 0;

    return (
      <div style={s.wrap}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
        <div style={s.nav}>
          <Logo />
          <span style={{ fontSize:11, color:"#aaa" }}>{displayStep} / 8</span>
        </div>
        <div style={s.progressBg}><div style={{ ...s.progressBar, width:`${pct}%` }}/></div>

        <div style={s.body}>
          {renderHealthStep()}
        </div>

        {isMultiStep && (
          <div style={s.cta}>
            <button
              style={{ ...s.ctaBtn, opacity: canContinueMulti ? 1 : 0.4 }}
              disabled={!canContinueMulti}
              onClick={nextHealthMulti}>
              Continuar →
            </button>
            <button onClick={() => setHealthStep(p => Math.max(0, p - 1))}
              style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, color:"#aaa",
                marginTop:10, display:"block", width:"100%", textAlign:"center",
                fontFamily:"'Outfit',sans-serif" }}>
              ← Voltar
            </button>
          </div>
        )}
        {!isMultiStep && healthStep > 0 && (
          <div style={{ position:"fixed", bottom:0, left:0, right:0, padding:"16px 20px",
            background:"#fff", borderTop:"1px solid rgba(0,0,0,0.07)", zIndex:90, textAlign:"center" }}>
            <button onClick={() => setHealthStep(p => Math.max(0, p - 1))}
              style={{ background:"none", border:"none", cursor:"pointer", fontSize:13, color:"#aaa",
                fontFamily:"'Outfit',sans-serif" }}>← Voltar</button>
          </div>
        )}
      </div>
    );
  }

  // ── TRANSIÇÃO: FALTA POUCO ─────────────────────────────────────────────────
  if (phase === "section3-intro") return (
    <div style={s.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={s.nav}><Logo /></div>
      <div style={s.progressBg}><div style={{ ...s.progressBar, width:"95%" }}/></div>

      <div style={{ ...s.body, paddingTop:48 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:0, marginBottom:32,
          border:"1px solid rgba(0,0,0,0.08)", borderRadius:16, overflow:"hidden", background:"#fff" }}>
          {[
            { n:"✓", label:"Como está seu cabelo?",  done:true },
            { n:"✓", label:"Falando da sua saúde",   done:true },
            { n:"3", label:"Seu Plano Fio Raiz",     done:false, active:true },
          ].map((item, i, arr) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 18px",
              borderBottom: i < arr.length-1 ? "1px solid rgba(0,0,0,0.06)" : "none",
              background: item.active ? "#fafaf8" : "#fff" }}>
              <div style={{ width:30, height:30, borderRadius:"50%", flexShrink:0,
                background: item.done ? "#16a34a" : "#021d34",
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:13, fontWeight:700, color:"#fff" }}>{item.n}</span>
              </div>
              <span style={{ flex:1, fontSize:14,
                fontWeight: item.active ? 700 : 400,
                color: item.active ? "#021d34" : "#555" }}>{item.label}</span>
            </div>
          ))}
        </div>

        <h2 style={{ ...s.heading, marginBottom:12 }}>Falta pouco para começar!</h2>
        <p style={s.sub}>
          Estamos analisando suas respostas para montar o plano ideal para o seu perfil.
          Em seguida, você verá o resultado da sua avaliação.
        </p>
      </div>

      <div style={s.cta}>
        <button style={s.ctaBtn} onClick={() => { setLoadingStep(0); setPhase("loading"); }}>
          Ver minha avaliação →
        </button>
      </div>
    </div>
  );

  // ── LOADING ─────────────────────────────────────────────────────────────────
  if (phase === "loading") {
    const msgs = [
      { icon:"🔍", text:"Analisando suas respostas" },
      { icon:"👨‍⚕️", text:"Verificando médico disponível" },
      { icon:"📋", text:"Construindo seu plano personalizado" },
    ];
    return (
      <div style={s.wrap}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
        <div style={s.nav}><Logo /></div>
        <div style={s.progressBg}><div style={{ ...s.progressBar, width:`${(loadingStep / 3) * 100}%` }}/></div>

        <div style={{ ...s.body, paddingTop:60, textAlign:"center" }}>
          <div style={{ fontSize:48, marginBottom:24, animation:"spin 1s linear infinite" }}>⚙️</div>
          <style>{`@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`}</style>

          <h2 style={{ ...s.heading, textAlign:"center", marginBottom:32 }}>Processando sua avaliação…</h2>

          <div style={{ display:"flex", flexDirection:"column", gap:12, textAlign:"left" }}>
            {msgs.map((m, i) => {
              const done = i < loadingStep;
              const active = i === loadingStep - 1;
              return (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px",
                  background: done ? "#fff" : "#F0F7FA", borderRadius:12,
                  border:`1px solid ${done ? "#16a34a33" : "rgba(0,0,0,0.06)"}`,
                  transition:"all 0.4s" }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", flexShrink:0,
                    background: done ? "#16a34a" : "#ececea",
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>
                    {done ? "✓" : m.icon}
                  </div>
                  <span style={{ fontSize:14, fontWeight: done ? 600 : 400,
                    color: done ? "#021d34" : "#888" }}>{m.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTADO ──────────────────────────────────────────────────────────────
  if (phase === "result") {
    const hairType = HAIR_TYPES.find(h => h.label === answers.hairType) || HAIR_TYPES[0];
    const stage = hairType.stage || 3;

    return (
      <div style={s.wrap}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
        <div style={s.nav}><Logo /></div>
        <div style={s.progressBg}><div style={{ ...s.progressBar, width:"100%" }}/></div>

        <div style={s.body}>
          <div style={s.tag}>Resultado da sua avaliação</div>
          <h2 style={{ ...s.heading, marginBottom:4 }}>Identificamos o seu perfil capilar</h2>
          <p style={s.sub}>Com base nas suas respostas, o médico vai montar um protocolo personalizado.</p>

          {/* Hair visual — usa a mesma imagem (sprite) da pergunta inicial */}
          <div style={{ background:"#fff", borderRadius:20, padding:"24px 20px", marginBottom:20,
            border:"1px solid rgba(0,0,0,0.08)", textAlign:"center" }}>
            <div style={{
              width:"min(220px, 70%)",
              aspectRatio:"241 / 270",
              margin:"0 auto",
              backgroundImage:"url('/calvicie-tipos.png')",
              backgroundSize:"200% 300%",
              backgroundPosition:`${hairType.col * 100}% ${hairType.row * 50}%`,
              backgroundRepeat:"no-repeat",
            }} />
            <div style={{ marginTop:12 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase",
                color:"#888", marginBottom:4 }}>Estágio identificado</div>
              <div style={{ fontSize:22, fontWeight:800 }}>{answers.hairType || "Entradas"}</div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4, marginTop:8 }}>
                {[1,2,3,4,5,6,7].map(n => (
                  <div key={n} style={{ width:10, height:10, borderRadius:"50%",
                    background: n <= stage ? "#021d34" : "#e0e0e0" }}/>
                ))}
              </div>
              <div style={{ fontSize:11, color:"#aaa", marginTop:4 }}>Escala de Hamilton-Norwood · Estágio {stage}</div>
            </div>
          </div>

          {/* O que identificamos */}
          <div style={{ background:"#fff", borderRadius:16, padding:"20px 18px", marginBottom:20,
            border:"1px solid rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize:13, fontWeight:700, marginBottom:14 }}>O que identificamos no seu perfil</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[
                { label:"Tipo de calvície", val: answers.hairType || "—" },
                { label:"Progressão", val: answers.gradual || "—" },
                { label:"Histórico familiar", val: answers.family || "—" },
                { label:"Objetivo", val: answers.goal || "—" },
              ].map(({ label, val }) => (
                <div key={label} style={{ display:"flex", justifyContent:"space-between",
                  padding:"8px 0", borderBottom:"1px solid rgba(0,0,0,0.05)", fontSize:13 }}>
                  <span style={{ color:"#888" }}>{label}</span>
                  <span style={{ fontWeight:600 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Indicação do protocolo */}
          <div style={{ background:"#012e46", borderRadius:16, padding:"20px 18px", color:"#fff", marginBottom:20 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase",
              color:"rgba(255,255,255,0.5)", marginBottom:8 }}>Protocolo indicado</div>
            <div style={{ fontSize:17, fontWeight:700, marginBottom:4 }}>
              {answers.medication || "Finasterida"} + {answers.minoxidilType || "Minoxidil oral"}
            </div>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.6)", lineHeight:1.6 }}>
              Um médico vai confirmar e personalizar este protocolo com base em todo o seu histórico.
            </p>
          </div>
        </div>

        <div style={s.cta}>
          <button style={s.ctaBtn} onClick={() => setPhase("contact")}>
            Quero meu plano personalizado →
          </button>
        </div>
      </div>
    );
  }

  // ── CONTATO ────────────────────────────────────────────────────────────────
  if (phase === "contact") return (
    <div style={s.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={s.nav}><Logo /></div>
      <div style={s.body}>
        <div style={s.tag}>Quase lá</div>
        <h2 style={s.heading}>Para onde enviamos o seu plano?</h2>
        <p style={s.sub}>Um médico vai analisar suas respostas e enviar a avaliação. Precisamos dos seus dados para isso.</p>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {[
            { key:"nome",     label:"Nome completo",   placeholder:"Seu nome",       type:"text"  },
            { key:"email",    label:"E-mail",           placeholder:"seu@email.com",  type:"email" },
            { key:"whatsapp", label:"WhatsApp",         placeholder:"(11) 99999-9999", type:"tel"  },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontSize:12, fontWeight:700, color:"#555", display:"block", marginBottom:6 }}>{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={contactInfo[f.key]}
                onChange={e => setContactInfo(p => ({ ...p, [f.key]: e.target.value }))}
                style={{ width:"100%", padding:"14px 16px", border:"1.5px solid rgba(0,0,0,0.12)",
                  borderRadius:12, fontSize:15, fontFamily:"'Outfit',sans-serif", outline:"none" }}
                onFocus={e => e.target.style.borderColor="#021d34"}
                onBlur={e => e.target.style.borderColor="rgba(0,0,0,0.12)"}
              />
            </div>
          ))}
        </div>

        {contactError && (
          <div style={{ marginTop:12, fontSize:13, color:"#e53e3e", fontWeight:500 }}>{contactError}</div>
        )}

        <div style={{ marginTop:20, background:"#F0F7FA", borderRadius:12, padding:"12px 16px",
          fontSize:12, color:"#888", lineHeight:1.6 }}>
          🔒 Seus dados são confidenciais e usados exclusivamente para envio da sua análise clínica especializada.
        </div>
      </div>
      <div style={s.cta}>
        <button style={s.ctaBtn} onClick={continueFromContact}>
          Ver meu plano personalizado →
        </button>
      </div>
    </div>
  );

  // ── PLANO ──────────────────────────────────────────────────────────────────
  if (phase === "plan") return (
    <div style={s.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
      {showDiscount && !discountApplied && (
        <Countdown onClose={() => setShowDiscount(false)} onApply={() => { setDiscountApplied(true); setShowDiscount(false); }}/>
      )}
      <div style={{ ...s.nav, justifyContent:"center", gap:"clamp(8px, 3vw, 18px)", padding:"14px 12px" }}>
        <span style={{ fontSize:"clamp(9px, 2.6vw, 11px)", color:"#aaa", letterSpacing:"0.06em", whiteSpace:"nowrap" }}>QUESTIONÁRIO ✓</span>
        <span style={{ fontSize:"clamp(9px, 2.6vw, 11px)", fontWeight:700, borderBottom:"2px solid #1A3040", paddingBottom:2, whiteSpace:"nowrap" }}>TRATAMENTO</span>
        <span style={{ fontSize:"clamp(9px, 2.6vw, 11px)", color:"#aaa", letterSpacing:"0.06em", whiteSpace:"nowrap" }}>PEDIDO</span>
      </div>
      <div style={s.body}>
        <h2 style={{ ...s.heading, textAlign:"center" }}>Seu Protocolo Capilar Personalizado</h2>
        <p style={{ ...s.sub, textAlign:"center" }}>Personalizamos sua jornada com base na sua segurança clínica e experiências passadas. Após a confirmação, um médico parceiro valida o plano em Análise Clínica Especializada.</p>

        {(() => {
          const fl = getSafetyFlags(answers.conditions, answers.scalpConditions, answers.performance);
          const items = [];
          if (fl.cardiac)   items.push("Via oral do Minoxidil restrita por perfil cardiovascular");
          if (fl.endocrine) items.push("Inibidores de DHT via oral ocultados por perfil endócrino");
          if (fl.hepatic || fl.renal) items.push("Ativos sistêmicos desativados — protocolo 100% tópico");
          if (fl.pillAdverse) items.push("Reação adversa em comprimido anterior: bloqueio de via oral");
          if (fl.finasteridaFail) items.push("Escalonamento sugerido: Dutasterida 0,5mg");
          if (fl.dermatitis) items.push("Higiene Terapêutica incluída como item essencial");
          if (!items.length) return null;
          return (
            <div style={{ background:"#EDF5F8", border:"1px solid #c8dde6", borderRadius:12,
              padding:"16px 18px", marginBottom:20 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em",
                color:"#012e46", textTransform:"uppercase", marginBottom:8 }}>
                🛡️ Blindagem clínica aplicada
              </div>
              <ul style={{ paddingLeft:18, fontSize:13, color:"#1A1A1A", lineHeight:1.7 }}>
                {items.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          );
        })()}

        <div style={{ marginBottom:20 }}>
          <h3 style={{ fontSize:16, fontWeight:700, marginBottom:4 }}>Protocolo de Alta Performance</h3>
          <p style={{ fontSize:13, color:"#888", marginBottom:14 }}>Atua na raiz hormonal da queda e ativa a fase de crescimento dos folículos. Sob prescrição médica.</p>

          <div style={{ fontSize:13, fontWeight:600, marginBottom:10 }}>Qual formato você prefere?</div>
          <div style={{ display:"flex", gap:0, background:"#EDF5F8", borderRadius:10, padding:4, marginBottom:16 }}>
            {[["unicas","Cápsulas únicas","Mais prático"],["separadas","Cápsulas separadas",null]].map(([val, label, badge]) => (
              <button key={val} onClick={() => setFormat(val)}
                style={{ flex:1, background: format===val ? "#fff" : "transparent",
                  border:`1.5px solid ${format===val ? "rgba(0,0,0,0.15)" : "transparent"}`,
                  borderRadius:8, padding:"10px 8px", cursor:"pointer",
                  fontFamily:"'Outfit',sans-serif", fontWeight: format===val ? 700 : 400,
                  fontSize:13, position:"relative", transition:"all 0.2s" }}>
                {badge && <span style={{ position:"absolute", top:-8, left:"50%", transform:"translateX(-50%)",
                  background:"#16a34a", color:"#fff", fontSize:9, padding:"2px 8px",
                  borderRadius:100, fontWeight:700, whiteSpace:"nowrap" }}>{badge}</span>}
                {label}
              </button>
            ))}
          </div>

          <div style={{ background:"#fff", borderRadius:14, padding:"18px 16px",
            border:"1px solid rgba(0,0,0,0.08)", marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:700, marginBottom:4 }}>Inibidor Hormonal + Ativador Folicular</div>
                <p style={{ fontSize:13, color:"#888", lineHeight:1.6 }}>Dupla sinérgica que freia a via do DHT (gatilho hormonal da queda) e estimula novos fios na fase anágena.</p>
              </div>
              <div style={{ width:48, height:48, background:"#EDF5F8", borderRadius:10,
                display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0, marginLeft:12, fontSize:22 }}>💊</div>
            </div>
            <div style={{ marginTop:14, paddingTop:14, borderTop:"1px solid rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", color:"#aaa", marginBottom:8 }}>LEITURA PERSONALIZADA</div>
              <div style={{ display:"flex", gap:8 }}>
                {[
                  ["Inibidor Hormonal", answers.medication || "Finasterida"],
                  ["Ativador Folicular", answers.minoxidilType || "Minoxidil oral"],
                ].map(([label, val], i) => (
                  <div key={i} style={{ flex:1, background:"#F0F7FA", borderRadius:8, padding:"10px 10px" }}>
                    <div style={{ fontSize:10, color:"#aaa", marginBottom:3 }}>{label}</div>
                    <div style={{ fontSize:12, fontWeight:600 }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Caspa recommendation */}
        {(() => { const sc = answers.scalpConditions || []; return sc.includes("Caspa frequente") || sc.includes("Psoríase (diagnóstico médico)") || sc.includes("Vermelhidão ou dor"); })() && (
          <div style={{ marginBottom:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
              <h3 style={{ fontSize:16, fontWeight:700 }}>Recomendado para você</h3>
              <span style={{ background:"#012e46", color:"#fff", fontSize:9, fontWeight:700,
                padding:"2px 8px", borderRadius:100, letterSpacing:"0.08em" }}>ITEM ESSENCIAL</span>
            </div>
            <div style={{ background:"#fff", borderRadius:14, padding:"18px 16px",
              border:"1px solid rgba(0,0,0,0.08)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:700, marginBottom:4 }}>Higiene Terapêutica — Shampoo Clínico</div>
                  <p style={{ fontSize:13, color:"#888", lineHeight:1.6 }}>
                    A sua leitura indicou sinais no couro cabeludo. O Shampoo Clínico equilibra a microbiota, controla a oleosidade e prepara o terreno folicular para o Protocolo de Alta Performance.
                  </p>
                  <div style={{ fontSize:12, color:"#012e46", fontWeight:700, marginTop:8 }}>+ R$ 20/mês</div>
                </div>
                <div style={{ width:48, height:48, background:"#EDF5F8", borderRadius:10,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  flexShrink:0, marginLeft:12, fontSize:22 }}>🧴</div>
              </div>
            </div>
          </div>
        )}

      </div>
      <div style={s.cta}>
        <button style={s.ctaBtn} onClick={continueFromPlan}>Avançar para o checkout →</button>
      </div>
    </div>
  );

  // ── CHECKOUT ───────────────────────────────────────────────────────────────
  if (phase === "checkout") return (
    <div style={{ ...s.wrap, paddingBottom: 0 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={{ ...s.nav, justifyContent:"center", gap:"clamp(8px, 3vw, 18px)", padding:"14px 12px" }}>
        <span style={{ fontSize:"clamp(9px, 2.6vw, 11px)", color:"#aaa", letterSpacing:"0.06em", whiteSpace:"nowrap" }}>QUESTIONÁRIO ✓</span>
        <span style={{ fontSize:"clamp(9px, 2.6vw, 11px)", color:"#aaa", letterSpacing:"0.06em", whiteSpace:"nowrap" }}>TRATAMENTO ✓</span>
        <span style={{ fontSize:"clamp(9px, 2.6vw, 11px)", fontWeight:700, borderBottom:"2px solid #1A3040", paddingBottom:2, whiteSpace:"nowrap" }}>PEDIDO</span>
      </div>
      <div style={s.body}>
        <h2 style={s.heading}>Frequência do plano</h2>
        {discountApplied && (
          <div style={{ background:"#d4f0d4", borderRadius:10, padding:"10px 14px", marginBottom:16,
            fontSize:13, fontWeight:600, color:"#166534", display:"flex", gap:8, alignItems:"center" }}>
            🎉 Desconto de 30% aplicado!
          </div>
        )}

        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
          {Object.entries(prices).map(([key, p]) => (
            <div key={key} onClick={() => setPlanPeriod(key)}
              style={{ background:"#fff", borderRadius:14, padding:"18px 14px",
                border:`1.5px solid ${planPeriod===key ? "#021d34" : "rgba(0,0,0,0.1)"}`,
                cursor:"pointer", position:"relative", transition:"all 0.2s",
                boxSizing:"border-box", maxWidth:"100%", overflow:"hidden" }}>
              {p.badge && <span style={{ position:"absolute", top:-8, left:14, background:"#16a34a",
                color:"#fff", fontSize:10, padding:"2px 10px", borderRadius:100, fontWeight:700 }}>{p.badge}</span>}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:10, minWidth:0 }}>
                <div style={{ display:"flex", gap:10, alignItems:"center", minWidth:0, flexShrink:1 }}>
                  <div style={{ width:20, height:20, borderRadius:"50%", flexShrink:0,
                    border:`2px solid ${planPeriod===key ? "#021d34" : "#ddd"}`,
                    display:"flex", alignItems:"center", justifyContent:"center" }}>
                    {planPeriod===key && <div style={{ width:10, height:10, borderRadius:"50%", background:"#012e46" }}/>}
                  </div>
                  <span style={{ fontSize:"clamp(13px, 3.6vw, 15px)", fontWeight:600 }}>{p.label}</span>
                </div>
                <div style={{ textAlign:"right", flexShrink:0, minWidth:0 }}>
                  <div style={{ fontSize:"clamp(14px, 4vw, 17px)", fontWeight:800, whiteSpace:"nowrap" }}>{p.intro}<span style={{ fontSize:"clamp(10px, 2.8vw, 12px)", fontWeight:400, color:"#888" }}>/mês</span></div>
                  <div style={{ fontSize:"clamp(9px, 2.6vw, 11px)", color:"#aaa", whiteSpace:"nowrap" }}>{p.after} após {key==="semestral"?"6":"3"} meses</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom:20 }}>
          <h3 style={{ fontSize:15, fontWeight:700, marginBottom:12 }}>Descomplicado, flexível e com suporte</h3>
          {["Pause, ajuste ou cancele quando quiser","Suporte clínico ilimitado via WhatsApp","Entrega discreta no seu endereço"].map((t,i) => (
            <div key={i} style={{ display:"flex", gap:10, padding:"8px 0",
              borderBottom: i<2 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
              <span style={{ color:"#16a34a" }}>✓</span>
              <span style={{ fontSize:14, color:"#444" }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position:"fixed", bottom:0, left:0, right:0,
        background:"#fff", borderTop:"1px solid rgba(0,0,0,0.08)",
        padding:"12px clamp(12px, 3.5vw, 20px)",
        zIndex:90, boxSizing:"border-box", maxWidth:"100vw", width:"100%"
      }}>
        <div style={{
          display:"flex", alignItems:"center", gap:10, maxWidth:520, margin:"0 auto",
          flexWrap:"nowrap"
        }}>
          <div style={{ flexShrink:0, minWidth:0 }}>
            <div style={{ display:"flex", gap:6, alignItems:"baseline", flexWrap:"wrap" }}>
              <span style={{ fontSize:"clamp(16px, 4.5vw, 20px)", fontWeight:800, color:"#1A1A1A" }}>{activePrice.intro}</span>
              {discountApplied && <span style={{ fontSize:12, color:"#aaa", textDecoration:"line-through" }}>{activePrice.after}</span>}
            </div>
            <div style={{ fontSize:10, color:"#aaa", whiteSpace:"nowrap" }}>pelos {activePrice.label} primeiros</div>
          </div>
          <button onClick={() => setPhase("done")}
            style={{ flex:1, minWidth:0, background:"#012e46", color:"#fff", border:"none", borderRadius:100,
              padding:"14px 16px", fontSize:"clamp(12px, 3.4vw, 14px)", fontWeight:700, cursor:"pointer",
              fontFamily:"'Outfit',sans-serif", whiteSpace:"nowrap" }}>
            Continuar →
          </button>
        </div>
      </div>
    </div>
  );

  // ── DONE ───────────────────────────────────────────────────────────────────
  if (phase === "done") return (
    <div style={s.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={s.nav}><Logo /></div>
      <div style={{ ...s.body, textAlign:"center", paddingTop:60 }}>
        <div style={{ width:64, height:64, borderRadius:"50%", background:"#012e46",
          display:"flex", alignItems:"center", justifyContent:"center",
          margin:"0 auto 24px", fontSize:28 }}>✓</div>
        <h2 style={{ ...s.heading, textAlign:"center" }}>Pedido recebido.</h2>
        <p style={{ ...s.sub, textAlign:"center" }}>Um médico parceiro vai revisar suas respostas e emitir a prescrição em até 24h. Você recebe por e-mail.</p>
        <div style={{ background:"#fff", border:"1px solid rgba(0,0,0,0.08)", borderRadius:14, padding:20, textAlign:"left" }}>
          {[
            ["Hoje",            "Médico avalia suas respostas"],
            ["Em até 24h",      "Prescrição emitida por e-mail"],
            ["Em 3 dias úteis", "Farmácia despacha o tratamento"],
            ["Na sua porta",    "Embalagem Fio Raiz, discreta"],
          ].map(([t,d],i) => (
            <div key={i} style={{ display:"flex", gap:14, padding:"10px 0",
              borderBottom: i<3 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
              <span style={{ fontSize:12, color:"#aaa", minWidth:100, fontWeight:600 }}>{t}</span>
              <span style={{ fontSize:13, color:"#444" }}>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return null;
}
