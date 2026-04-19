import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FioLogo({ color = "#1A3040", size = 20 }) {
  const navigate = useNavigate();
  const isWhite = color === "#fff" || color === "white";
  return (
    <div onClick={() => navigate("/")}
      style={{ display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none", WebkitTapHighlightColor: "transparent" }}
      role="link" aria-label="Voltar para a home">
      <img src="/logo-v2.png" alt="Fio Raiz" style={{ height: size * 2.8, width: "auto", display: "block", filter: isWhite ? "brightness(0) invert(1)" : "none" }} />
    </div>
  );
}

const STATS = [
  { n: "42%",  label: "dos homens brasileiros", sub: "têm algum grau de calvície" },
  { n: "85%",  label: "dos homens até os 50 anos", sub: "apresentarão alopecia significativa" },
  { n: "2 em 3", label: "relatam impacto emocional", sub: "na autoestima e qualidade de vida" },
  { n: "95%",  label: "dos casos de calvície", sub: "são do tipo androgênica, tratável" },
];

const VALORES = [
  {
    icon: "🎯",
    title: "Foco total no homem",
    text: "Desenvolvemos a Fio Raiz exclusivamente para homens com calvície androgênica. Sem distrações, sem generalismo — protocolos pensados para o seu tipo de queda, do início ao fim.",
  },
  {
    icon: "🔬",
    title: "Ciência como base",
    text: "Usamos apenas ativos com evidência clínica validada pela ciência e órgãos regulatórios internacionais. Sem promessas sem fundamento, sem modismos.",
  },
  {
    icon: "🤝",
    title: "Acompanhamento contínuo",
    text: "Não acreditamos em soluções pontuais. Seu protocolo evolui com você — início, progresso e manutenção — com acompanhamento constante.",
  },
  {
    icon: "🔒",
    title: "Privacidade e discrição",
    text: "Calvície é um assunto pessoal. Tudo acontece 100% online, com embalagem discreta e sem expor você a constrangimentos.",
  },
];

export default function QuemSomos() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const c = {
    page: { fontFamily: "'Outfit',sans-serif", background: "#F0F7FA", color: "#1A3040", overflowX: "hidden" },
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      padding: "0 5%", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "none",
      transition: "all 0.3s",
    },
    tag: { fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888" },
    cta: { background: "#004358", color: "#fff", padding: "15px 36px", borderRadius: 6, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s" },
  };

  return (
    <div style={c.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        a{text-decoration:none;color:inherit;}
        .btn:hover{background:#003347!important;transform:translateY(-1px);}
        .show-mob{display:none;}
        @media(max-width:768px){
          .two-col{grid-template-columns:1fr!important;}
          .four-col{grid-template-columns:1fr 1fr!important;}
          .hero-h{font-size:clamp(32px,9vw,48px)!important;}
          .hide-mob{display:none!important;}
          .show-mob{display:flex!important;}
        }
      `}</style>

      {/* NAV */}
      <nav style={c.nav}>
        <FioLogo color="#1A3040" size={20} />
        <div className="hide-mob" style={{ display:"flex", gap:32, alignItems:"center" }}>
          {[["/","Início"],["quemsomos","Quem Somos"],["comunidade","Comunidade"]].map(([h,l]) => (
            <a key={h} href={h} style={{ fontSize:13, color:"#666", fontWeight:500 }}>{l}</a>
          ))}
        </div>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <button className="btn hide-mob" onClick={() => navigate("/avaliacao")} style={c.cta}>Avaliação gratuita</button>
          <button onClick={() => setMenuOpen(o => !o)}
            style={{ display:"none", background:"none", border:"none", cursor:"pointer", padding:8, flexDirection:"column", gap:5 }}
            className="show-mob">
            <span style={{ display:"block", width:22, height:2, background:"#1A3040", borderRadius:2, transition:"all 0.25s", transform: menuOpen?"rotate(45deg) translate(5px,5px)":"none" }}/>
            <span style={{ display:"block", width:22, height:2, background:"#1A3040", borderRadius:2, transition:"all 0.25s", opacity: menuOpen?0:1 }}/>
            <span style={{ display:"block", width:22, height:2, background:"#1A3040", borderRadius:2, transition:"all 0.25s", transform: menuOpen?"rotate(-45deg) translate(5px,-5px)":"none" }}/>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:199, background:"rgba(0,0,0,0.3)", backdropFilter:"blur(4px)" }}
          onClick={() => setMenuOpen(false)} />
      )}
      <div style={{
        position:"fixed", top:64, right:0, bottom:0, zIndex:200,
        width:"75vw", maxWidth:300, background:"#fff",
        boxShadow:"-8px 0 40px rgba(0,0,0,0.12)",
        transform: menuOpen?"translateX(0)":"translateX(100%)",
        transition:"transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        padding:"32px 28px", display:"flex", flexDirection:"column", gap:8,
      }}>
        {[["/","Início"],["quemsomos","Quem Somos"],["comunidade","Comunidade"]].map(([h,l]) => (
          <a key={h} href={h} onClick={() => setMenuOpen(false)}
            style={{ fontSize:18, fontWeight:500, color:"#555", padding:"14px 0", borderBottom:"1px solid rgba(0,0,0,0.06)", display:"block" }}>{l}</a>
        ))}
        <button className="btn" onClick={() => { setMenuOpen(false); navigate("/avaliacao"); }}
          style={{ background:"#004358", color:"#fff", padding:"16px 32px", borderRadius:6, fontSize:14, fontWeight:700, border:"none", cursor:"pointer", fontFamily:"'Outfit',sans-serif", marginTop:24, textAlign:"center", width:"100%" }}>
          Avaliação gratuita
        </button>
      </div>

      {/* HERO */}
      <section style={{
        minHeight: "70vh", display: "flex", alignItems: "center",
        padding: "120px 5% 80px",
        background: "linear-gradient(160deg, #f7f7f5 0%, #fff 70%)",
      }}>
        <div style={{
          maxWidth: 740, margin: "0 auto", textAlign: "center",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease",
        }}>
          <div style={{ marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
              color: "#888", background: "#EDF5F8", padding: "6px 16px", borderRadius: 100 }}>
              Nossa história
            </span>
          </div>
          <h1 className="hero-h" style={{
            fontSize: "clamp(36px,4.5vw,60px)", fontWeight: 800, lineHeight: 1.1,
            letterSpacing: "-0.03em", marginBottom: 24, color: "#1A3040",
          }}>
            Criamos a Fio Raiz<br/>
            <span style={{ color: "#aaa" }}>para quem não quer esperar.</span>
          </h1>
          <p style={{ fontSize: 17, color: "#666", lineHeight: 1.85, maxWidth: 620, margin: "0 auto" }}>
            Um tratamento para calvície que funciona de verdade existe há décadas.
            O problema sempre foi o acesso — filas, consultas difíceis de marcar, constrangimento.
            Nós resolvemos isso.
          </p>
        </div>
      </section>

      {/* DADOS / ESTATÍSTICAS */}
      <section style={{ background: "#1A3040", padding: "64px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ ...c.tag, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>O que os estudos dizem</div>
            <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, color: "#fff",
              letterSpacing: "-0.02em", lineHeight: 1.2, maxWidth: 560, margin: "0 auto" }}>
              A calvície afeta a maioria dos homens.<br/>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>E quase ninguém fala sobre isso.</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }} className="four-col">
            {STATS.map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 16,
                padding: "28px 20px", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                <div style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: "#fff",
                  letterSpacing: "-0.02em", marginBottom: 6 }}>{s.n}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 28, textAlign: "center", lineHeight: 1.7, maxWidth: 720, margin: "28px auto 0" }}>
            Fontes: American Hair Loss Association (AHLA); Sociedade Brasileira de Dermatologia (SBD);
            Norwood-Hamilton Scale studies; Journal of the American Academy of Dermatology — estudos sobre alopecia androgênica masculina.
          </p>
        </div>
      </section>

      {/* NOSSA HISTÓRIA */}
      <section style={{ padding: "80px 5%", background: "#F0F7FA" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid",
          gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="two-col">
          <div>
            <div style={{ ...c.tag, marginBottom: 16 }}>Por que criamos a Fio Raiz</div>
            <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 800, letterSpacing: "-0.02em",
              lineHeight: 1.15, marginBottom: 24 }}>
              Um tratamento que existe.<br/>Um acesso que faltava.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, color: "#555", fontSize: 15, lineHeight: 1.85 }}>
              <p>
                A alopecia androgênica masculina é a causa mais comum de calvície no mundo. Existe tratamento
                eficaz — comprovado por décadas de estudos clínicos, aprovado pelos maiores órgãos regulatórios
                do planeta. Mas grande parte dos homens nunca acessa esse tratamento.
              </p>
              <p>
                O motivo é simples: a jornada é burocrática, cara ou constrangedora. Consulta presencial,
                espera, repetição, farmácia — e no meio disso tudo, desistência.
              </p>
              <p style={{ fontWeight: 600, color: "#1A3040" }}>
                Criamos a Fio Raiz para resolver exatamente isso. Uma plataforma onde o homem faz
                a avaliação do próprio celular, recebe o protocolo em casa, e é acompanhado
                em cada fase — sem fila, sem constrangimento, sem complicação.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { n: "01", title: "Praticidade real", text: "Do questionário à entrega, tudo acontece no celular ou computador. Sem precisar sair de casa, sem exposição desnecessária." },
              { n: "02", title: "Protocolo descomplicado", text: "Traduzimos a ciência em rotina. Você sabe exatamente o que tomar, quando e por quê — sem jargão médico, sem dúvidas." },
              { n: "03", title: "Continuidade que transforma", text: "Calvície não tem cura — tem controle. E controle exige continuidade. Nossa estrutura foi pensada para te manter na rota por meses e anos." },
            ].map((item, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "24px 24px",
                border: "1px solid rgba(0,0,0,0.07)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#ddd", letterSpacing: "0.1em", marginBottom: 8 }}>{item.n}</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "#1A3040" }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOCO EXCLUSIVO */}
      <section style={{ padding: "80px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <div style={{ ...c.tag, marginBottom: 16 }}>Nosso foco</div>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 800, letterSpacing: "-0.02em",
            lineHeight: 1.15, marginBottom: 24 }}>
            Exclusivamente para homens<br/>
            <span style={{ color: "#aaa" }}>com calvície androgênica.</span>
          </h2>
          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.85, maxWidth: 620, margin: "0 auto 48px" }}>
            Não somos uma plataforma de saúde genérica. Não tratamos tudo para todos.
            Somos especialistas em um único problema — e por isso fazemos muito bem feito.
            Alopecia androgênica masculina é o que estudamos, o que estruturamos e o que
            resolvemos. Ponto.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, textAlign: "left", maxWidth: 720, margin: "0 auto" }} className="two-col">
            {VALORES.map((v, i) => (
              <div key={i} style={{ background: "#F0F7FA", borderRadius: 20, padding: "28px 24px",
                border: "1px solid rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{v.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1A3040", marginBottom: 8 }}>{v.title}</div>
                <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>{v.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: "80px 5%", background: "#1A3040", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "#fff",
            letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 20 }}>
            Pronto para começar<br/>pelo caminho certo?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 36 }}>
            Avaliação rápida e gratuita. Sem compromisso. O protocolo chega em casa.
          </p>
          <button className="btn" onClick={() => navigate("/avaliacao")}
            style={{ ...c.cta, background: "#fff", color: "#1A3040", padding: "17px 48px", fontSize: 15 }}>
            Fazer avaliação gratuita
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#fff", padding: "32px 5%", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex",
          justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <FioLogo color="#1A3040" size={18} />
          <p style={{ fontSize: 12, color: "rgba(0,0,0,0.4)", lineHeight: 1.6, maxWidth: 600 }}>
            A Fio Raiz não é uma farmácia. Todos os produtos adquiridos são manipulados pelas farmácias credenciadas, de acordo com as normas da Anvisa.
          </p>
        </div>
      </footer>
    </div>
  );
}
