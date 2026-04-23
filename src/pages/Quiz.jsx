import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

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

// ── Catálogo de produtos do protocolo ────────────────────────────────────────
const PROTOCOLOS = {
  bloqueador: [
    {
      id:"dut", nome:"Dutasterida", sub:"Mais potente", preco:80, precoTrimestral:88, tag:"Mais potente",
      desc:"Inibidor duplo de DHT de alta eficácia. Para casos moderados a avançados.",
      detalhes:"A Dutasterida inibe as enzimas 5-alfa-redutase tipo 1 e tipo 2, responsáveis pela conversão de testosterona em DHT — chegando a reduzir 93% dos níveis hormonais. Indicada para casos que não responderam adequadamente à Finasterida.",
      beneficios:["Redução de até 93% do DHT","Inibe as duas isoformas da enzima","Resultados visíveis em 3–6 meses"],
    },
    {
      id:"fin", nome:"Finasterida", sub:"Mais prescrito", preco:70, precoTrimestral:77, tag:"Mais prescrito",
      desc:"Inibidor seletivo DHT tipo 2. O mais estudado e prescrito mundialmente.",
      detalhes:"A Finasterida reduz em ~70% os níveis de DHT no couro cabeludo, interrompendo a miniaturização folicular. Com mais de 20 anos de estudos, é o padrão-ouro no tratamento da alopecia androgenética.",
      beneficios:["~70% de redução do DHT","Padrão ouro global","Mantém e recupera o cabelo"],
    },
    {
      id:"saw", nome:"Saw Palmetto", sub:"Natural · menor eficácia", preco:60, precoTrimestral:66, tag:"Natural",
      desc:"Extrato vegetal com ação antiandrogênica. Opção para quem prefere via natural.",
      detalhes:"O Saw Palmetto (Serenoa repens) atua como inibidor natural da 5-alfa-redutase com eficácia menor que a Finasterida, porém com perfil de efeitos colaterais favorável. Indicado para casos iniciais ou em complemento.",
      beneficios:["Origem natural","Boa tolerância","Pode ser combinado com outros ativos"],
    },
  ],
  minoxidil: [
    {
      id:"mnx_oral", nome:"Minoxidil Comprimido", sub:"Mais eficaz · oral", preco:30, precoTrimestral:33, tag:"Mais eficaz",
      desc:"Via sistêmica com maior biodisponibilidade. Atua uniformemente no couro cabeludo.",
      detalhes:"O Minoxidil oral em baixa dose apresenta maior absorção e cobertura uniforme em relação ao tópico. Indicado para casos moderados a avançados, com dose personalizada pelo médico.",
      beneficios:["Ação em todo o couro cabeludo","Maior biodisponibilidade","Dose controlada pelo médico"],
    },
    {
      id:"mnx_topico", nome:"Minoxidil Spray", sub:"Uso tópico", preco:20, precoTrimestral:25, tag:"Tópico",
      desc:"Aplicação diária localizada no couro cabeludo. Boa tolerância e sem absorção sistêmica.",
      detalhes:"O Minoxidil tópico 5% estimula a circulação nos folículos pilosos quando aplicado diretamente na área afetada. Indicado para casos iniciais ou como complemento ao oral.",
      beneficios:["Ação direta no foco","Boa tolerância","Sem absorção sistêmica relevante"],
    },
  ],
  addons: [
    {
      id:"shampoo", nome:"Shampoo Fortalecedor Fio Raiz", sub:"2 frascos de 400ml", preco:25,
      desc:"Fórmula com Ketoconazol 2% + ativos fortalecedores. Higiene terapêutica capilar.",
      detalhes:"Nosso Shampoo combina Ketoconazol 2% (anticaspa e antiandrogênico tópico) com Biotina, Pantenol e Saw Palmetto. Uso diário como complemento ao protocolo principal.",
      beneficios:["Ketoconazol 2% anticaspa","Fortalece a fibra capilar","Complementa o protocolo hormonal"],
    },
    {
      id:"biotina", nome:"Biotina Fio Raiz", sub:"180 cápsulas", preco:25,
      desc:"Vitamina B7 em alta concentração para suporte nutricional da haste capilar.",
      detalhes:"A Biotina (Vitamina B7) é essencial para a síntese de queratina. Nossa fórmula contém 10.000mcg por cápsula — concentração clínica para suporte nutricional efetivo ao crescimento capilar.",
      beneficios:["Fortalece a haste capilar","Reduz queda por deficiência nutricional","Suporte à síntese de queratina"],
    },
  ],
};

// Retorna o preço correto do produto conforme período escolhido
function getPreco(prod, period) {
  if (!prod) return 0;
  return period === "semestral" ? prod.preco : (prod.precoTrimestral ?? prod.preco);
}

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

