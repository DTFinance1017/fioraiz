import { useNavigate } from "react-router-dom";

function FioLogo() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/")} style={{ display:"flex", alignItems:"center", gap:7, cursor:"pointer", userSelect:"none", WebkitTapHighlightColor:"transparent" }} role="link" aria-label="Voltar para a home">
      <svg width={10} height={22} viewBox="0 0 16 35" fill="none">
        <ellipse cx="8" cy="4" rx="4" ry="4" fill="#1A3040" opacity="0.9"/>
        <path d="M8 8 C7 12 9 15 8 19 C7 23 9 27 8 31 C7.5 33 8 34 8 35"
          stroke="#1A3040" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      </svg>
      <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:18, fontWeight:700, color:"#1A3040", letterSpacing:"0.05em" }}>
        fio<span style={{ opacity:0.4 }}>raiz</span>
      </span>
    </div>
  );
}

const SECTIONS = [
  {
    titulo: "1. Quem somos",
    texto: `A Fio Raiz é uma plataforma digital que atua como intermediadora entre você, médicos parceiros e farmácias de manipulação credenciadas. Nós não realizamos atendimentos médicos nem manipulamos medicamentos. Nossa função é facilitar o acesso ao questionário de avaliação, conectar você com profissionais habilitados e coordenar a entrega dos produtos prescritos.`,
  },
  {
    titulo: "2. Dados que coletamos",
    texto: `Dados pessoais que você nos fornece:
• Nome completo, CPF, data de nascimento, endereço, telefone e e-mail
• Informações de pagamento (processadas por gateways seguros)
• Respostas ao questionário de saúde (histórico médico, uso de medicamentos, condições de saúde etc.)

Dados sensíveis (dados de saúde):
• Informações sobre sua condição capilar, histórico de queda de cabelo, tratamentos anteriores, alergias, condições hormonais e quaisquer outras informações clínicas que você fornecer.

Dados coletados automaticamente:
• Endereço IP, tipo de navegador, dispositivo utilizado, páginas visitadas, tempo de navegação, cookies e tecnologias semelhantes.`,
  },
  {
    titulo: "3. Para que usamos seus dados",
    texto: `• Processar sua avaliação e questionário
• Encaminhar suas informações ao médico parceiro responsável pela análise assíncrona
• Coordenar a prescrição e o envio dos produtos junto às farmácias parceiras
• Fornecer suporte via WhatsApp ou área do cliente
• Cumprir obrigações legais e regulatórias
• Melhorar nossos serviços e realizar análises internas (estatísticas anonimizadas)`,
  },
  {
    titulo: "4. Compartilhamento de dados",
    texto: `Seus dados podem ser compartilhados com:
• Médicos parceiros (apenas os dados necessários para o atendimento)
• Farmácias de manipulação parceiras (exclusivamente os dados necessários para produção e entrega do medicamento prescrito)
• Prestadores de serviços (empresas de tecnologia, hospedagem, pagamento, entrega e suporte técnico, todas com contratos de confidencialidade)
• Autoridades competentes quando exigido por lei (Anvisa, CFM, Justiça etc.)

Nunca vendemos seus dados pessoais.`,
  },
  {
    titulo: "5. Bases legais para o tratamento de dados",
    texto: `• Consentimento: quando você aceita esta Política e o Termo de Consentimento
• Execução de contrato: para prestar o serviço de intermediação que você contratou
• Legítimo interesse: para melhoria de serviços, prevenção de fraudes e segurança da plataforma
• Obrigação legal: para cumprimento de normas do CFM, Anvisa e outras regulamentações aplicáveis`,
  },
  {
    titulo: "6. Armazenamento e segurança",
    texto: `Seus dados são armazenados em servidores seguros. Os dados sensíveis de saúde (prontuário) serão mantidos pelo prazo mínimo exigido pela legislação médica (geralmente até 20 anos), mesmo após o encerramento da sua conta.`,
  },
  {
    titulo: "7. Seus direitos (LGPD)",
    texto: `Você pode, a qualquer momento, solicitar:
• Confirmação da existência de tratamento de dados
• Acesso aos seus dados
• Correção de dados incompletos, inexatos ou desatualizados
• Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos
• Revogação do consentimento
• Portabilidade dos dados

Para exercer seus direitos, envie um e-mail para: privacidade@fioraiz.com.br`,
  },
  {
    titulo: "8. Cookies e tecnologias semelhantes",
    texto: `Utilizamos cookies necessários para o funcionamento da plataforma. Você pode gerenciar suas preferências de cookies nas configurações do navegador.`,
  },
  {
    titulo: "9. Alterações nesta Política",
    texto: `Podemos atualizar esta Política de Privacidade periodicamente. A versão mais atual sempre estará disponível em nosso site.`,
  },
  {
    titulo: "10. Contato",
    texto: `Em caso de dúvidas, entre em contato pelo e-mail: privacidade@fioraiz.com.br ou através do suporte da plataforma.

Ao continuar utilizando nossos serviços, você declara ter lido, compreendido e concordado com os termos desta Política de Privacidade.`,
  },
];

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const font = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Outfit',sans-serif;}`;

  return (
    <div style={{ minHeight:"100vh", background:"#F0F7FA", fontFamily:"'Outfit',sans-serif", color:"#1A3040", width:"100%", maxWidth:"100vw", overflowX:"hidden" }}>
      <style>{font}</style>

      {/* Header */}
      <div style={{ background:"#fff", borderBottom:"1px solid rgba(0,0,0,0.07)", padding:"14px 20px",
        display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
        <FioLogo />
        <button onClick={() => navigate(-1)}
          style={{ background:"#EDF5F8", border:"none", borderRadius:100, padding:"8px 16px",
            fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif", color:"#333" }}>
          ← Voltar
        </button>
      </div>

      <div style={{ maxWidth:720, margin:"0 auto", padding:"40px 20px 80px" }}>
        {/* Título */}
        <div style={{ marginBottom:32 }}>
          <div style={{ fontSize:11, color:"#aaa", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:10 }}>
            Documento legal · Última atualização: 17 de abril de 2026
          </div>
          <h1 style={{ fontSize:"clamp(24px,5vw,36px)", fontWeight:800, letterSpacing:"-0.02em", lineHeight:1.15, marginBottom:12 }}>
            Política de Privacidade
          </h1>
          <p style={{ fontSize:14, color:"#888", lineHeight:1.7 }}>
            Fio Raiz Saúde Digital · Em conformidade com a LGPD (Lei nº 13.709/2018)
          </p>
        </div>

        {/* Intro */}
        <div style={{ background:"#fff", borderRadius:12, padding:"20px 24px", marginBottom:20,
          border:"1px solid rgba(0,0,0,0.08)", fontSize:14, color:"#555", lineHeight:1.8 }}>
          A Fio Raiz respeita a sua privacidade e está comprometida em proteger seus dados pessoais, especialmente os dados sensíveis relacionados à saúde, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018).
        </div>

        {/* Seções */}
        {SECTIONS.map((sec, i) => (
          <div key={i} style={{ background:"#fff", borderRadius:12, padding:"20px 24px", marginBottom:12,
            border:"1px solid rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize:13, fontWeight:700, marginBottom:10 }}>{sec.titulo}</div>
            <div style={{ fontSize:13, color:"#555", lineHeight:1.85, whiteSpace:"pre-wrap" }}>{sec.texto}</div>
          </div>
        ))}

        {/* Rodapé */}
        <div style={{ marginTop:24, paddingTop:20, borderTop:"1px solid rgba(0,0,0,0.08)",
          fontSize:11, color:"#aaa", lineHeight:1.7, textAlign:"center" }}>
          Fio Raiz Saúde Digital Ltda · fioraiz.com.br · privacidade@fioraiz.com.br<br/>
          Documento: PP-FIORAIZ-2026 · Versão 1.0 · Abril de 2026
        </div>
      </div>
    </div>
  );
}
