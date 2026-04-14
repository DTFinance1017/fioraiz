import { useState } from "react";

function FioRaizLogo({ variant = "dark", size = 200 }) {
  const isDark = variant === "dark";
  const bg = isDark ? "#0a0a0a" : "#fff";
  const fg = isDark ? "#fff" : "#0a0a0a";
  const fgSub = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)";

  const scale = size / 200;

  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="200" height="120" fill={bg}/>

      {/* ── SÍMBOLO: Bulbo + fio + raízes ── */}
      {/* Raízes */}
      <path d="M100 78 C94 82 88 86 82 92" stroke={fg} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M100 78 C97 84 95 89 93 96" stroke={fg} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <path d="M100 78 C100 84 100 89 100 97" stroke={fg} strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>
      <path d="M100 78 C103 84 105 89 107 96" stroke={fg} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <path d="M100 78 C106 82 112 86 118 92" stroke={fg} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      {/* Raízes menores */}
      <path d="M82 92 C78 94 75 97 72 99" stroke={fg} strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>
      <path d="M118 92 C122 94 125 97 128 99" stroke={fg} strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>
      <path d="M93 96 C90 98 87 101 85 103" stroke={fg} strokeWidth="0.8" strokeLinecap="round" opacity="0.25"/>
      <path d="M107 96 C110 98 113 101 115 103" stroke={fg} strokeWidth="0.8" strokeLinecap="round" opacity="0.25"/>

      {/* Bulbo */}
      <ellipse cx="100" cy="70" rx="7" ry="9" fill={fg} opacity="0.12"/>
      <ellipse cx="100" cy="70" rx="4.5" ry="5.5" fill={fg} opacity="0.25"/>
      <ellipse cx="100" cy="70" rx="2.5" ry="3" fill={fg} opacity="0.7"/>

      {/* Fio principal */}
      <path
        d="M100 61 C99 52 101 44 99 35 C97 26 100 18 99 10"
        stroke={fg}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />

      {/* ── TEXTO ── */}
      {/* FIO */}
      <text
        x="52"
        y="76"
        fontFamily="'Georgia', 'Times New Roman', serif"
        fontSize="26"
        fontWeight="700"
        fill={fg}
        letterSpacing="4"
        textAnchor="end"
      >FIO</text>

      {/* RAIZ */}
      <text
        x="149"
        y="76"
        fontFamily="'Georgia', 'Times New Roman', serif"
        fontSize="26"
        fontWeight="700"
        fill={fg}
        letterSpacing="2"
        textAnchor="start"
      >RAIZ</text>

      {/* Tagline */}
      <text
        x="100"
        y="90"
        fontFamily="'Georgia', serif"
        fontSize="6.5"
        fill={fgSub}
        letterSpacing="3.5"
        textAnchor="middle"
      >TRATAMENTO CAPILAR</text>
    </svg>
  );
}

