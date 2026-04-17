import { useNavigate } from "react-router-dom";

function FioLogo() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:7 }}>
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
    titulo: "1. Sobre a Fio Raiz",
    texto: `A Fio Raiz é uma plataforma digital de intermediação que conecta usuários a médicos parceiros e farmácias de manipulação credenciadas pela Anvisa.

• A Fio Raiz não é uma clínica médica, não presta serviços médicos e não realiza consultas médicas.
• A Fio Raiz não manipula, não produz e não vende medicamentos diretamente.
• Todo o atendimento médico (análise do questionário, diagnóstico e prescrição, quando aplicável) é realizado exclusivamente por médicos parceiros, que são profissionais independentes e responsáveis por seus próprios atos.
• A manipulação e entrega dos produtos são realizadas exclusivamente pelas farmácias parceiras credenciadas.`,
  },
  {
    titulo: "2. Serviços oferecidos",
    texto: `• Plataforma para preenchimento de questionário de avaliação
• Intermediação com médicos para análise assíncrona
• Coordenação entre o médico prescritor e as farmácias parceiras
• Suporte ao usuário via WhatsApp e área logada
• Acompanhamento do processo de entrega dos produtos`,
  },
  {
    titulo: "3. Responsabilidades do Usuário",
    texto: `Você se compromete a:
• Fornecer informações verdadeiras, completas e atualizadas
• Utilizar a plataforma apenas para fins lícitos
• Não compartilhar sua conta ou login com terceiros
• Informar imediatamente qualquer alteração relevante em seu estado de saúde
• Respeitar os prazos e condições de pagamento`,
  },
  {
    titulo: "4. Limitação de Responsabilidade",
    texto: `A Fio Raiz não se responsabiliza por:
• Diagnóstico, prescrição, conduta médica ou qualquer decisão clínica tomada pelo médico parceiro
• Qualidade, eficácia, segurança ou efeitos colaterais dos medicamentos manipulados pelas farmácias parceiras
• Resultados do tratamento (não há garantia de eficácia ou de resultados específicos)
• Danos decorrentes de informações incompletas ou inverídicas fornecidas pelo usuário
• Atrasos ou problemas na entrega realizados pelas transportadoras
• Qualquer prejuízo decorrente de atos ou omissões dos médicos ou farmácias parceiras

Os serviços são prestados "no estado em que se encontram", sem qualquer garantia de resultado ou de ausência de efeitos colaterais.`,
  },
  {
    titulo: "5. Pagamento e Assinatura",
    texto: `• Os valores são informados de forma clara antes da contratação.
• Ao contratar um plano recorrente, você autoriza a cobrança mensal automática até o cancelamento.
• O cancelamento pode ser feito a qualquer momento pela área do cliente, mas o acesso aos serviços será mantido até o final do ciclo pago.
• Não realizamos reembolso parcial de valores já utilizados ou de produtos já manipulados e enviados.`,
  },
  {
    titulo: "6. Cancelamento e Reembolso",
    texto: `• Você pode cancelar sua assinatura a qualquer momento.
• Produtos já manipulados ou enviados não serão reembolsados.
• Em caso de arrependimento dentro do prazo legal de 7 dias (art. 49 do CDC), desde que o produto ainda não tenha sido manipulado, analisaremos o reembolso.`,
  },
  {
    titulo: "7. Propriedade Intelectual",
    texto: `Todo o conteúdo da plataforma (textos, imagens, logos, questionários etc.) é de propriedade exclusiva da Fio Raiz ou devidamente licenciado. É proibido copiar, reproduzir ou utilizar sem autorização prévia.`,
  },
  {
    titulo: "8. Privacidade e Proteção de Dados",
    texto: `O tratamento de seus dados pessoais, inclusive os dados sensíveis de saúde, está regulado em nossa Política de Privacidade, que integra estes Termos de Uso. Ao aceitar estes Termos, você também aceita nossa Política de Privacidade.`,
  },
  {
    titulo: "9. Foro",
    texto: `Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer controvérsias decorrentes destes Termos de Uso, renunciando a qualquer outro, por mais privilegiado que seja.`,
  },
  {
    titulo: "10. Alterações nos Termos",
    texto: `A Fio Raiz poderá alterar estes Termos a qualquer momento. A versão atualizada será publicada no site e entrará em vigor na data de publicação.`,
  },
  {
    titulo: "11. Contato",
    texto: `Em caso de dúvidas sobre estes Termos de Uso, entre em contato pelo e-mail: contato@fioraiz.com.br ou através do suporte da plataforma.

Ao utilizar nossos serviços, você confirma que leu, entendeu e concorda com todos os termos acima.`,
  },
];

export default function TermsOfUse() {
  const navigate = useNavigate();
  const font = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Outfit',sans-serif;}`;

  return (
    <div style={{ minHeight:"100vh", background:"#F0F7FA", fontFamily:"'Outfit',sans-serif", color:"#1A3040" }}>
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
            Termos de Uso
          </h1>
          <p style={{ fontSize:14, color:"#888", lineHeight:1.7 }}>
            Fio Raiz Administração de Negócios Ltda. · fioraiz.com.br
          </p>
        </div>

        {/* Intro */}
        <div style={{ background:"#fff", borderRadius:12, padding:"20px 24px", marginBottom:20,
          border:"1px solid rgba(0,0,0,0.08)", fontSize:14, color:"#555", lineHeight:1.8 }}>
          Bem-vindo à Fio Raiz! Estes Termos de Uso regulam o relacionamento entre você (Usuário) e a Fio Raiz. Ao acessar ou utilizar nosso site, plataforma ou serviços, você declara ter lido, compreendido e aceitado integralmente estes Termos de Uso.
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
          Fio Raiz Saúde Digital Ltda · fioraiz.com.br · contato@fioraiz.com.br<br/>
          Documento: TU-FIORAIZ-2026 · Versão 1.0 · Abril de 2026
        </div>
      </div>
    </div>
  );
}
