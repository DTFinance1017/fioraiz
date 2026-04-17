import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    texto: `Pelo presente termo, declaro que estou informado e esclarecido de que a minha consulta médica será realizada por telemedicina na modalidade assíncrona, em conformidade com a Resolução n.º 2314/2022 do Conselho Federal de Medicina (CFM) e Lei 14.510, de 27 de dezembro de 2022.

As consultas médicas oferecidas são serviços independentes e distintos dos serviços prestados pela Fio Raiz, sendo realizadas por médicos externos, autônomos e devidamente habilitados. Esses profissionais são os únicos responsáveis por fornecer o diagnóstico e indicar o tratamento, caso necessário. A Fio Raiz atua exclusivamente como plataforma de intermediação e não interfere, influencia ou participa das decisões clínicas tomadas durante essas consultas.`
  },
  {
    titulo: "2. Modalidade Assíncrona",
    texto: `Declaro que tenho ciência de que a telemedicina assíncrona ocorre à distância e não é realizada em tempo real ou por videochamada. As informações clínicas, fotos e/ou vídeos enviados por intermédio do site da Fio Raiz serão analisados por um médico, que, após consulta assíncrona, emitirá um diagnóstico e, se necessário, um plano de tratamento.

Estou ciente de que o atendimento à distância é limitado por não permitir a realização do exame físico presencial. Dessa forma, me comprometo a informar todos os dados possíveis, não omitindo nenhuma informação referente à minha saúde, colaborando assim para o bom aproveitamento da teleconsulta.`
  },
  {
    titulo: "3. Limitações do Atendimento",
    texto: `Ao concordar, expresso minha autorização e aceite para iniciar minha teleconsulta. Estou ciente das limitações do atendimento à distância, como:

a) Dificuldade de visualização de detalhes pelas fotos;
b) Necessidade de envio de dados complementares;
c) Necessidade de realização de exames;
d) Possibilidade de declínio por parte do médico a depender da complexidade do caso clínico;
e) Conversão da consulta assíncrona para videoconferência;
f) Encaminhamento para um atendimento presencial ou especialista.`
  },
  {
    titulo: "4. Proteção de Dados (LGPD)",
    texto: `Autorizo a transmissão, compartilhamento e tratamento das minhas imagens, dados pessoais (nome, idade, endereço, e-mail, CPF) e dados clínicos (respostas ao questionário de saúde) com a clínica médica credenciada e o médico responsável, respeitando a Lei Geral de Proteção de Dados (LGPD).

Estou ciente de que minha privacidade será mantida e todos os dados sensíveis serão preservados pelo sigilo médico, incluindo os dados trocados por imagem, texto e/ou áudio entre médico e paciente.`
  },
  {
    titulo: "5. Confidencialidade",
    texto: `Comprometo-me a preservar e manter a confidencialidade das imagens, dos dados, dos diálogos, das orientações, das prescrições e de todo o conteúdo referente à telemedicina, sob pena de sanções legais por exposição de dados e imagem. Da mesma forma, afirmo meu compromisso em não gravar, fotografar ou editar qualquer momento ou etapa da telemedicina.`
  },
  {
    titulo: "6. Prontuário Eletrônico",
    texto: `Declaro ter ciência de que as informações relacionadas ao atendimento, diagnóstico, prescrição (se houver) e o presente termo de consentimento serão devidamente anexados em meu prontuário eletrônico na área logada do site www.fioraiz.com.br, o que desde já autorizo.

Autorizo a clínica médica credenciada a analisar meus dados clínicos e imagens e tenho ciência de que poderei entrar em contato com o médico responsável a qualquer tempo durante a vigência do meu plano, através da área logada no site da Fio Raiz.`
  },
  {
    titulo: "7. Veracidade e Capacidade",
    texto: `Estou ciente de que este tipo de atendimento é pessoal e intransferível, portanto, não poderá ser utilizado por terceiros. Assumo o dever de informar imediatamente ao médico sobre quaisquer alterações em meu estado de saúde atuais ou durante o tratamento que possam influenciar na avaliação médica.

Declaro que é de minha expressa e espontânea vontade repassar minhas informações médicas sob minha responsabilidade por meio de comunicação modalidade síncrona ou assíncrona.

Declaro que todas as informações prestadas são verídicas e que possuo capacidade plena para celebrar este termo.`
  },
  {
    titulo: "8. Aceitação e Consentimento",
    texto: `Declaro, para todos os fins e efeitos legais, que estou ciente e autorizo a minha consulta médica nos termos acima descritos, em conformidade com a Resolução n.º 2314/2022 do Conselho Federal de Medicina (CFM) e Lei 14.510, de 27 de dezembro de 2022.`
  },
];


export default function ConsentForm() {
  const navigate = useNavigate();
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
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ fontSize: 11, color: "#aaa", letterSpacing: "0.06em" }}>TCLE — Telemedicina</div>
          <button onClick={() => navigate(-1)}
            style={{ background:"#f0eeeb", border:"none", borderRadius:100, padding:"7px 14px",
              fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif", color:"#333" }}>
            ← Voltar
          </button>
        </div>
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