// Versão ícone (só o símbolo)
function FioRaizIcon({ variant = "dark", size = 60 }) {
  const isDark = variant === "dark";
  const bg = isDark ? "#0a0a0a" : "#fff";
  const fg = isDark ? "#fff" : "#0a0a0a";

  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" fill={bg} rx="12"/>
      {/* Raízes */}
      <path d="M30 42 C27 45 24 47 21 50" stroke={fg} strokeWidth="0.9" strokeLinecap="round" opacity="0.45"/>
      <path d="M30 42 C29 46 28 49 28 53" stroke={fg} strokeWidth="1" strokeLinecap="round" opacity="0.55"/>
      <path d="M30 42 C30 46 30 49 30 53" stroke={fg} strokeWidth="1.1" strokeLinecap="round" opacity="0.65"/>
      <path d="M30 42 C31 46 32 49 32 53" stroke={fg} strokeWidth="1" strokeLinecap="round" opacity="0.55"/>
      <path d="M30 42 C33 45 36 47 39 50" stroke={fg} strokeWidth="0.9" strokeLinecap="round" opacity="0.45"/>
      {/* Bulbo */}
      <ellipse cx="30" cy="38" rx="5" ry="5.5" fill={fg} opacity="0.1"/>
      <ellipse cx="30" cy="38" rx="3" ry="3.5" fill={fg} opacity="0.25"/>
      <ellipse cx="30" cy="38" rx="1.6" ry="2" fill={fg} opacity="0.8"/>
      {/* Fio */}
      <path d="M30 32 C29.2 26 30.5 20 29.5 14 C28.8 9 30 6 30 6" stroke={fg} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export default function LogoShowcase() {
  const [downloading, setDownloading] = useState(false);

  function downloadSVG(id, filename) {
    const svg = document.getElementById(id);
    if (!svg) return;
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  const s = {
    wrap: { minHeight: "100vh", background: "#F0EFEC", fontFamily: "'Outfit',sans-serif", padding: "0 0 40px" },
    header: { background: "#0a0a0a", padding: "20px 20px 16px" },
    body: { padding: "20px 16px" },
    card: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", padding: 24, marginBottom: 12, borderRadius: 8 },
    label: { fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", marginBottom: 12 },
    btn: { background: "#0a0a0a", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 100, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", cursor: "pointer", fontFamily: "'Outfit',sans-serif" },
    btnGhost: { background: "transparent", color: "#0a0a0a", border: "1px solid rgba(0,0,0,0.2)", padding: "10px 20px", borderRadius: 100, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", cursor: "pointer", fontFamily: "'Outfit',sans-serif" },
  };

  return (
    <div style={s.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap');`}</style>

      <div style={s.header}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 4 }}>Identidade Visual</div>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>Fio Raiz — Logo SVG</div>
      </div>

      <div style={s.body}>

        {/* Logo horizontal dark */}
        <div style={s.card}>
          <div style={s.label}>Versão principal — fundo escuro</div>
          <div style={{ background: "#0a0a0a", borderRadius: 8, padding: "32px 20px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <FioRaizLogo variant="dark" size={220} />
          </div>
          <button style={s.btn} onClick={() => downloadSVG("logo-dark", "fioraiz-logo-dark.svg")}>
            Baixar SVG
          </button>
        </div>

        {/* Logo horizontal light */}
        <div style={s.card}>
          <div style={s.label}>Versão principal — fundo claro</div>
          <div style={{ background: "#fff", borderRadius: 8, padding: "32px 20px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(0,0,0,0.06)", marginBottom: 16 }}>
            <FioRaizLogo variant="light" size={220} />
          </div>
          <button style={s.btnGhost} onClick={() => downloadSVG("logo-light", "fioraiz-logo-light.svg")}>
            Baixar SVG
          </button>
        </div>

        {/* Ícones */}
        <div style={s.card}>
          <div style={s.label}>Ícone — versões quadradas</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <FioRaizIcon variant="dark" size={80} />
              <span style={{ fontSize: 10, color: "#aaa" }}>Dark 80px</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <FioRaizIcon variant="dark" size={60} />
              <span style={{ fontSize: 10, color: "#aaa" }}>Dark 60px</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <FioRaizIcon variant="dark" size={40} />
              <span style={{ fontSize: 10, color: "#aaa" }}>Dark 40px</span>
            </div>
            <div style={{ background: "#0a0a0a", borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <FioRaizIcon variant="light" size={60} />
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Light 60px</span>
            </div>
          </div>
        </div>

        {/* Uso na caixinha */}
        <div style={s.card}>
          <div style={s.label}>Preview — caixinha</div>
          <div style={{ background: "#0a0a0a", borderRadius: 8, padding: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 140, height: 200, background: "#111", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "28px 16px 20px", borderRadius: 4 }}>
              <FioRaizLogo variant="dark" size={110} />
              <div style={{ width: 30, height: 1, background: "rgba(255,255,255,0.15)" }}/>
              <div style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textAlign: "center" }}>
                fioraiz.com.br
              </div>
            </div>
          </div>
        </div>

        {/* Preview nav */}
        <div style={s.card}>
          <div style={s.label}>Preview — navbar do site</div>
          <div style={{ background: "#fff", borderRadius: 8, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid rgba(0,0,0,0.06)", marginBottom: 12 }}>
            <FioRaizLogo variant="light" size={100} />
            <div style={{ fontSize: 12, color: "#888" }}>Avaliação gratuita →</div>
          </div>
          <div style={{ background: "#0a0a0a", borderRadius: 8, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <FioRaizLogo variant="dark" size={100} />
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Avaliação gratuita →</div>
          </div>
        </div>

        {/* Cores */}
        <div style={s.card}>
          <div style={s.label}>Paleta de cores</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { nome: "Preto", hex: "#0A0A0A", bg: "#0a0a0a", tc: "#fff" },
              { nome: "Branco", hex: "#FFFFFF", bg: "#fff", tc: "#111", border: "1px solid rgba(0,0,0,0.08)" },
              { nome: "Off-white", hex: "#F0EFEC", bg: "#F0EFEC", tc: "#111" },
              { nome: "Cinza", hex: "#888888", bg: "#888", tc: "#fff" },
            ].map((c, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ height: 48, background: c.bg, borderRadius: 6, marginBottom: 6, border: c.border }}/>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#333" }}>{c.nome}</div>
                <div style={{ fontSize: 10, color: "#aaa" }}>{c.hex}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Instrução para vetorizar */}
        <div style={{ background: "#0a0a0a", borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
            Como usar este logo
          </div>
          {[
            "Clica em 'Baixar SVG' — abre o arquivo diretamente",
            "SVG funciona em qualquer tamanho sem perder qualidade",
            "Para a gráfica: abre no Figma ou Illustrator e converte texto em curvas",
            "Para o site: já está integrado no código como componente React",
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <span style={{ color: "#4ade80", fontSize: 11, flexShrink: 0 }}>{i+1}.</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
