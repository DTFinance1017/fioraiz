import { useState, useEffect } from "react";

const STORAGE_KEY = "fioraiz_cookie_consent";

export function getCookieConsent() {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    const consent = getCookieConsent();
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function fechar(tipo) {
    setSaindo(true);
    try { localStorage.setItem(STORAGE_KEY, tipo); } catch {}
    setTimeout(() => setVisible(false), 380);
  }

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(0);    opacity: 1; }
          to   { transform: translateY(100%); opacity: 0; }
        }
        .cookie-banner {
          animation: slideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .cookie-banner.saindo {
          animation: slideDown 0.35s ease-in forwards;
        }
      `}</style>

      <div
        className={`cookie-banner${saindo ? " saindo" : ""}`}
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999,
          background: "#0f1923",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "20px 24px",
          fontFamily: "'Outfit', sans-serif",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <div style={{
          maxWidth: 900, margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          gap: 20, flexWrap: "wrap",
        }}>
          {/* Texto */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 18 }}>🍪</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                Usamos cookies
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
              Utilizamos cookies essenciais para o funcionamento da plataforma e cookies de
              desempenho para melhorar sua experiência — incluindo ofertas personalizadas.
              Ao aceitar, você concorda com nossa{" "}
              <a
                href="/politica-privacidade"
                style={{ color: "#60a5fa", textDecoration: "underline" }}
              >
                Política de Privacidade
              </a>
              {" "}(LGPD).
            </p>
          </div>

          {/* Botões */}
          <div style={{ display: "flex", gap: 10, flexShrink: 0, flexWrap: "wrap" }}>
            <button
              onClick={() => fechar("recusado")}
              style={{
                padding: "10px 20px", borderRadius: 8,
                border: "1.5px solid rgba(255,255,255,0.15)",
                background: "transparent", color: "rgba(255,255,255,0.5)",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => e.target.style.borderColor = "rgba(255,255,255,0.35)"}
              onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
            >
              Recusar
            </button>
            <button
              onClick={() => fechar("aceito")}
              style={{
                padding: "10px 24px", borderRadius: 8,
                border: "none", background: "#fff",
                color: "#0f1923", fontSize: 13, fontWeight: 700,
                cursor: "pointer", fontFamily: "'Outfit', sans-serif",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => e.target.style.opacity = "0.9"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >
              Aceitar cookies
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
