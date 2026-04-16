import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FioLogo({ color = "#0a0a0a", size = 22 }) {
  return (
    <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
      <svg width={size * 1.1} height={size * 1.4} viewBox="0 0 22 28" fill="none">
        <ellipse cx="11" cy="7" rx="5" ry="7" fill={color} opacity="0.15" />
        <ellipse cx="11" cy="6" rx="3.5" ry="5" fill={color} opacity="0.4" />
        <ellipse cx="11" cy="5" rx="2" ry="3" fill={color} />
        <line x1="11" y1="12" x2="8" y2="28" stroke={color} strokeWidth="1.2" opacity="0.3" />
        <line x1="11" y1="12" x2="11" y2="28" stroke={color} strokeWidth="1.5" opacity="0.6" />
        <line x1="11" y1="12" x2="14" y2="28" stroke={color} strokeWidth="1.2" opacity="0.3" />
      </svg>
      <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: size, fontWeight: 700, color, letterSpacing: "-0.02em" }}>
        fioraiz
      </span>
    </a>
  );
}

const NAV_LINKS = [
  { href: "/",               label: "Tratamento capilar masculino" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#tratamento",    label: "Tudo incluso" },
  { href: "/comunidade",     label: "Comunidade" },
];

const SECTIONS = [
  { id: "queda-normal",  label: "Queda normal x calvície" },
  { id: "causas",        label: "Causas da queda" },
  { id: "ciclo-capilar", label: "Ciclo capilar" },
  { id: "tipos",         label: "Tipos de calvície" },
  { id: "tratamentos",   label: "Tratamentos eficazes" },
  { id: "dutasterida",   label: "Dutasterida" },
  { id: "quando-buscar", label: "Quando agir" },
];

export default function Comunidade() {
  const navigate = useNavigate();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const ctaStyle = {
    background: "#0a0a0a", color: "#fff",
    padding: "14px 32px", borderRadius: 100,
    fontSize: 14, fontWeight: 700,
    border: "none", cursor: "pointer",
    textDecoration: "none", display: "inline-block",
    transition: "all 0.2s",
  };

  return (
    <div style={{ fontFamily: "'Outfit',sans-serif", background: "#fff", color: "#0a0a0a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::selection{background:#0a0a0a;color:#fff;}
        a{text-decoration:none;color:inherit;}
        .btn:hover{opacity:0.85;transform:translateY(-1px);}
        .toc-link{display:block;padding:8px 0;font-size:13px;color:#888;font-weight:500;border-left:2px solid #eee;padding-left:14px;transition:all 0.2s;}
        .toc-link:hover{color:#0a0a0a;border-left-color:#0a0a0a;}
        .article-h2{font-size:clamp(22px,3vw,32px);font-weight:800;letter-spacing:-0.02em;line-height:1.2;margin-bottom:16px;margin-top:56px;color:#0a0a0a;}
        .article-h3{font-size:18px;font-weight:700;letter-spacing:-0.01em;margin-bottom:10px;margin-top:32px;color:#0a0a0a;}
        .article-p{font-size:16px;color:#444;line-height:1.85;margin-bottom:20px;}
        .article-ul{margin:16px 0 20px 0;display:flex;flex-direction:column;gap:10px;}
        .article-li{font-size:15px;color:#444;line-height:1.7;display:flex;gap:12px;align-items:flex-start;}
        .highlight-box{background:#f8f8f6;border-left:3px solid #0a0a0a;padding:20px 24px;border-radius:0 12px 12px 0;margin:28px 0;}
        .highlight-box p{font-size:15px;color:#333;line-height:1.8;margin:0;font-style:italic;}
        .hide-desk{display:none;}
        @media(max-width:768px){
          .layout{grid-template-columns:1fr!important;}
          .sidebar{display:none!important;}
          .article-h2{margin-top:40px;}
          .treatments-grid{grid-template-columns:1fr!important;}
          .hide-mob{display:none!important;}
          .hide-desk{display:flex!important;}
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: "0 5%", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        transition: "all 0.3s",
      }}>
        <FioLogo color="#0a0a0a" size={20} />

        {/* Desktop links */}
        <div className="hide-mob" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href}
              style={{ fontSize: 13, color: l.href === "/comunidade" ? "#0a0a0a" : "#666", fontWeight: l.href === "/comunidade" ? 700 : 500 }}>
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="btn hide-mob" onClick={() => navigate("/avaliacao")}
            style={{ ...ctaStyle, padding: "11px 24px", fontSize: 13 }}>
            Avaliação gratuita
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="hide-desk"
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, flexDirection: "column", gap: 5 }}>
            <span style={{ display: "block", width: 22, height: 2, background: "#0a0a0a", borderRadius: 2, transition: "all 0.25s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 2, background: "#0a0a0a", borderRadius: 2, transition: "all 0.25s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 2, background: "#0a0a0a", borderRadius: 2, transition: "all 0.25s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 199,
          background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)",
        }} onClick={() => setMenuOpen(false)} />
      )}
      <div style={{
        position: "fixed", top: 64, right: 0, bottom: 0, zIndex: 199,
        width: "75vw", maxWidth: 300,
        background: "#fff", boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
        transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        padding: "32px 28px",
        display: "flex", flexDirection: "column", gap: 8,
      }}>
        {NAV_LINKS.map(l => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
            style={{
              fontSize: 18, fontWeight: l.href === "/comunidade" ? 700 : 500,
              color: l.href === "/comunidade" ? "#0a0a0a" : "#555",
              padding: "14px 0",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
            }}>
            {l.label}
          </a>
        ))}
        <button className="btn" onClick={() => { setMenuOpen(false); navigate("/avaliacao"); }}
          style={{ ...ctaStyle, marginTop: 24, textAlign: "center", width: "100%" }}>
          Avaliação gratuita
        </button>
      </div>

      {/* HERO DO ARTIGO */}
      <section style={{ padding: "120px 5% 60px", background: "linear-gradient(160deg, #f7f7f5 0%, #fff 60%)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", background: "#f0f0ee", padding: "5px 14px", borderRadius: 100 }}>
              Comunidade Fio Raiz · Saúde Capilar
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 20 }}>
            Queda de cabelo masculina:<br />
            <span style={{ color: "#aaa" }}>o que é normal e quando agir</span>
          </h1>
          <p style={{ fontSize: 18, color: "#666", lineHeight: 1.75, maxWidth: 640, marginBottom: 32 }}>
            Perder cabelo faz parte da vida. Mas existe uma diferença entre o ciclo natural e o início da calvície. Entender essa diferença pode mudar completamente o resultado do seu tratamento.
          </p>
          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ fontSize: 12, color: "#aaa", fontWeight: 500 }}>Por <strong style={{ color: "#555" }}>Equipe Fio Raiz</strong> · Revisado por médico</div>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#ddd" }} />
            <div style={{ fontSize: 12, color: "#aaa" }}>Leitura: 10 minutos</div>
          </div>
        </div>
      </section>

      {/* CONTEÚDO + SIDEBAR */}
      <div className="layout" style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 60, maxWidth: 1100, margin: "0 auto", padding: "60px 5% 100px" }}>
        <article>

          {/* 1. QUEDA NORMAL */}
          <h2 id="queda-normal" className="article-h2">Queda normal x início da calvície</h2>
          <p className="article-p">
            Perder entre 50 e 100 fios por dia é completamente normal. Isso faz parte do ciclo de renovação capilar — cada fio tem uma vida útil, cai, e um novo começa a crescer em seu lugar. O problema começa quando essa reposição não acontece, ou quando a queda é significativamente maior do que a renovação.
          </p>
          <p className="article-p">
            A calvície masculina, tecnicamente chamada de <strong>alopecia androgenética</strong>, não acontece da noite para o dia. Ela progride de forma gradual — muitas vezes tão lentamente que o homem só percebe quando a perda já é visível para os outros.
          </p>
          <div className="highlight-box">
            <p>"A maioria dos homens perde entre 30% e 50% da densidade capilar antes de perceber que havia um problema. O momento ideal para agir é antes disso."</p>
          </div>
          <p className="article-p">Alguns sinais que merecem atenção:</p>
          <ul className="article-ul">
            {["Linha do cabelo recuando nas têmporas ou na testa","Afinamento progressivo no topo da cabeça","Fios mais finos e frágeis do que antes","Excesso de fios no travesseiro, no chuveiro ou na escova","Escalpo mais visível quando o cabelo está molhado"].map((item, i) => (
              <li key={i} className="article-li">
                <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>✓</span>
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* 2. CAUSAS */}
          <h2 id="causas" className="article-h2">Por que o cabelo cai?</h2>
          <p className="article-p">
            A causa mais comum da calvície masculina é genética e hormonal. O principal vilão tem um nome: <strong>DHT (dihidrotestosterona)</strong>. Esse hormônio, derivado da testosterona, ataca os folículos capilares em homens geneticamente predispostos — miniaturizando-os progressivamente até que parem de produzir cabelo.
          </p>
          <p className="article-p">
            Se seu pai, avô ou tios paternos têm calvície, a chance de você desenvolver o mesmo padrão é significativamente alta. Mas genética não é destino — é um fator de risco que pode ser gerenciado com tratamento adequado.
          </p>
          <h3 className="article-h3">Outras causas comuns</h3>
          <ul className="article-ul">
            {[
              { t: "Estresse crônico", d: "O estresse prolongado pode desencadear um tipo de queda chamado eflúvio telógeno, empurrando grandes quantidades de fios para a fase de queda ao mesmo tempo." },
              { t: "Deficiências nutricionais", d: "A falta de ferro, zinco, biotina, vitamina D e proteínas compromete diretamente a estrutura e o crescimento do fio." },
              { t: "Distúrbios hormonais", d: "Alterações na tireoide afetam diretamente o ciclo capilar e podem causar queda difusa em todo o couro cabeludo." },
              { t: "Medicamentos", d: "Alguns tratamentos como quimioterapia, anticoagulantes ou antidepressivos têm queda como efeito colateral temporário." },
              { t: "Alopecia areata", d: "Condição autoimune em que o sistema imunológico ataca os folículos. Causa quedas em manchas e requer avaliação médica específica." },
            ].map((item, i) => (
              <li key={i} className="article-li" style={{ flexDirection: "column", gap: 4 }}>
                <strong style={{ fontSize: 15, color: "#0a0a0a" }}>{item.t}</strong>
                <span style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>{item.d}</span>
              </li>
            ))}
          </ul>

          {/* 3. CICLO CAPILAR */}
          <h2 id="ciclo-capilar" className="article-h2">Entendendo o ciclo capilar</h2>
          <p className="article-p">Cada fio passa por três fases distintas. Entender esse ciclo ajuda a compreender por que o tratamento precoce é tão mais eficaz.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, margin: "24px 0 32px" }}>
            {[
              { n: "01", title: "Anágena — fase de crescimento", desc: "Dura entre 2 e 7 anos. O fio está ativo, crescendo cerca de 1 cm por mês. Na calvície, o DHT encurta progressivamente essa fase até o folículo parar de funcionar." },
              { n: "02", title: "Catágena — fase de transição", desc: "Dura 2 a 3 semanas. O fio para de crescer e o folículo começa a encolher. Apenas 1% dos fios estão nessa fase ao mesmo tempo." },
              { n: "03", title: "Telógena — fase de repouso e queda", desc: "Dura 3 a 4 meses. O fio antigo cai e um novo começa a crescer. Em condições normais, 10 a 15% dos fios estão nessa fase simultaneamente." },
            ].map((s, i) => (
              <div key={i} style={{ background: "#f8f8f6", borderRadius: 16, padding: "24px 28px", display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#ccc", letterSpacing: "0.1em", flexShrink: 0, paddingTop: 3 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: "#0a0a0a" }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 4. TIPOS */}
          <h2 id="tipos" className="article-h2">Padrões e tipos de calvície masculina</h2>
          <p className="article-p">A calvície masculina segue padrões previsíveis, classificados pela <strong>Escala de Norwood</strong>. Os padrões mais comuns são:</p>
          <ul className="article-ul">
            {[
              { t: "Recuo frontal (entradas)", d: "A linha do cabelo recua nas têmporas, formando um \"M\". Costuma ser o primeiro sinal perceptível." },
              { t: "Afinamento no topo (coroa)", d: "A região do vértice perde densidade antes das laterais. Muitos homens percebem isso em fotos tiradas de cima." },
              { t: "Calvície difusa", d: "Afinamento por toda a cabeça de forma mais uniforme, sem um padrão localizado claro." },
            ].map((item, i) => (
              <li key={i} className="article-li" style={{ flexDirection: "column", gap: 4 }}>
                <strong style={{ fontSize: 15, color: "#0a0a0a" }}>{item.t}</strong>
                <span style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>{item.d}</span>
              </li>
            ))}
          </ul>

          {/* 5. TRATAMENTOS */}
          <h2 id="tratamentos" className="article-h2">Tratamentos com evidência científica</h2>
          <p className="article-p">
            Existem três ativos com eficácia comprovada para calvície androgenética masculina. Dois deles — <strong>Finasterida e Minoxidil</strong> — são aprovados pela FDA e Anvisa. O terceiro, a <strong>Dutasterida</strong>, é usado off-label com crescente suporte científico e resultados superiores em casos específicos.
          </p>

          <div className="treatments-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "24px 0 32px" }}>
            {[
              { name: "Finasterida", type: "Oral · 1mg/dia", desc: "Inibe a enzima 5-alfa-redutase tipo II, bloqueando cerca de 70% da conversão de testosterona em DHT. É o tratamento mais estudado e o padrão-ouro para parar a progressão da calvície. Requer prescrição médica.", note: "Padrão-ouro", dark: true },
              { name: "Minoxidil", type: "Tópico · 5% · 2x/dia", desc: "Estimula diretamente os folículos capilares, prolongando a fase anágena (crescimento) e melhorando o fluxo sanguíneo local. Complementa a ação dos inibidores de DHT com eficácia comprovada.", note: "Estimula crescimento", dark: false },
            ].map((t, i) => (
              <div key={i} style={{ background: t.dark ? "#0a0a0a" : "#f8f8f6", borderRadius: 20, padding: "28px 24px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: t.dark ? "rgba(255,255,255,0.4)" : "#aaa", marginBottom: 6 }}>{t.note}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: t.dark ? "#fff" : "#0a0a0a", marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontSize: 11, color: t.dark ? "rgba(255,255,255,0.5)" : "#bbb", marginBottom: 14 }}>{t.type}</div>
                <div style={{ fontSize: 13, color: t.dark ? "rgba(255,255,255,0.65)" : "#666", lineHeight: 1.7 }}>{t.desc}</div>
              </div>
            ))}
          </div>

          {/* 6. DUTASTERIDA */}
          <h2 id="dutasterida" className="article-h2">Dutasterida: quando a finasterida não é suficiente</h2>
          <p className="article-p">
            A Dutasterida é um inibidor de DHT de segunda geração e, em muitos aspectos, mais potente que a Finasterida. Enquanto a Finasterida bloqueia apenas a isoenzima tipo II da 5-alfa-redutase, a Dutasterida bloqueia <strong>tanto o tipo I quanto o tipo II</strong> — resultando em uma redução de DHT significativamente maior, chegando a 90% ou mais.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "20px 0 28px" }}>
            {[
              { label: "Finasterida", value: "~70%", sub: "de redução de DHT", bg: "#f8f8f6", tc: "#0a0a0a" },
              { label: "Dutasterida", value: "~90%", sub: "de redução de DHT", bg: "#0a0a0a", tc: "#fff" },
            ].map((s, i) => (
              <div key={i} style={{ background: s.bg, borderRadius: 16, padding: "20px", textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: i === 0 ? "#aaa" : "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: i === 0 ? "#0a0a0a" : "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: i === 0 ? "#888" : "rgba(255,255,255,0.45)", marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <h3 className="article-h3">Como a Dutasterida age no organismo</h3>
          <p className="article-p">
            A Dutasterida foi originalmente desenvolvida para tratar hiperplasia prostática benigna, mas estudos clínicos demonstraram sua eficácia superior para a calvície androgenética, especialmente em homens que não responderam adequadamente à Finasterida.
          </p>
          <p className="article-p">
            Por bloquear as duas isoformas da enzima, ela age tanto nos folículos capilares quanto na pele do couro cabeludo, onde a isoenzima tipo I também é ativa. O resultado é uma supressão de DHT mais completa e, em muitos casos, resultados mais expressivos na estabilização e recuperação capilar.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "20px 0 28px" }}>
            {[
              { title: "Para quem é indicada?", desc: "Homens que já usaram Finasterida por 12 meses ou mais sem estabilização da queda, ou aqueles com calvície de progressão rápida e avançada." },
              { title: "Dose e modo de uso", desc: "Geralmente 0,5mg por via oral, uma vez ao dia. Assim como a Finasterida, requer prescrição médica e acompanhamento contínuo." },
              { title: "Tempo para resultados", desc: "Os primeiros sinais de estabilização costumam aparecer entre o 3º e 6º mês. Resultados mais completos são avaliados após 12 meses de uso regular." },
              { title: "Efeitos colaterais", desc: "Perfil semelhante ao da Finasterida — possíveis alterações na libido e função sexual em uma minoria dos usuários. A maioria tolera bem o medicamento. Avaliação médica individual é essencial." },
            ].map((item, i) => (
              <div key={i} style={{ background: "#f8f8f6", borderRadius: 14, padding: "18px 20px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0a0a0a", marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="highlight-box">
            <p>A escolha entre Finasterida e Dutasterida é individual e deve ser feita com orientação médica. Não existe um medicamento "melhor" em abstrato — existe o mais adequado para o seu perfil, histórico e estágio da calvície.</p>
          </div>

          <h3 className="article-h3">O que esperar do tratamento em geral?</h3>
          <p className="article-p">
            O tratamento capilar é uma maratona. Os primeiros resultados — geralmente a estabilização da queda — costumam aparecer entre o 3º e o 6º mês. O crescimento de novos fios, quando acontece, é mais perceptível a partir do 6º mês de uso contínuo.
          </p>
          <p className="article-p">
            Esses tratamentos <strong>controlam a calvície, mas não a curam</strong>. Interromper o uso resulta no retorno da queda dentro de alguns meses. O acompanhamento médico contínuo é parte essencial do protocolo.
          </p>

          {/* 7. QUANDO BUSCAR */}
          <h2 id="quando-buscar" className="article-h2">Quando é o momento certo de agir?</h2>
          <p className="article-p">
            Existe um mito muito comum: esperar para ver se "passa sozinho". Para a calvície androgenética, isso raramente acontece — e cada mês sem tratamento representa perda irreversível de folículos.
          </p>
          <p className="article-p">
            O momento ideal para buscar avaliação é <strong>ao primeiro sinal de queda acima do normal</strong> ou ao perceber qualquer afinamento. Quanto mais cedo o tratamento começa, mais folículos ainda estão ativos e respondem bem aos ativos.
          </p>
          <div className="highlight-box">
            <p>Folículo vivo pode ser tratado. Folículo morto, não. O tratamento mais eficaz é aquele que começa antes da perda irreversível.</p>
          </div>

          {/* CTA FINAL */}
          <div style={{ background: "#f8f8f6", borderRadius: 24, padding: "40px 36px", marginTop: 56, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", marginBottom: 12 }}>Fio Raiz</div>
            <h3 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 14, lineHeight: 1.2 }}>
              Pronto para dar o primeiro passo?
            </h3>
            <p style={{ fontSize: 15, color: "#666", lineHeight: 1.75, maxWidth: 460, margin: "0 auto 28px" }}>
              Responda o questionário em 5 minutos. Um médico analisa seu perfil e prescreve o tratamento adequado — Finasterida, Dutasterida ou Minoxidil — de acordo com a sua situação.
            </p>
            <button className="btn" onClick={() => navigate("/avaliacao")} style={ctaStyle}>
              Iniciar avaliação gratuita
            </button>
            <p style={{ fontSize: 12, color: "#bbb", marginTop: 12 }}>Sem compromisso. Avaliação 100% online.</p>
          </div>
        </article>

        {/* SIDEBAR */}
        <aside className="sidebar" style={{ position: "sticky", top: 88, height: "fit-content" }}>
          <div style={{ background: "#f8f8f6", borderRadius: 16, padding: "24px 20px", marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", marginBottom: 16 }}>Neste artigo</div>
            {SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`} className="toc-link">{s.label}</a>
            ))}
          </div>
          <div style={{ background: "#0a0a0a", borderRadius: 16, padding: "24px 20px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Avaliação gratuita</div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 16 }}>
              5 minutos. Sem videochamada. Prescrição médica online.
            </p>
            <button className="btn" onClick={() => navigate("/avaliacao")}
              style={{ ...ctaStyle, background: "#fff", color: "#0a0a0a", padding: "12px 20px", fontSize: 13, width: "100%", textAlign: "center" }}>
              Começar agora
            </button>
          </div>
        </aside>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0a0a0a", padding: "40px 5% 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <FioLogo color="#fff" size={18} />
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <a href="/" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Início</a>
            <a href="/comunidade" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Comunidade</a>
            <a href="/termo-consentimento" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Consentimento médico</a>
          </div>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.15)" }}>© 2026 Fio Raiz.</span>
        </div>
      </footer>
    </div>
  );
}
