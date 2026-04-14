import { useState } from "react";

// SVG do fio de cabelo
function FioSVG({ size = 24, color = "#fff" }) {
  return (
    <svg width={size * 0.5} height={size * 1.15} viewBox="0 0 16 37" fill="none">
      <ellipse cx="8" cy="4" rx="4.5" ry="4" fill={color} opacity="0.9"/>
      <ellipse cx="8" cy="4" rx="2.5" ry="2.2" fill={color} opacity="0.6"/>
      <circle cx="8" cy="4" r="1.2" fill={color}/>
      <path d="M8 8 C6.5 13 9.5 17 8 22 C6.5 27 9.5 31 8 35 C7.5 36 8 37 8 37"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

const FACES = [
  { id: "frente", label: "Frente", w: 80, h: 120 },
  { id: "verso", label: "Verso", w: 80, h: 120 },
  { id: "lateral1", label: "Lateral", w: 40, h: 120 },
  { id: "lateral2", label: "Lateral", w: 40, h: 120 },
  { id: "topo", label: "Topo", w: 80, h: 40 },
  { id: "fundo", label: "Fundo", w: 80, h: 40 },
];

export default function BoxDesign() {
  const [activeView, setActiveView] = useState("3d");

  const s = {
    wrap: { minHeight: "100vh", background: "#111", fontFamily: "'Outfit',sans-serif", color: "#fff", padding: 0 },
    header: { padding: "24px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" },
    title: { fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 6 },
    tab: (active) => ({
      padding: "8px 16px", border: `1px solid ${active ? "#fff" : "rgba(255,255,255,0.15)"}`,
      background: active ? "#fff" : "transparent",
      color: active ? "#111" : "rgba(255,255,255,0.5)",
      fontSize: 11, fontWeight: 600, cursor: "pointer",
      fontFamily: "'Outfit',sans-serif", letterSpacing: "0.08em",
      textTransform: "uppercase", borderRadius: 100, transition: "all 0.2s"
    }),
  };

  return (
    <div style={s.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&family=Cormorant+Garamond:wght@400;700&display=swap');`}</style>

      {/* Header */}
      <div style={s.header}>
        <div style={s.title}>Fio Raiz · Embalagem</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700 }}>
            Caixinha — Layout para Gráfica
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["3d", "diagramacao", "specs"].map(v => (
              <button key={v} style={s.tab(activeView === v)} onClick={() => setActiveView(v)}>
                {v === "3d" ? "Preview 3D" : v === "diagramacao" ? "Diagramação" : "Especificações"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VIEW: 3D Preview */}
      {activeView === "3d" && (
        <div style={{ padding: 24 }}>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start", justifyContent: "center" }}>

            {/* Caixa 3D simulada em CSS */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Simulação visual
              </div>

              {/* Box 3D */}
              <div style={{ position: "relative", width: 200, height: 280, perspective: 800 }}>
                <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}>

                  {/* FACE FRENTE */}
                  <div style={{
                    position: "absolute", width: 180, height: 260,
                    background: "#0a0a0a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "space-between",
                    padding: "28px 24px 24px",
                    boxShadow: "4px 4px 0 rgba(255,255,255,0.04), 8px 8px 0 rgba(255,255,255,0.02)"
                  }}>
                    {/* Subtle texture */}
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "20px 20px" }}/>

                    {/* Top area */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, position: "relative" }}>
                      <FioSVG size={36} color="#fff" />
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: "0.12em", color: "#fff", lineHeight: 1 }}>
                          FIO
                        </div>
                        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 400, letterSpacing: "0.3em", color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
                          RAIZ
                        </div>
                      </div>
                    </div>

                    {/* Center line decoration */}
                    <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.15)" }}/>

                    {/* Bottom area */}
                    <div style={{ textAlign: "center", position: "relative" }}>
                      <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>
                        Tratamento capilar
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>
                        fioraiz.com.br
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lateral preview */}
              <div style={{ display: "flex", gap: 12 }}>
                {/* Lateral */}
                <div style={{ width: 80, height: 260, background: "#141414", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
                    FIO RAIZ
                  </div>
                  <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.08)" }}/>
                  <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
                    fioraiz.com.br
                  </div>
                </div>

                {/* Verso */}
                <div style={{ width: 180, height: 260, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", padding: "24px 20px", gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>
                      Fórmula manipulada
                    </div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                      Uso sob prescrição médica<br/>
                      Manter fora do alcance<br/>
                      de crianças
                    </div>
                  </div>
                  <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)" }}/>
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>
                      Farmácia parceira
                    </div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", lineHeight: 1.8 }}>
                      Certificada pela ANVISA<br/>
                      Manipulação sob encomenda
                    </div>
                  </div>
                  <div style={{ marginTop: "auto" }}>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", lineHeight: 1.7 }}>
                      Fio Raiz Tecnologia Ltda<br/>
                      fioraiz.com.br<br/>
                      contato@fioraiz.com.br
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specs ao lado */}
            <div style={{ flex: 1, minWidth: 260, maxWidth: 340 }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
                Dimensões recomendadas
              </div>

              {[
                { name: "Caixinha pequena", dim: "8 × 4 × 12 cm", uso: "Finasterida (30 caps) ou Minoxidil (60ml)", rec: true },
                { name: "Caixinha média", dim: "10 × 6 × 14 cm", uso: "Kit completo (finasterida + minoxidil)", rec: false },
              ].map((box, i) => (
                <div key={i} style={{ background: box.rec ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${box.rec ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`, padding: "16px", marginBottom: 10, borderRadius: 4 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{box.name}</span>
                    {box.rec && <span style={{ fontSize: 9, background: "#fff", color: "#111", padding: "2px 8px", borderRadius: 100, fontWeight: 700, letterSpacing: "0.08em" }}>RECOMENDADA</span>}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>{box.dim}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{box.uso}</div>
                </div>
              ))}

              <div style={{ marginTop: 20, fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
                Material
              </div>
              {[
                ["Papelão", "300g/m² duplex", "Boa resistência, custo baixo"],
                ["Kraft preto", "350g/m² triplex", "Visual premium, mais caro"],
              ].map(([tipo, gram, desc], i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{tipo} <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>{gram}</span></div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{desc}</div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: 16, borderRadius: 4 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                  Custo estimado
                </div>
                {[
                  ["100 unidades", "R$ 280–400", "R$ 2,80–4,00/un"],
                  ["300 unidades", "R$ 600–900", "R$ 2,00–3,00/un"],
                  ["500 unidades", "R$ 800–1.200", "R$ 1,60–2,40/un"],
                ].map(([qtd, total, unit], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{qtd}</span>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{total}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{unit}</div>
                    </div>
                  </div>
                ))}
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 12, lineHeight: 1.6 }}>
                  Comece com 100 unidades. Peça mínimo comum em gráficas.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: Diagramação */}
      {activeView === "diagramacao" && (
        <div style={{ padding: 24 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
            Diagramação — enviar para gráfica (formato planificado)
          </div>

          {/* Planificação */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: 24, marginBottom: 20, overflowX: "auto" }}>
            <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 0 }}>

              {/* Topo */}
              <div style={{ width: 160, height: 60, background: "#1a1a1a", border: "1px dashed rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>TOPO</div>
                  <FioSVG size={14} color="rgba(255,255,255,0.4)" />
                </div>
              </div>

              {/* Faixa do meio */}
              <div style={{ display: "flex", gap: 0 }}>
                {/* Lateral esq */}
                <div style={{ width: 80, height: 220, background: "#141414", border: "1px dashed rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    LATERAL · FIO RAIZ
                  </div>
                </div>

                {/* FRENTE */}
                <div style={{ width: 160, height: 220, background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "20px 16px 16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <FioSVG size={28} color="#fff" />
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "0.12em", color: "#fff", lineHeight: 1 }}>FIO</div>
                      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 400, letterSpacing: "0.3em", color: "rgba(255,255,255,0.35)" }}>RAIZ</div>
                    </div>
                  </div>
                  <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.15)" }}/>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 7, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Tratamento capilar</div>
                    <div style={{ fontSize: 8, color: "rgba(255,255,255,0.4)" }}>fioraiz.com.br</div>
                  </div>
                </div>

                {/* Lateral dir */}
                <div style={{ width: 80, height: 220, background: "#141414", border: "1px dashed rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ writingMode: "vertical-rl", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    LATERAL · FIO RAIZ
                  </div>
                </div>

                {/* VERSO */}
                <div style={{ width: 160, height: 220, background: "#0d0d0d", border: "1px dashed rgba(255,255,255,0.15)", display: "flex", flexDirection: "column", padding: "16px 14px", gap: 10 }}>
                  <div style={{ fontSize: 7, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 2 }}>VERSO</div>
                  <div style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>
                    Fórmula manipulada<br/>
                    Uso sob prescrição médica<br/>
                    Manter longe de crianças<br/>
                    Conservar em local fresco<br/>
                    e seco, abaixo de 25°C
                  </div>
                  <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)" }}/>
                  <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", lineHeight: 1.7 }}>
                    Farmácia parceira<br/>
                    Certificada ANVISA
                  </div>
                  <div style={{ marginTop: "auto", fontSize: 7, color: "rgba(255,255,255,0.2)", lineHeight: 1.7 }}>
                    Fio Raiz Tecnologia Ltda<br/>
                    fioraiz.com.br
                  </div>
                </div>
              </div>

              {/* Fundo */}
              <div style={{ width: 160, height: 60, background: "#1a1a1a", border: "1px dashed rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>FUNDO</div>
                  <div style={{ fontSize: 7, color: "rgba(255,255,255,0.2)", marginTop: 3 }}>Lote / Validade</div>
                </div>
              </div>
            </div>
          </div>

          {/* Legenda */}
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              { cor: "rgba(255,255,255,0.2)", tipo: "linha sólida", desc: "Face principal (frente)" },
              { cor: "rgba(255,255,255,0.08)", tipo: "linha tracejada", desc: "Faces secundárias" },
            ].map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                <div style={{ width: 20, height: 1, background: l.cor, borderTop: l.tipo.includes("tracej") ? "1px dashed" : "1px solid", borderColor: l.cor }}/>
                {l.desc}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: Specs */}
      {activeView === "specs" && (
        <div style={{ padding: 24 }}>

          {/* O que enviar para a gráfica */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: 20, marginBottom: 16, borderRadius: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
              O que enviar para a gráfica
            </div>
            {[
              ["Arquivo", "PDF ou AI vetorizado · CMYK · 300 DPI"],
              ["Dimensões", "Planificado (todas as faces abertas em uma folha)"],
              ["Sangria", "3mm em todos os lados"],
              ["Fonte", "Convertida em curvas (outline)"],
              ["Cor de fundo", "Preto 100% CMYK (C0 M0 Y0 K100) ou 4x preto (C60 M40 Y40 K100)"],
              ["Acabamento", "Verniz localizado no logo · Caixa com vinco e cola"],
            ].map(([k, v], i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", minWidth: 90, flexShrink: 0 }}>{k}</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Conteúdo por face */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: 20, marginBottom: 16, borderRadius: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
              Conteúdo por face
            </div>
            {[
              { face: "Frente", conteudo: "Logo Fio Raiz (símbolo + FIO RAIZ) · Tagline 'Tratamento capilar' · URL fioraiz.com.br" },
              { face: "Verso", conteudo: "Instruções de uso · Aviso de prescrição médica · ANVISA · Contato · Endereço Fio Raiz" },
              { face: "Laterais", conteudo: "FIO RAIZ vertical · fioraiz.com.br" },
              { face: "Topo", conteudo: "Logo pequeno · Espaço para etiqueta de lote" },
              { face: "Fundo", conteudo: "Lote · Data de validade · Código de barras (opcional)" },
            ].map((f, i) => (
              <div key={i} style={{ padding: "12px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{f.face}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{f.conteudo}</div>
              </div>
            ))}
          </div>

          {/* Gráficas recomendadas */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: 20, borderRadius: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
              Onde cotar
            </div>
            {[
              { nome: "Embalando.com.br", tipo: "Online · Nacional", nota: "Especialista em caixinhas. Mais barato em volume." },
              { nome: "Printi.com.br", tipo: "Online · Nacional", nota: "Boa qualidade, entrega rápida." },
              { nome: "Gráfica local SP/Americana", tipo: "Presencial", nota: "Mais rápido para ajustes. Peça orçamento com sua arte." },
              { nome: "Packly.com", tipo: "Internacional", nota: "Mockup 3D gratuito online antes de produzir." },
            ].map((g, i) => (
              <div key={i} style={{ padding: "12px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{g.nome}</span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{g.tipo}</span>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{g.nota}</div>
              </div>
            ))}
          </div>

          {/* Próximo passo */}
          <div style={{ background: "#fff", padding: 20, marginTop: 16, borderRadius: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#111", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
              Próximo passo
            </div>
            <p style={{ fontSize: 13, color: "#444", lineHeight: 1.7, marginBottom: 12 }}>
              Acesse <strong>packly.com</strong> — é gratuito. Insira as dimensões (8×4×12 cm), faça o mockup 3D com as cores preto + logo branco, e já vê como vai ficar antes de pagar qualquer gráfica.
            </p>
            <p style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>
              Depois cota em <strong>embalando.com.br</strong> com a arte finalizada. Pedido mínimo de 100 unidades. Prazo médio: 7–10 dias úteis.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