// ── Slots de foto ─────────────────────────────────────────────────────────────
const FOTO_SLOTS = [
  { key:"entradas", label:"Entradas frontais", emoji:"👆", dica:"Frente com a testa aparecendo" },
  { key:"perfil",   label:"Perfil lateral",   emoji:"👤", dica:"Vista lateral da cabeça" },
  { key:"coroa",    label:"Vista superior",   emoji:"⬆️", dica:"De cima mostrando o topo" },
];

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Quiz() {
  const [phase, setPhase] = useState("intro");
  const [patternConfirmed, setPatternConfirmed] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [consentDone, setConsentDone] = useState(false);
  const [hairStep, setHairStep] = useState(0);
  const [healthStep, setHealthStep] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  const [answers, setAnswers] = useState({ peso: "", altura: "" });
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [format, setFormat] = useState("unicas");
  const [planPeriod, setPlanPeriod] = useState("semestral");
  const [contactInfo, setContactInfo] = useState({ nome:"", email:"", whatsapp:"", dataNascimento:"", cpf:"", medicamentosAtuais:"", cep:"", rua:"", bairro:"", cidade:"", estado:"", numero:"", senha:"", confirmarSenha:"" });
  const [contactError, setContactError] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [fotos, setFotos] = useState({ entradas: null, perfil: null, coroa: null });
  const [fotoPreviews, setFotoPreviews] = useState({});
  const [fotoModal, setFotoModal] = useState(null); // null | 'entradas' | 'perfil' | 'coroa'
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const [showConsentTooltip, setShowConsentTooltip] = useState(false);
  const [protocoloSel, setProtocoloSel] = useState({ bloqueador: null, minoxidil: null, addons: [] });
  const [produtoInfo, setProdutoInfo] = useState(null);
  const [pagLoading, setPagLoading] = useState(false);
  const [metodo, setMetodo] = useState("cartao");

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
    if (key === "hairType" && (val === "Queda Irregular" || val === "Queda Total")) { setPhase("pattern-stop"); return; }
    if (hairStep < 4) setHairStep(p => p + 1);
    else { setPhase("health-intro"); setHealthStep(0); }
  }

  function answerHealthSingle(key, val) {
    const updated = { ...answers, [key]: val };
    setAnswers(updated);
    if (healthStep === 0) { setHealthStep(1); } // scalp multi handled by nextHealthMulti
    else if (healthStep === 1) { setHealthStep(2); } // sempre vai para novo step 2 (peso/altura)
    else if (healthStep === 7) { setHealthStep(8); }
    else if (healthStep === 8) { setPhase("section3-intro"); }
  }

  function nextHealthMulti() {
    if (healthStep === 0) {
      const sc = answers.scalpConditions || [];
      if (sc.includes("Queda de pelos em outras partes do corpo")) { setPhase("presential-stop"); return; }
      setHealthStep(1);
      return;
    }
    // Novo step 2: peso/altura → ramifica conforme tratamento anterior
    if (healthStep === 2) {
      if (answers.prevTreatment12mo === "Sim") setHealthStep(3);
      else setHealthStep(6);
      return;
    }
    const sel = answers.treatments || [];
    if (healthStep === 3) {
      // Se selecionou ao menos 1 ativo, vai para drill-down de performance; senão, pula para condições
      if (sel.length > 0) setHealthStep(4);
      else setHealthStep(6);
    } else if (healthStep === 4) {
      setHealthStep(6);
    } else if (healthStep === 6) {
      const conds = answers.conditions || [];
      // Bloqueio oncológico: interrompe o fluxo
      if (conds.some(c => /oncológico|oncologico|câncer|cancer/i.test(c))) {
        setPhase("oncology-stop"); return;
      }
      setHealthStep(7);
    }
  }

  async function buscarCep(cep) {
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setContactInfo(p => ({ ...p, rua: data.logradouro || "", bairro: data.bairro || "", cidade: data.localidade || "", estado: data.uf || "" }));
      }
    } catch {} finally { setCepLoading(false); }
  }

  function handleFotoChange(e, key) {
    const file = e.target.files?.[0];
    if (!file || !key) return;
    setFotos(p => ({ ...p, [key]: file }));
    const previewUrl = URL.createObjectURL(file);
    setFotoPreviews(p => ({ ...p, [key]: previewUrl }));
    setFotoModal(null);
    e.target.value = ""; // permite selecionar o mesmo arquivo novamente
  }

  function removerFoto(key) {
    setFotos(p => ({ ...p, [key]: null }));
    if (fotoPreviews[key]) URL.revokeObjectURL(fotoPreviews[key]);
    setFotoPreviews(p => ({ ...p, [key]: null }));
    setFotoModal(null);
  }

  async function uploadFotos(userId) {
    const urls = {};
    for (const [key, file] of Object.entries(fotos)) {
      if (!file) continue;
      const ext = file.name.split(".").pop();
      const path = `${userId}/${Date.now()}_${key}.${ext}`;
      const { error } = await supabase.storage.from("avaliacoes-fotos").upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from("avaliacoes-fotos").getPublicUrl(path);
        urls[key] = data.publicUrl;
      }
    }
    return urls;
  }

  async function saveLead() {
    // Backup local
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

    // Salva no Supabase via função RPC (bypassa RLS)
    try {
      const { error } = await supabase.rpc("submit_avaliacao", {
        p_nome:          contactInfo.nome,
        p_email:         contactInfo.email,
        p_telefone:      contactInfo.whatsapp,
        p_cep:           contactInfo.cep || "",
        p_respostas:     answers,
        p_grau_calvicie: answers.hairType || null,
        p_condicoes:     answers.conditions || null,
      });
      if (error) console.error("submit_avaliacao error:", error);
    } catch (err) {
      console.error("Supabase save error:", err);
    }
  }

  async function continueFromContact() {
    if (!contactInfo.nome.trim()) { setContactError("Por favor, informe seu nome."); return; }
    if (!contactInfo.email.trim()) { setContactError("Por favor, informe seu e-mail."); return; }
    if (!contactInfo.whatsapp.trim()) { setContactError("Por favor, informe seu WhatsApp."); return; }
    if (!contactInfo.dataNascimento) { setContactError("Por favor, informe sua data de nascimento."); return; }
    const hoje = new Date(); const nasc = new Date(contactInfo.dataNascimento);
    const idade = hoje.getFullYear() - nasc.getFullYear() - (hoje < new Date(nasc.setFullYear(nasc.getFullYear() + (hoje.getFullYear() - new Date(contactInfo.dataNascimento).getFullYear()))) ? 1 : 0);
    const nascFull = new Date(contactInfo.dataNascimento);
    const idadeReal = Math.floor((hoje - nascFull) / (365.25 * 24 * 60 * 60 * 1000));
    if (idadeReal < 18) { setContactError("É necessário ter 18 anos ou mais para utilizar a plataforma."); return; }
    if (!contactInfo.cpf || contactInfo.cpf.replace(/\D/g,"").length !== 11) { setContactError("Por favor, informe um CPF válido com 11 dígitos."); return; }
    if (!contactInfo.medicamentosAtuais.trim()) { setContactError("Por favor, informe seus medicamentos em uso (ou 'Nenhum')."); return; }
    if (!contactInfo.senha || contactInfo.senha.length < 6) { setContactError("A senha deve ter ao menos 6 caracteres."); return; }
    if (contactInfo.senha !== contactInfo.confirmarSenha) { setContactError("As senhas não coincidem."); return; }
    setContactError("");
    setContactLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: contactInfo.email,
        password: contactInfo.senha,
        options: {
          data: { nome: contactInfo.nome, telefone: contactInfo.whatsapp },
          emailRedirectTo: "https://www.fioraiz.com.br/minha-conta",
        },
      });
      if (authError) { setContactError(authError.message); return; }
      const userId = authData.user?.id || null;

      // Upload das fotos (política pública — funciona mesmo sem sessão ativa pós-signUp)
      const fotosUrls = userId ? await uploadFotos(userId) : {};

      // Salva lead local como backup
      try {
        const existing = JSON.parse(localStorage.getItem("fioraiz_leads") || "[]");
        existing.push({ id: Date.now(), timestamp: new Date().toLocaleString("pt-BR"), nome: contactInfo.nome, email: contactInfo.email, whatsapp: contactInfo.whatsapp, answers });
        localStorage.setItem("fioraiz_leads", JSON.stringify(existing));
      } catch {}

      // Salva tudo no Supabase (única chamada, com fotos)
      const { error } = await supabase.rpc("submit_avaliacao", {
        p_user_id: userId,
        p_nome: contactInfo.nome, p_email: contactInfo.email, p_telefone: contactInfo.whatsapp,
        p_cep: contactInfo.cep || "",
        p_endereco: { rua: contactInfo.rua, numero: contactInfo.numero, bairro: contactInfo.bairro, cidade: contactInfo.cidade, estado: contactInfo.estado },
        p_respostas: answers, p_grau_calvicie: answers.hairType || null, p_condicoes: answers.conditions || null,
        p_fotos: fotosUrls,
        p_data_nascimento: contactInfo.dataNascimento,
        p_cpf: contactInfo.cpf.replace(/\D/g,""),
        p_medicamentos_atuais: contactInfo.medicamentosAtuais,
        p_peso: answers.peso ? Number(answers.peso) : null,
        p_altura: answers.altura ? Number(answers.altura) : null,
      });
      if (error) console.error("submit_avaliacao error:", error);
      setPhase("pagamento");
    } finally { setContactLoading(false); }
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

  // ── PARADA PADRAO ATIPICO ────────────────────────────────────────────
  if (phase === "pattern-stop") return (
    <div style={s.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={s.nav}><Logo /></div>
      <div style={s.progressBg}><div style={{ ...s.progressBar, width:"8%" }}/></div>
      <div style={s.body}>
        <div style={{ textAlign:"center", padding:"32px 0 24px" }}>
          <div style={{ width:64, height:64, borderRadius:20, background:"#EDF5F8",
            border:"1px solid rgba(1,46,70,0.12)", display:"flex", alignItems:"center",
            justifyContent:"center", margin:"0 auto 22px", fontSize:26 }}>🔍</div>
          <div style={{ fontSize:10, fontWeight:800, letterSpacing:"0.14em",
            textTransform:"uppercase", color:"#012e46", background:"#EDF5F8",
            padding:"5px 14px", borderRadius:100, display:"inline-block", marginBottom:16 }}>Fio Raiz</div>
          <h2 style={{ fontSize:"clamp(22px,5vw,28px)", fontWeight:800,
            letterSpacing:"-0.02em", lineHeight:1.2, color:"#021d34", marginBottom:14 }}>
            Este perfil pede um<br/>olhar especializado.
          </h2>
          <p style={{ fontSize:14, color:"#666", lineHeight:1.75, maxWidth:400, margin:"0 auto" }}>
            Queda em múltiplos pontos irregulares ou queda total não seguem o padrão
            da alopecia androgenética — que é a única condição que tratamos.
          </p>
        </div>

        <div style={{ background:"#021d34", borderRadius:16, padding:"22px 20px", marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase",
            color:"rgba(255,255,255,0.45)", marginBottom:10 }}>O que pode estar acontecendo</div>
          <ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:8 }}>
            {["Alopecia areata (queda em placas)", "Eflúvio telógeno (queda difusa por estresse ou deficiência)", "Alopecia totalis ou universalis", "Condições autoimunes ou hormonais"].map((item, i) => (
              <li key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <span style={{ color:"#94b8d7", fontSize:14, marginTop:1, flexShrink:0 }}>›</span>
                <span style={{ fontSize:13, color:"rgba(255,255,255,0.75)", lineHeight:1.6 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background:"#fff", border:"1px solid rgba(0,0,0,0.07)", borderRadius:14,
          padding:"18px 20px", marginBottom:24 }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#021d34", marginBottom:8 }}>
            Nossa recomendação
          </div>
          <p style={{ fontSize:13, color:"#666", lineHeight:1.75 }}>
            Consulte um dermatologista ou tricologista presencialmente para um diagnóstico preciso.
            Após a avaliação, se o diagnóstico for alopecia androgenética, a Fio Raiz terá o protocolo certo para você.
          </p>
        </div>

        <label style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"16px 18px",
          background:"#F8FBFD", border:"1px solid rgba(1,46,70,0.12)", borderRadius:12,
          cursor:"pointer", marginBottom:20, userSelect:"none" }}>
          <div onClick={() => setPatternConfirmed(v => !v)} style={{
            width:20, height:20, borderRadius:5, flexShrink:0, marginTop:1,
            background: patternConfirmed ? "#012e46" : "#fff",
            border: `2px solid ${patternConfirmed ? "#012e46" : "#c8d8e4"}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"all 0.15s",
          }}>
            {patternConfirmed && <span style={{ color:"#fff", fontSize:12, lineHeight:1, fontWeight:800 }}>✓</span>}
          </div>
          <span style={{ fontSize:13, color:"#444", lineHeight:1.65 }}>
            Entendi — quero revisar minhas respostas ou retornar ao início.
          </span>
        </label>

        <button
          disabled={!patternConfirmed}
          style={{ ...s.ctaBtn,
            background: patternConfirmed ? "#012e46" : "#dde8ee",
            color: patternConfirmed ? "#fff" : "#a0b8c4",
            cursor: patternConfirmed ? "pointer" : "not-allowed",
            marginBottom:12, transition:"all 0.2s",
          }}
          onClick={() => { if(patternConfirmed){ setPatternConfirmed(false); setHairStep(0); setPhase("quiz-hair"); } }}>
          Revisar minhas respostas
        </button>

        <a href="/" style={{ display:"block", textAlign:"center", fontSize:13, color:"#888",
          textDecoration:"underline", padding:"10px 0", fontFamily:"'Outfit',sans-serif" }}>
          Voltar à página inicial
        </a>
      </div>
    </div>
  );

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
          onClick={() => { setHealthStep(6); setPhase("quiz-health"); }}>
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

    const totalHealthSteps = 9;
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

      // Step 2 (NOVO) – Peso e altura
      if (healthStep === 2) return (
        <div>
          <div style={s.tag}>Sua saúde · Passo 2 de 2</div>
          <h2 style={s.heading}>Algumas medidas para o médico</h2>
          <p style={{ fontSize:13, color:"#888", lineHeight:1.65, marginBottom:20 }}>
            Usadas para ajustar a dose do Minoxidil oral ao seu perfil.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:"#555", display:"block", marginBottom:6 }}>Peso</label>
              <input
                type="number" placeholder="kg" min={40} max={250}
                value={answers.peso || ""}
                onChange={e => setAnswers(p => ({ ...p, peso: e.target.value }))}
                style={{ width:"100%", padding:"13px 15px", border:"1.5px solid rgba(0,0,0,0.12)", borderRadius:10,
                  fontSize:14, fontFamily:"'Outfit',sans-serif", outline:"none", boxSizing:"border-box" }}
              />
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:"#555", display:"block", marginBottom:6 }}>Altura</label>
              <input
                type="number" placeholder="cm" min={140} max={220}
                value={answers.altura || ""}
                onChange={e => setAnswers(p => ({ ...p, altura: e.target.value }))}
                style={{ width:"100%", padding:"13px 15px", border:"1.5px solid rgba(0,0,0,0.12)", borderRadius:10,
                  fontSize:14, fontFamily:"'Outfit',sans-serif", outline:"none", boxSizing:"border-box" }}
              />
            </div>
          </div>
          <div style={{ background:"#EDF5F8", borderRadius:10, padding:"12px 14px", fontSize:12, color:"#555", lineHeight:1.65 }}>
            O Minoxidil oral é prescrito em doses baixas personalizadas. Peso e altura ajudam o médico a definir a dose mais segura para você.
          </div>
        </div>
      );

      // Step 3 (era 2) – Quais tratamentos?
      if (healthStep === 3) {
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

      // Step 4 (era 3) – Drill-down de performance por ativo
      if (healthStep === 4) {
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

      // Step 6 (era 5) – Condições médicas (multi-select)
      if (healthStep === 6) {
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

      // Step 7 (era 6) – Preferência do bloqueador de DHT (com blindagem)
      if (healthStep === 7) {
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

      // Step 8 (era 7) – Tipo de Minoxidil preferido
      if (healthStep === 8) {
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

    const isMultiStep = healthStep === 0 || healthStep === 2 || healthStep === 3 || healthStep === 4 || healthStep === 6;
    const selIds_ = answers.treatments || [];
    const perf_ = answers.performance || {};
    const pesoOk = answers.peso && Number(answers.peso) >= 40 && Number(answers.peso) <= 250;
    const alturaOk = answers.altura && Number(answers.altura) >= 140 && Number(answers.altura) <= 220;
    const canContinueMulti =
      healthStep === 0 ? (answers.scalpConditions || []).length > 0 :
      healthStep === 2 ? (pesoOk && alturaOk) :
      healthStep === 3 ? (answers.treatments || []).length > 0 :
      healthStep === 4 ? selIds_.every(id => perf_[id]) :
                         (answers.conditions || []).length > 0;

    return (
      <div style={s.wrap}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
        <div style={s.nav}>
          <Logo />
          <span style={{ fontSize:11, color:"#aaa" }}>{displayStep} / 9</span>
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
          <button style={s.ctaBtn} onClick={() => {
            // Auto-monta protocolo com base nas respostas do quiz
            const fl = getSafetyFlags(answers.conditions || [], answers.scalpConditions || [], answers.performance || {});
            let bId = "fin";
            if (fl.blockOralDHT) bId = "saw";
            else if (fl.finasteridaFail) bId = "dut";
            else if (/dutasterida|dut/i.test(answers.medication || "")) bId = "dut";
            else if (/saw|palmetto/i.test(answers.medication || "")) bId = "saw";
            const bloqueador = PROTOCOLOS.bloqueador.find(p => p.id === bId) || PROTOCOLOS.bloqueador[0];
            const mId = fl.blockMinoxOral ? "mnx_topico"
              : /tópico|topico|spray/i.test(answers.minoxidilType || "") ? "mnx_topico"
              : "mnx_oral";
            const minoxidil = PROTOCOLOS.minoxidil.find(p => p.id === mId) || PROTOCOLOS.minoxidil[0];
            setProtocoloSel({ bloqueador, minoxidil, addons: [...PROTOCOLOS.addons] });
            setPlanPeriod("semestral");
            setPhase("protocolo");
          }}>
            Ver meu plano personalizado →
          </button>
        </div>
      </div>
    );
  }

  // ── PROTOCOLO (pré-montado) ────────────────────────────────────────────────
  if (phase === "protocolo") {
    const bl  = protocoloSel.bloqueador;
    const mnx = protocoloSel.minoxidil;
    const meses        = planPeriod === "semestral" ? 6 : 3;
    const blPreco      = getPreco(bl, planPeriod);
    const mnxPreco     = getPreco(mnx, planPeriod);
    const totalAddons  = protocoloSel.addons.reduce((a, x) => a + x.preco, 0);
    // Addons são somados e divididos pelos meses junto com a assinatura
    const totalGeral   = (blPreco + mnxPreco) * meses + totalAddons;
    const mensalFinal  = totalGeral / meses; // blPreco + mnxPreco + totalAddons/meses
    const mensalBase   = blPreco + mnxPreco; // exibido por produto (sem addons)

    return (
      <div style={{ ...s.wrap, background:"#F0F7FA" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}`}</style>

        {/* Breadcrumb */}
        <div style={{ background:"#fff", height:52, display:"flex", alignItems:"center", justifyContent:"center", gap:6, borderBottom:"1px solid rgba(0,0,0,0.07)", position:"sticky", top:0, zIndex:100 }}>
          {[["Tratamento",true],["Conta",false],["Pagamento",false]].map(([label,active],i,arr)=>(
            <span key={i} style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:"clamp(11px,3vw,13px)",fontWeight:active?700:400,color:active?"#021d34":"#aaa",borderBottom:active?"2px solid #021d34":"none",paddingBottom:active?1:0}}>{label}</span>
              {i<arr.length-1&&<span style={{color:"#ccc",fontSize:12}}>›</span>}
            </span>
          ))}
        </div>
        <div style={s.progressBg}><div style={{...s.progressBar,width:"70%"}}/></div>

        <div style={{ padding:"24px clamp(14px,4vw,20px) 180px", maxWidth:560, margin:"0 auto", width:"100%" }}>
          <h2 style={{ fontSize:"clamp(20px,5vw,26px)", fontWeight:800, color:"#021d34", marginBottom:4, letterSpacing:"-0.02em" }}>
            Seu Protocolo Fio Raiz
          </h2>
          <p style={{ fontSize:13, color:"#888", marginBottom:24, lineHeight:1.6 }}>
            Montado com base no seu perfil clínico. Um médico parceiro irá revisar antes da prescrição.
          </p>

          {/* Bloqueador fixo */}
          <div style={{ marginBottom:24 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#94b8d7", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>💊 Bloqueador de DHT — indicado para você</div>
            {bl && (
              <div style={{ background:"#fff", borderRadius:14, padding:"16px", border:"2px solid #012e46", boxShadow:"0 0 0 4px rgba(1,46,70,0.06)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
                      <div style={{ width:20,height:20,borderRadius:"50%",background:"#012e46",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                        <span style={{ color:"#fff",fontSize:10,fontWeight:800 }}>✓</span>
                      </div>
                      <span style={{ fontSize:15, fontWeight:800, color:"#021d34" }}>{bl.nome}</span>
                      <span style={{ fontSize:10, fontWeight:700, color:"#012e46", background:"#EDF5F8", padding:"2px 8px", borderRadius:100 }}>{bl.tag}</span>
                    </div>
                    <div style={{ fontSize:12, color:"#555", marginLeft:28, lineHeight:1.55, marginTop:4 }}>{bl.desc}</div>
                    <button onClick={() => setProdutoInfo(bl)} style={{ fontSize:11, color:"#94b8d7", background:"none", border:"none", cursor:"pointer", fontFamily:"'Outfit',sans-serif", textDecoration:"underline", marginLeft:28, marginTop:6, padding:0 }}>saiba mais</button>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0, marginLeft:12 }}>
                    <div style={{ fontSize:17, fontWeight:800, color:"#021d34" }}>R$ {blPreco}</div>
                    <div style={{ fontSize:10, color:"#aaa" }}>/mês</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Minoxidil — escolha */}
          <div style={{ marginBottom:24 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#94b8d7", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>🌱 Minoxidil — escolha como aplicar</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {PROTOCOLOS.minoxidil.map(prod => {
                const sel = protocoloSel.minoxidil?.id === prod.id;
                return (
                  <div key={prod.id} onClick={() => setProtocoloSel(p=>({...p,minoxidil:prod}))} style={{
                    background:"#fff", borderRadius:14, padding:"14px 16px",
                    border:`2px solid ${sel?"#012e46":"rgba(0,0,0,0.08)"}`,
                    cursor:"pointer", transition:"all 0.15s",
                    boxShadow:sel?"0 0 0 4px rgba(1,46,70,0.06)":"0 1px 3px rgba(0,0,0,0.04)",
                    display:"flex", alignItems:"center", gap:12,
                  }}>
                    <div style={{ width:20,height:20,borderRadius:"50%",flexShrink:0,border:`2px solid ${sel?"#012e46":"#ddd"}`,background:sel?"#012e46":"#fff",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s" }}>
                      {sel&&<span style={{color:"#fff",fontSize:10,fontWeight:800}}>✓</span>}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div>
                          <div style={{ fontSize:14, fontWeight:700, color:"#021d34" }}>{prod.nome}</div>
                          <div style={{ fontSize:11, color:"#888" }}>{prod.sub}</div>
                        </div>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontSize:15, fontWeight:800, color:"#021d34" }}>R$ {getPreco(prod, planPeriod)}</div>
                          <div style={{ fontSize:9, color:"#aaa" }}>/mês</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Potencializadores — compra única, já incluídos, removíveis */}
          <div style={{ marginBottom:24 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#94b8d7", letterSpacing:"0.1em", textTransform:"uppercase" }}>✨ Potencializadores</div>
              <span style={{ fontSize:9, fontWeight:700, color:"#16a34a", background:"#F0FDF4", padding:"2px 7px", borderRadius:100 }}>JÁ INCLUÍDOS · compra única</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {PROTOCOLOS.addons.map(prod => {
                const sel = !!protocoloSel.addons.find(a=>a.id===prod.id);
                return (
                  <div key={prod.id} onClick={() => setProtocoloSel(p=>({ ...p, addons: sel ? p.addons.filter(a=>a.id!==prod.id) : [...p.addons,prod] }))} style={{
                    background:"#fff", borderRadius:14, padding:"14px 16px",
                    border:`2px solid ${sel?"#012e46":"rgba(0,0,0,0.08)"}`,
                    cursor:"pointer", transition:"all 0.15s", opacity:sel?1:0.55,
                    display:"flex", alignItems:"center", gap:12,
                  }}>
                    <div style={{ width:20,height:20,borderRadius:5,flexShrink:0,border:`2px solid ${sel?"#012e46":"#ddd"}`,background:sel?"#012e46":"#fff",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s" }}>
                      {sel&&<span style={{color:"#fff",fontSize:10,fontWeight:800}}>✓</span>}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div>
                          <div style={{ fontSize:13, fontWeight:700, color:"#021d34" }}>{prod.nome}</div>
                          <div style={{ fontSize:11, color:"#888" }}>{prod.sub}</div>
                        </div>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontSize:14, fontWeight:800, color:"#021d34" }}>R$ {prod.preco}</div>
                          <div style={{ fontSize:9, color:"#16a34a", fontWeight:700 }}>compra única</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Período */}
          <div style={{ marginBottom:24 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#94b8d7", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>📅 Período do plano</div>
            <div style={{ display:"flex", gap:10 }}>
              {[
                { val:"trimestral", label:"3 meses", desc:"Preço cheio", badge:null,
                  preco: (getPreco(bl,"trimestral") + getPreco(mnx,"trimestral")) },
                { val:"semestral",  label:"6 meses", desc:"Melhor preço", badge:"Mais econômico",
                  preco: (getPreco(bl,"semestral") + getPreco(mnx,"semestral")) },
              ].map(({ val, label, desc, badge, preco }) => (
                <div key={val} onClick={() => setPlanPeriod(val)} style={{
                  flex:1, background:"#fff", borderRadius:14, padding:"14px",
                  border:`2px solid ${planPeriod===val?"#012e46":"rgba(0,0,0,0.08)"}`,
                  cursor:"pointer", transition:"all 0.15s", textAlign:"center",
                  boxShadow:planPeriod===val?"0 0 0 4px rgba(1,46,70,0.06)":"none",
                  position:"relative",
                }}>
                  {badge && <div style={{ position:"absolute", top:-8, left:"50%", transform:"translateX(-50%)", background:"#16a34a", color:"#fff", fontSize:9, fontWeight:700, padding:"2px 10px", borderRadius:100, whiteSpace:"nowrap" }}>{badge}</div>}
                  <div style={{ fontSize:16, fontWeight:800, color:"#021d34", marginTop:badge?4:0 }}>{label}</div>
                  <div style={{ fontSize:11, color:"#888", marginTop:2 }}>{desc}</div>
                  <div style={{ fontSize:15, fontWeight:700, color:planPeriod===val?"#012e46":"#888", marginTop:6 }}>R$ {preco}/mês</div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo */}
          <div style={{ background:"#fff", borderRadius:14, padding:"18px", border:"1px solid rgba(0,0,0,0.07)" }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#94b8d7", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>Resumo</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {bl&&<div style={{display:"flex",justifyContent:"space-between",fontSize:13}}><span style={{color:"#555"}}>{bl.nome}</span><span style={{fontWeight:600}}>R$ {blPreco}/mês</span></div>}
              {mnx&&<div style={{display:"flex",justifyContent:"space-between",fontSize:13}}><span style={{color:"#555"}}>{mnx.nome}</span><span style={{fontWeight:600}}>R$ {mnxPreco}/mês</span></div>}
              {totalAddons>0&&<div style={{display:"flex",justifyContent:"space-between",fontSize:13}}><span style={{color:"#555"}}>Potencializadores (÷{meses} meses)</span><span style={{fontWeight:600}}>+ R$ {(totalAddons/meses).toFixed(2).replace(".",",")}/mês</span></div>}
              <div style={{height:1,background:"rgba(0,0,0,0.07)",margin:"4px 0"}}/>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13}}><span style={{color:"#555"}}>Mensalidade (R$ {mensalFinal.toFixed(2).replace(".",",")} × {meses})</span><span style={{fontWeight:700}}>R$ {totalGeral.toFixed(2).replace(".",",")}</span></div>
              <div style={{height:1,background:"rgba(0,0,0,0.07)",margin:"4px 0"}}/>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{fontSize:14,fontWeight:700,color:"#021d34"}}>Total do plano</span>
                <span style={{fontSize:17,fontWeight:800,color:"#021d34"}}>R$ {totalGeral.toFixed(2).replace(".",",")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"#fff", borderTop:"1px solid rgba(0,0,0,0.07)", padding:"16px clamp(14px,4vw,20px)", zIndex:90 }}>
          <div style={{ maxWidth:560, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontSize:12, color:"#888" }}>R$ {mensalFinal.toFixed(2).replace(".",",")}/mês · {meses} meses</span>
              <span style={{ fontSize:14, fontWeight:800, color:"#021d34" }}>Total R$ {totalGeral.toFixed(2).replace(".",",")}</span>
            </div>
            <button onClick={() => setPhase("contact")} style={{ width:"100%", background:"#012e46", color:"#fff", border:"none", borderRadius:100, padding:"17px", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
              Criar minha conta →
            </button>
          </div>
        </div>

        {/* Modal saiba mais */}
        {produtoInfo && (
          <div style={{ position:"fixed", inset:0, zIndex:500, background:"rgba(2,29,52,0.6)", display:"flex", alignItems:"flex-end" }} onClick={() => setProdutoInfo(null)}>
            <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:"20px 20px 0 0", padding:"28px clamp(16px,4vw,24px) 48px", width:"100%", maxHeight:"80vh", overflowY:"auto", fontFamily:"'Outfit',sans-serif" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
                <div>
                  <div style={{ fontSize:18, fontWeight:800, color:"#021d34" }}>{produtoInfo.nome}</div>
                  <div style={{ fontSize:12, color:"#888", marginTop:2 }}>{produtoInfo.sub}</div>
                </div>
                <button onClick={() => setProdutoInfo(null)} style={{ background:"#EDF5F8", border:"none", borderRadius:"50%", width:32, height:32, cursor:"pointer", fontSize:16, color:"#666" }}>×</button>
              </div>
              <p style={{ fontSize:14, color:"#021d34", lineHeight:1.7, marginBottom:18 }}>{produtoInfo.detalhes}</p>
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#94b8d7", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>Benefícios</div>
                {(produtoInfo.beneficios||[]).map((b,i) => (
                  <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:8 }}>
                    <div style={{ width:18,height:18,borderRadius:"50%",background:"#012e46",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2 }}><span style={{color:"#fff",fontSize:9,fontWeight:800}}>✓</span></div>
                    <span style={{ fontSize:13, color:"#021d34", lineHeight:1.5 }}>{b}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setProdutoInfo(null)} style={{ width:"100%", background:"#012e46", color:"#fff", border:"none", borderRadius:100, padding:"16px", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                Entendido →
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── CONTATO ────────────────────────────────────────────────────────────────
  if (phase === "contact") return (
    <div style={s.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}.contact-input:focus{border-color:#021d34!important;}.foto-box:hover{border-color:#021d34!important;background:#EDF5F8!important;}`}</style>
      <div style={s.nav}><Logo /></div>
      <div style={s.body}>
        <div style={s.tag}>Quase lá</div>
        <h2 style={s.heading}>Crie sua conta</h2>
        <p style={s.sub}>Um médico vai analisar suas respostas. Crie sua conta para acompanhar o resultado.</p>

        {/* Dados pessoais */}
        <div style={{ fontSize:11, fontWeight:700, color:"#94b8d7", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>👤 Dados pessoais</div>
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>
          {[
            { key:"nome", label:"Nome completo", placeholder:"Seu nome completo", type:"text" },
            { key:"email", label:"E-mail", placeholder:"seu@email.com", type:"email" },
            { key:"whatsapp", label:"WhatsApp", placeholder:"(11) 99999-9999", type:"tel" },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontSize:12, fontWeight:700, color:"#555", display:"block", marginBottom:5 }}>{f.label}</label>
              <input className="contact-input" type={f.type} placeholder={f.placeholder} value={contactInfo[f.key]}
                onChange={e => setContactInfo(p => ({ ...p, [f.key]: e.target.value }))}
                style={{ width:"100%", padding:"13px 15px", border:"1.5px solid rgba(0,0,0,0.12)", borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", outline:"none", transition:"border-color 0.2s" }} />
            </div>
          ))}

          {/* Data de nascimento */}
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#555", display:"block", marginBottom:5 }}>Data de nascimento</label>
            <input className="contact-input" type="date" value={contactInfo.dataNascimento}
              onChange={e => setContactInfo(p => ({ ...p, dataNascimento: e.target.value }))}
              max={new Date(new Date().setFullYear(new Date().getFullYear()-18)).toISOString().split("T")[0]}
              style={{ width:"100%", padding:"13px 15px", border:"1.5px solid rgba(0,0,0,0.12)", borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", outline:"none", transition:"border-color 0.2s", colorScheme:"light" }} />
          </div>

          {/* CPF com máscara */}
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#555", display:"block", marginBottom:5 }}>CPF</label>
            <input className="contact-input" type="text" placeholder="000.000.000-00" value={contactInfo.cpf} maxLength={14}
              onChange={e => {
                const digits = e.target.value.replace(/\D/g,"").slice(0,11);
                const masked = digits
                  .replace(/(\d{3})(\d)/, "$1.$2")
                  .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
                  .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
                setContactInfo(p => ({ ...p, cpf: masked }));
              }}
              style={{ width:"100%", padding:"13px 15px", border:"1.5px solid rgba(0,0,0,0.12)", borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", outline:"none", transition:"border-color 0.2s" }} />
          </div>

          {/* Medicamentos em uso */}
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#555", display:"block", marginBottom:5 }}>Medicamentos que você usa atualmente</label>
            <textarea className="contact-input" placeholder="Ex: losartana 50mg, omeprazol 20mg... Se não usa nenhum, escreva 'Nenhum'."
              value={contactInfo.medicamentosAtuais}
              onChange={e => setContactInfo(p => ({ ...p, medicamentosAtuais: e.target.value }))}
              rows={3}
              style={{ width:"100%", padding:"13px 15px", border:"1.5px solid rgba(0,0,0,0.12)", borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", outline:"none", transition:"border-color 0.2s", resize:"vertical", minHeight:90 }} />
            <div style={{ fontSize:11, color:"#888", marginTop:5, lineHeight:1.6 }}>
              Inclua todos os medicamentos de uso contínuo. Essa informação é usada exclusivamente pelo médico para verificar interações.
            </div>
          </div>

          {/* CEP com auto-fill */}
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#555", display:"block", marginBottom:5 }}>CEP</label>
            <div style={{ position:"relative" }}>
              <input className="contact-input" type="text" placeholder="00000-000" value={contactInfo.cep}
                onChange={e => {
                  const v = e.target.value;
                  setContactInfo(p => ({ ...p, cep: v }));
                  if (v.replace(/\D/g,"").length === 8) buscarCep(v);
                }}
                maxLength={9}
                style={{ width:"100%", padding:"13px 15px", border:"1.5px solid rgba(0,0,0,0.12)", borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", outline:"none", transition:"border-color 0.2s" }} />
              {cepLoading && <div style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", fontSize:11, color:"#888" }}>buscando…</div>}
            </div>
          </div>

          {/* Endereço auto-preenchido */}
          {contactInfo.rua && (
            <div style={{ display:"flex", flexDirection:"column", gap:10, padding:"14px", background:"#F0F7FA", borderRadius:10, border:"1px solid #dde8ee" }}>
              <div style={{ fontSize:11, color:"#94b8d7", fontWeight:700, letterSpacing:"0.08em" }}>ENDEREÇO ENCONTRADO</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 80px", gap:10 }}>
                <div>
                  <label style={{ fontSize:11, fontWeight:600, color:"#888", display:"block", marginBottom:4 }}>Rua</label>
                  <input className="contact-input" value={contactInfo.rua} onChange={e => setContactInfo(p => ({ ...p, rua: e.target.value }))}
                    style={{ width:"100%", padding:"10px 12px", border:"1.5px solid rgba(0,0,0,0.1)", borderRadius:8, fontSize:13, fontFamily:"'Outfit',sans-serif", outline:"none", background:"#fff" }} />
                </div>
                <div>
                  <label style={{ fontSize:11, fontWeight:600, color:"#888", display:"block", marginBottom:4 }}>Nº</label>
                  <input className="contact-input" placeholder="000" value={contactInfo.numero} onChange={e => setContactInfo(p => ({ ...p, numero: e.target.value }))}
                    style={{ width:"100%", padding:"10px 12px", border:"1.5px solid rgba(0,0,0,0.1)", borderRadius:8, fontSize:13, fontFamily:"'Outfit',sans-serif", outline:"none", background:"#fff" }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize:11, fontWeight:600, color:"#888", display:"block", marginBottom:4 }}>Complemento</label>
                <input className="contact-input" placeholder="Apto, bloco, sala… (opcional)" value={contactInfo.complemento || ""} onChange={e => setContactInfo(p => ({ ...p, complemento: e.target.value }))}
                  style={{ width:"100%", padding:"10px 12px", border:"1.5px solid rgba(0,0,0,0.1)", borderRadius:8, fontSize:13, fontFamily:"'Outfit',sans-serif", outline:"none", background:"#fff" }} />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {[
                  { key:"bairro", label:"Bairro" },
                  { key:"cidade", label:"Cidade" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize:11, fontWeight:600, color:"#888", display:"block", marginBottom:4 }}>{f.label}</label>
                    <input className="contact-input" value={contactInfo[f.key]} onChange={e => setContactInfo(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{ width:"100%", padding:"10px 12px", border:"1.5px solid rgba(0,0,0,0.1)", borderRadius:8, fontSize:13, fontFamily:"'Outfit',sans-serif", outline:"none", background:"#fff" }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Senha */}
        <div style={{ fontSize:11, fontWeight:700, color:"#94b8d7", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>🔒 Crie sua senha de acesso</div>
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>
          {/* Campo senha */}
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#555", display:"block", marginBottom:5 }}>Senha</label>
            <input className="contact-input" type="password" placeholder="Mínimo 6 caracteres" value={contactInfo.senha}
              onChange={e => setContactInfo(p => ({ ...p, senha: e.target.value }))}
              style={{ width:"100%", padding:"13px 15px", border:"1.5px solid rgba(0,0,0,0.12)", borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", outline:"none", transition:"border-color 0.2s" }} />
          </div>
          {/* Campo confirmar senha com feedback de correspondência */}
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#555", display:"block", marginBottom:5 }}>Confirmar senha</label>
            <input className="contact-input" type="password" placeholder="Repita a senha" value={contactInfo.confirmarSenha}
              onChange={e => setContactInfo(p => ({ ...p, confirmarSenha: e.target.value }))}
              style={{ width:"100%", padding:"13px 15px", border:`1.5px solid ${
                contactInfo.confirmarSenha.length === 0 ? "rgba(0,0,0,0.12)"
                  : contactInfo.senha === contactInfo.confirmarSenha ? "#16a34a"
                  : "#dc2626"
              }`, borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", outline:"none", transition:"border-color 0.2s" }} />
            {contactInfo.confirmarSenha.length > 0 && (
              <div style={{ marginTop:6, fontSize:12, fontWeight:600,
                color: contactInfo.senha === contactInfo.confirmarSenha ? "#16a34a" : "#dc2626",
                display:"flex", alignItems:"center", gap:5 }}>
                {contactInfo.senha === contactInfo.confirmarSenha
                  ? <><span>✓</span><span>Senhas coincidem</span></>
                  : <><span>✗</span><span>As senhas não coincidem</span></>
                }
              </div>
            )}
          </div>
          <div style={{ fontSize:11, color:"#888", lineHeight:1.6 }}>
            Você usará essa senha para acessar seus resultados e protocolo em <strong>fioraiz.com.br/minha-conta</strong>
          </div>
        </div>

        {/* ── Fotos mobile-first ── */}
        {/* Inputs ocultos — câmera e galeria */}
        <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" style={{ display:"none" }}
          onChange={e => handleFotoChange(e, fotoModal)} />
        <input ref={galleryInputRef} type="file" accept="image/*" style={{ display:"none" }}
          onChange={e => handleFotoChange(e, fotoModal)} />

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#94b8d7", letterSpacing:"0.1em", textTransform:"uppercase" }}>📸 Fotos do couro cabeludo</div>
          <span style={{ fontSize:10, color:"#aaa" }}>opcional</span>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
          {FOTO_SLOTS.map(f => (
            <div key={f.key} onClick={() => setFotoModal(f.key)}
              style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px",
                background: fotoPreviews[f.key] ? "#F0FDF4" : "#fff",
                border:`1.5px solid ${fotoPreviews[f.key] ? "#86efac" : "rgba(0,0,0,0.1)"}`,
                borderRadius:14, cursor:"pointer", transition:"all 0.15s", WebkitTapHighlightColor:"transparent" }}>
              {fotoPreviews[f.key] ? (
                <img src={fotoPreviews[f.key]} alt={f.label}
                  style={{ width:56, height:56, objectFit:"cover", borderRadius:10, flexShrink:0, border:"1px solid #86efac" }} />
              ) : (
                <div style={{ width:56, height:56, borderRadius:10, background:"#F0F7FA", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>
                  {f.emoji}
                </div>
              )}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:14, fontWeight:600, color:"#021d34" }}>{f.label}</div>
                <div style={{ fontSize:12, color: fotoPreviews[f.key] ? "#16a34a" : "#aaa", marginTop:2 }}>
                  {fotoPreviews[f.key] ? "✓ Foto adicionada · toque para trocar" : f.dica}
                </div>
              </div>
              <div style={{ fontSize:20, flexShrink:0 }}>
                {fotoPreviews[f.key] ? "✅" : <span style={{ fontSize:22, color:"#94b8d7", fontWeight:300 }}>+</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Modal de captura (bottom sheet) */}
        {fotoModal && (
          <div style={{ position:"fixed", inset:0, zIndex:700, background:"rgba(0,0,0,0.55)", display:"flex", alignItems:"flex-end" }}
            onClick={() => setFotoModal(null)}>
            <div onClick={e => e.stopPropagation()}
              style={{ background:"#fff", width:"100%", borderRadius:"20px 20px 0 0", padding:"24px 20px 48px", fontFamily:"'Outfit',sans-serif" }}>
              <div style={{ width:40, height:4, background:"rgba(0,0,0,0.1)", borderRadius:2, margin:"0 auto 20px" }} />
              <div style={{ fontSize:13, fontWeight:700, color:"#021d34", marginBottom:4, textAlign:"center" }}>
                {FOTO_SLOTS.find(f => f.key === fotoModal)?.label}
              </div>
              <div style={{ fontSize:12, color:"#aaa", textAlign:"center", marginBottom:24 }}>
                {FOTO_SLOTS.find(f => f.key === fotoModal)?.dica}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <button onClick={() => cameraInputRef.current?.click()}
                  style={{ width:"100%", padding:"16px", borderRadius:14, border:"none", background:"#012e46", color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                  <span style={{ fontSize:20 }}>📷</span> Tirar foto agora
                </button>
                <button onClick={() => galleryInputRef.current?.click()}
                  style={{ width:"100%", padding:"16px", borderRadius:14, border:"1.5px solid rgba(0,0,0,0.1)", background:"#fff", color:"#021d34", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                  <span style={{ fontSize:20 }}>🖼️</span> Escolher da galeria
                </button>
                {fotoPreviews[fotoModal] && (
                  <button onClick={() => removerFoto(fotoModal)}
                    style={{ width:"100%", padding:"14px", borderRadius:14, border:"1.5px solid #fca5a5", background:"#fff", color:"#dc2626", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                    🗑️ Remover foto
                  </button>
                )}
                <button onClick={() => setFotoModal(null)}
                  style={{ width:"100%", padding:"14px", borderRadius:14, border:"none", background:"none", color:"#aaa", fontSize:14, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {contactError && (
          <div style={{ marginTop:4, marginBottom:12, fontSize:13, color:"#e53e3e", fontWeight:500, background:"#FFF1F1", padding:"10px 14px", borderRadius:8, border:"1px solid #fca5a5" }}>{contactError}</div>
        )}

        <div style={{ background:"#F0F7FA", borderRadius:12, padding:"12px 16px", fontSize:12, color:"#888", lineHeight:1.6 }}>
          🔒 Dados confidenciais. Você receberá um e-mail para confirmar seu cadastro.
        </div>
      </div>
      <div style={s.cta}>
        <button style={{ ...s.ctaBtn, opacity: contactLoading ? 0.7 : 1 }} onClick={continueFromContact} disabled={contactLoading}>
          {contactLoading ? "Criando sua conta…" : "Ver meu plano personalizado →"}
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

  // ── PAGAMENTO SIMULADO ─────────────────────────────────────────────────────
  if (phase === "pagamento") {
    const mesesPag       = planPeriod === "semestral" ? 6 : 3;
    const blPrecoPag     = getPreco(protocoloSel.bloqueador, planPeriod);
    const mnxPrecoPag    = getPreco(protocoloSel.minoxidil, planPeriod);
    const totalAddonsPag = protocoloSel.addons.reduce((a, x) => a + x.preco, 0);
    const totalGeralPag  = (blPrecoPag + mnxPrecoPag) * mesesPag + totalAddonsPag;
    const mensalPag      = totalGeralPag / mesesPag;
    const total          = totalGeralPag;
    const itens          = [protocoloSel.bloqueador, protocoloSel.minoxidil, ...protocoloSel.addons].filter(Boolean);
    async function finalizarPagamento() {
      setPagLoading(true);
      await new Promise(r => setTimeout(r, 2200));
      setPagLoading(false);
      setPhase("done");
    }

    return (
      <div style={{ ...s.wrap, background:"#F0F7FA" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}.pag-input:focus{outline:none;border-color:#021d34!important;box-shadow:0 0 0 3px rgba(2,29,52,0.08);}`}</style>

        {/* Breadcrumb nav */}
        <div style={{ background:"#fff", height:52, display:"flex", alignItems:"center", justifyContent:"center", gap:6, borderBottom:"1px solid rgba(0,0,0,0.07)", position:"sticky", top:0, zIndex:100 }}>
          {[["Tratamento", false], ["Conta", false], ["Pagamento", true]].map(([label, active], i, arr) => (
            <span key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ fontSize:"clamp(11px,3vw,13px)", fontWeight: active ? 700 : 400, color: active ? "#021d34" : "#aaa", borderBottom: active ? "2px solid #021d34" : "none", paddingBottom: active ? 1 : 0 }}>{label}</span>
              {i < arr.length-1 && <span style={{ color:"#ccc", fontSize:12 }}>›</span>}
            </span>
          ))}
        </div>
        <div style={s.progressBg}><div style={{ ...s.progressBar, width:"95%" }}/></div>

        <div style={{ padding:"24px clamp(14px,4vw,20px) 140px", maxWidth:560, margin:"0 auto", width:"100%" }}>
          <h2 style={{ fontSize:"clamp(18px,5vw,24px)", fontWeight:800, color:"#021d34", marginBottom:4, letterSpacing:"-0.02em" }}>Pagamento</h2>
          <p style={{ fontSize:13, color:"#888", marginBottom:20, lineHeight:1.6 }}>Ambiente 100% seguro. Seus dados são criptografados.</p>

          {/* Resumo do pedido */}
          <div style={{ background:"#fff", borderRadius:14, padding:"18px", border:"1px solid rgba(0,0,0,0.07)", marginBottom:20 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#94b8d7", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>Resumo do pedido</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {protocoloSel.bloqueador&&<div style={{display:"flex",justifyContent:"space-between",fontSize:13}}><span style={{color:"#555"}}>{protocoloSel.bloqueador.nome}</span><span style={{fontWeight:600,color:"#021d34"}}>R$ {blPrecoPag}/mês</span></div>}
              {protocoloSel.minoxidil&&<div style={{display:"flex",justifyContent:"space-between",fontSize:13}}><span style={{color:"#555"}}>{protocoloSel.minoxidil.nome}</span><span style={{fontWeight:600,color:"#021d34"}}>R$ {mnxPrecoPag}/mês</span></div>}
              {totalAddonsPag>0&&<div style={{display:"flex",justifyContent:"space-between",fontSize:13}}><span style={{color:"#555"}}>Potencializadores (÷{mesesPag} meses)</span><span style={{fontWeight:600,color:"#021d34"}}>+ R$ {(totalAddonsPag/mesesPag).toFixed(2).replace(".",",")}/mês</span></div>}
              <div style={{ height:1, background:"rgba(0,0,0,0.07)", margin:"4px 0" }} />
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}>
                <span style={{ color:"#555" }}>Mensalidade (R$ {mensalPag.toFixed(2).replace(".",",")} × {mesesPag})</span>
                <span style={{ fontWeight:700, color:"#021d34" }}>R$ {totalGeralPag.toFixed(2).replace(".",",")}</span>
              </div>
              <div style={{ height:1, background:"rgba(0,0,0,0.07)", margin:"4px 0" }} />
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontSize:14, fontWeight:700, color:"#021d34" }}>Total do plano</span>
                <span style={{ fontSize:17, fontWeight:800, color:"#021d34" }}>R$ {total.toFixed(2).replace(".",",")}</span>
              </div>
            </div>
          </div>

          {/* Método de pagamento */}
          <div style={{ background:"#fff", borderRadius:14, padding:"18px", border:"1px solid rgba(0,0,0,0.07)", marginBottom:20 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#94b8d7", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>Método de pagamento</div>
            <div style={{ display:"flex", gap:10, marginBottom:20 }}>
              {[["cartao","💳 Cartão"], ["pix","⚡ PIX"]].map(([val, label]) => (
                <button key={val} onClick={() => setMetodo(val)} style={{
                  flex:1, padding:"12px", borderRadius:10, border:`2px solid ${metodo===val ? "#012e46" : "rgba(0,0,0,0.1)"}`,
                  background: metodo===val ? "#EDF5F8" : "#fff",
                  fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight: metodo===val ? 700 : 400,
                  cursor:"pointer", color:"#021d34", transition:"all 0.15s",
                }}>
                  {label}
                </button>
              ))}
            </div>

            {metodo === "cartao" && (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <div>
                  <label style={{ fontSize:11, fontWeight:600, color:"#888", display:"block", marginBottom:5 }}>Número do cartão</label>
                  <input className="pag-input" placeholder="0000 0000 0000 0000" maxLength={19}
                    style={{ width:"100%", padding:"13px 15px", border:"1.5px solid rgba(0,0,0,0.12)", borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", background:"#fff" }} />
                </div>
                <div>
                  <label style={{ fontSize:11, fontWeight:600, color:"#888", display:"block", marginBottom:5 }}>Nome no cartão</label>
                  <input className="pag-input" placeholder="NOME COMO NO CARTÃO"
                    style={{ width:"100%", padding:"13px 15px", border:"1.5px solid rgba(0,0,0,0.12)", borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", background:"#fff" }} />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <div>
                    <label style={{ fontSize:11, fontWeight:600, color:"#888", display:"block", marginBottom:5 }}>Validade</label>
                    <input className="pag-input" placeholder="MM/AA" maxLength={5}
                      style={{ width:"100%", padding:"13px 15px", border:"1.5px solid rgba(0,0,0,0.12)", borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", background:"#fff" }} />
                  </div>
                  <div>
                    <label style={{ fontSize:11, fontWeight:600, color:"#888", display:"block", marginBottom:5 }}>CVV</label>
                    <input className="pag-input" placeholder="123" maxLength={4}
                      style={{ width:"100%", padding:"13px 15px", border:"1.5px solid rgba(0,0,0,0.12)", borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", background:"#fff" }} />
                  </div>
                </div>
              </div>
            )}

            {metodo === "pix" && (
              <div style={{ textAlign:"center", padding:"20px 0" }}>
                <div style={{ background:"#F0F7FA", borderRadius:12, padding:"24px", border:"1px dashed #c8dde6", marginBottom:14 }}>
                  <div style={{ fontSize:40, marginBottom:8 }}>⚡</div>
                  <div style={{ fontSize:14, fontWeight:700, color:"#021d34", marginBottom:4 }}>Pagamento via PIX</div>
                  <div style={{ fontSize:12, color:"#888", lineHeight:1.6 }}>
                    Após clicar em "Finalizar", você receberá o QR Code e a chave PIX por e-mail para concluir o pagamento.
                  </div>
                </div>
                <div style={{ fontSize:11, color:"#aaa" }}>Aprovação em até 5 minutos</div>
              </div>
            )}
          </div>

          <div style={{ background:"#EDF5F8", borderRadius:12, padding:"12px 16px", fontSize:12, color:"#555", lineHeight:1.6, display:"flex", gap:8 }}>
            <span>🔒</span>
            <span>Pagamento seguro com criptografia SSL. Seus dados não são armazenados.</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"#fff", borderTop:"1px solid rgba(0,0,0,0.07)", padding:"16px clamp(14px,4vw,20px)", zIndex:90 }}>
          <div style={{ maxWidth:560, margin:"0 auto" }}>
            <button onClick={finalizarPagamento} disabled={pagLoading} style={{
              width:"100%", background: pagLoading ? "#555" : "#012e46",
              color:"#fff", border:"none", borderRadius:100, padding:"17px",
              fontSize:15, fontWeight:700, cursor: pagLoading ? "wait" : "pointer",
              fontFamily:"'Outfit',sans-serif", transition:"background 0.2s",
            }}>
              {pagLoading
                ? "Processando pagamento…"
                : `Finalizar pedido · R$ ${mensalPag.toFixed(2).replace(".",",")}/mês →`}
            </button>
          </div>
        </div>
      </div>
    );
  }

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
