import { useState } from "react";

const SITE_PASSWORD = "fioraiz@mvp";
const STORAGE_KEY = "fioraiz_gate";

function Logo() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <svg width={10} height={22} viewBox="0 0 16 35" fill="none">
        <ellipse cx="8" cy="4" rx="4" ry="4" fill="#fff" opacity="0.9"/>
        <path d="M8 8 C7 12 9 15 8 19 C7 23 9 27 8 31 C7.5 33 8 34 8 35"
          stroke="#fff" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      </svg>
      <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:700,
        color:"#fff", letterSpacing:"0.05em" }}>
        fio<span style={{ opacity:0.4 }}>raiz</span>
      </span>
    </div>
  );
}

export function isUnlocked() {
  try { return sessionStorage.getItem(STORAGE_KEY) === "1"; } catch { return false; }
}

export default function SiteGate({ children }) {
  const [unlocked, setUnlocked] = useState(isUnlocked);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (password === SITE_PASSWORD) {
      try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setPassword("");
      setTimeout(() => setShake(false), 500);
    }
  }

  if (unlocked) return children;

  return (
    <div style={{
      minHeight:"100vh", background:"#0a0a0a",
      fontFamily:"'Outfit',sans-serif",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      padding:"24px 20px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%,60%  { transform: translateX(-6px); }
          40%,80%  { transform: translateX(6px); }
        }
        .gate-shake { animation: shake 0.4s ease; }
      `}</style>

      {/* Logo */}
      <div style={{ marginBottom:40 }}><Logo /></div>

      {/* Card */}
      <div className={shake ? "gate-shake" : ""} style={{
        background:"#161616", border:"1px solid #2a2a2a",
        borderRadius:20, padding:"36px 28px", width:"100%", maxWidth:380,
      }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.16em",
            textTransform:"uppercase", color:"#555", marginBottom:12 }}>
            Acesso restrito
          </div>
          <h1 style={{ fontSize:22, fontWeight:800, color:"#fff",
            letterSpacing:"-0.02em", lineHeight:1.2, marginBottom:8 }}>
            Site em construção
          </h1>
          <p style={{ fontSize:13, color:"#666", lineHeight:1.6 }}>
            Esta plataforma ainda não está disponível ao público.
            Insira a senha para continuar.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom:14 }}>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false); }}
              placeholder="Senha de acesso"
              autoFocus
              style={{
                width:"100%", padding:"14px 16px",
                background:"#0a0a0a",
                border:`1.5px solid ${error ? "#ef4444" : "#2a2a2a"}`,
                borderRadius:12, fontSize:15, color:"#fff",
                fontFamily:"'Outfit',sans-serif", outline:"none",
                transition:"border 0.2s",
              }}
              onFocus={e => { if (!error) e.target.style.borderColor="#444"; }}
              onBlur={e => { if (!error) e.target.style.borderColor="#2a2a2a"; }}
            />
            {error && (
              <div style={{ fontSize:12, color:"#f87171", marginTop:6, paddingLeft:4 }}>
                Senha incorreta. Tente novamente.
              </div>
            )}
          </div>

          <button type="submit" style={{
            width:"100%", background:"#fff", color:"#0a0a0a",
            border:"none", borderRadius:100, padding:"15px",
            fontSize:14, fontWeight:700, cursor:"pointer",
            fontFamily:"'Outfit',sans-serif", letterSpacing:"0.02em",
            transition:"opacity 0.2s",
          }}
            onMouseEnter={e => e.target.style.opacity="0.9"}
            onMouseLeave={e => e.target.style.opacity="1"}
          >
            Entrar →
          </button>
        </form>
      </div>

      <p style={{ marginTop:28, fontSize:11, color:"#333", textAlign:"center" }}>
        fioraiz.com.br · MVP privado
      </p>
    </div>
  );
}
