import { useState } from "react";

function FioRaizLogo({ color = "#0a0a0a", size = 18 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <svg width={size * 0.5} height={size * 1.1} viewBox="0 0 16 35" fill="none">
        <ellipse cx="8" cy="4" rx="4" ry="4" fill={color} opacity="0.9"/>
        <path d="M8 8 C7 12 9 15 8 19 C7 23 9 27 8 31 C7.5 33 8 34 8 35"
          stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      </svg>
      <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: size, fontWeight: 700, color, letterSpacing: "0.05em" }}>
        fio<span style={{ opacity: 0.4 }}>raiz</span>
      </span>
    </div>
  );
}

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
    texto: `Ao concordar com este Termo, expresso minha autorização livre, informada e esclarecida para iniciar o processo de avaliação médica assíncrona através da plataforma Fio Raiz, nos termos descritos acima, em conformidade com a Resolução CFM n.º 2.314/2022 e a Lei n.º 14.510/2022.`
  },
];

export default function ConsentForm() {
  const [accepted, setAccepted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  function handleScroll(e) {
    const el = e.target;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) {
      setScrolled(true);
    }
  }

  const s = {
    wrap: { minHeight: "100vh", background: "#F9F8F6", fontFamily: "'Outfit',sans-serif", color: "#111" },
    header: { background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" },
    body: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" },
    card: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, padding: "24px 20px", marginBottom: 12 },
    section: { marginBottom: 28 },
    sectionTitle: { fontSize: 13, fontWeight: 700, color: "#0a0a0a", marginBottom: 10, letterSpacing: "-0.01em" },
    sectionText: { fontSize: 13, color: "#555", lineHeight: 1.85, whiteSpace: "pre-wrap" },
    checkbox: { width: 20, height: 20, borderRadius: 4, border: `2px solid ${accepted ? "#0a0a0a" : "rgba(0,0,0,0.2)"}`, background: accepted ? "#0a0a0a" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "all 0.2s" },
    btn: { background: accepted ? "#0a0a0a" : "rgba(0,0,0,0.15)", color: "#fff", border: "none", padding: "17px 0", borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: accepted ? "pointer" : "not-allowed", fontFamily: "'Outfit',sans-serif", width: "100%", transition: "all 0.2s", letterSpacing: "0.02em" },
  };

  if (confirmed) {
    return (
      <div style={s.wrap}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap');`}</style>
        <div style={s.header}>
          <FioRaizLogo />
        </div>
        <div style={{ ...s.body, textAlign: "center", paddingTop: 80 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <span style={{ color: "#fff", fontSize: 28 }}>✓</span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>
            Termo aceito.
          </h2>
          <p style={{ fontSize: 15, color: "#888", lineHeight: 1.7, maxWidth: 400, margin: "0 auto 32px" }}>
            Seu consentimento foi registrado. Você pode prosseguir com o questionário de saúde.
          </p>
          <div style={{ background: "#f8f8f6", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8, padding: "16px 20px", textAlign: "left", maxWidth: 400, margin: "0 auto" }}>
            <div style={{ fontSize: 10, color: "#aaa", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Registro</div>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>
              Data: {new Date().toLocaleDateString("pt-BR")}<br/>
              Hora: {new Date().toLocaleTimeString("pt-BR")}<br/>
              Documento: TCLE-FIORAIZ-2026
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap');`}</style>

      {/* Header */}
      <div style={s.header}>
        <FioRaizLogo />
        <div style={{ fontSize: 11, color: "#aaa", letterSpacing: "0.06em" }}>TCLE — Telemedicina</div>
      </div>

      <div style={s.body}>

        {/* Título */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, color: "#aaa", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>
            Documento legal
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 12 }}>
            Termo de Consentimento<br/>Livre e Esclarecido
          </h1>
          <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7 }}>
            Para Telemedicina e Telessaúde · Fio Raiz Saúde Digital<br/>
            Em conformidade com a Resolução CFM n.º 2.314/2022 e Lei n.º 14.510/2022
          </p>
        </div>

        {/* Aviso de leitura */}
        {!scrolled && (
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 8, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 16 }}>📋</span>
            <span style={{ fontSize: 13, color: "#78350f" }}>Leia o documento completo antes de aceitar.</span>
          </div>
        )}

        {/* Documento scrollável */}
        <div
          onScroll={handleScroll}
          style={{
            background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8,
            padding: "28px 24px", maxHeight: 480, overflowY: "auto", marginBottom: 20,
            scrollBehavior: "smooth"
          }}
        >
          {SECTIONS.map((sec, i) => (
            <div key={i} style={s.section}>
              <div style={s.sectionTitle}>{sec.titulo}</div>
              <div style={s.sectionText}>{sec.texto}</div>
              {i < SECTIONS.length - 1 && (
                <div style={{ width: "100%", height: 1, background: "rgba(0,0,0,0.05)", marginTop: 24 }}/>
              )}
            </div>
          ))}

          {/* Rodapé do documento */}
          <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 11, color: "#aaa", lineHeight: 1.7 }}>
              Fio Raiz Saúde Digital Ltda · fioraiz.com.br · contato@fioraiz.com.br<br/>
              Documento: TCLE-FIORAIZ-2026 · Versão 1.0 · Abril de 2026
            </div>
          </div>
        </div>

        {/* Checkbox de aceite */}
        <div style={s.card}>
          <div
            style={{ display: "flex", gap: 14, alignItems: "flex-start", cursor: "pointer" }}
            onClick={() => setAccepted(!accepted)}
          >
            <div style={s.checkbox}>
              {accepted && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
            </div>
            <p style={{ fontSize: 14, color: "#333", lineHeight: 1.7 }}>
              Li e compreendi todas as informações contidas neste Termo de Consentimento Livre e Esclarecido. Autorizo o início da avaliação médica assíncrona através da plataforma Fio Raiz, estando ciente das limitações do atendimento por telemedicina e da independência dos médicos parceiros.
            </p>
          </div>
        </div>

        {/* Botão */}
        <button
          style={s.btn}
          disabled={!accepted}
          onClick={() => { if (accepted) setConfirmed(true); }}
        >
          {accepted ? "Aceitar e continuar →" : "Leia e aceite o termo para continuar"}
        </button>

        <p style={{ fontSize: 11, color: "#bbb", textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>
          Ao aceitar, você concorda com nossos{" "}
          <a href="#" style={{ color: "#888", textDecoration: "underline" }}>Termos de Uso</a> e{" "}
          <a href="#" style={{ color: "#888", textDecoration: "underline" }}>Política de Privacidade</a>.
        </p>
      </div>
    </div>
  );
}
