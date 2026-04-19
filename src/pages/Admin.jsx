import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_USER = "admfioraiz";
const ADMIN_PASS = "171921*";
const STORAGE_KEY = "fioraiz_leads";

function FioLogo({ clickable = true }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={clickable ? () => navigate("/") : undefined}
      style={{ display:"flex", alignItems:"center",
        cursor: clickable ? "pointer" : "default",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent" }}
      role={clickable ? "link" : undefined}
      aria-label={clickable ? "Voltar para a home" : undefined}>
      <img src="/logo-v2.png" alt="Fio Raiz" style={{ height: 52, width: "auto", display: "block" }} />
    </div>
  );
}

function Badge({ text, color="#EDF5F8", tc="#333" }) {
  return (
    <span style={{ background:color, color:tc, fontSize:10, fontWeight:700, padding:"3px 10px",
      borderRadius:100, letterSpacing:"0.06em", textTransform:"uppercase" }}>{text}</span>
  );
}

export default function Admin() {
  const [authed, setAuthed]   = useState(false);
  const [user,   setUser]     = useState("");
  const [pass,   setPass]     = useState("");
  const [error,  setError]    = useState("");
  const [leads,  setLeads]    = useState([]);
  const [detail, setDetail]   = useState(null); // lead selecionado para ver detalhes

  function login(e) {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setAuthed(true);
    } else {
      setError("Login ou senha incorretos.");
    }
  }

  useEffect(() => {
    if (!authed) return;
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setLeads([...data].reverse());
    } catch { setLeads([]); }
  }, [authed]);

  function exportCSV() {
    if (!leads.length) return;
    const headers = [
      "Data/Hora","Nome","Email","WhatsApp",
      "Tipo de cabelo","Como a queda acontece","Couro cabeludo",
      "Histórico familiar","Objetivo","Sinais no couro",
      "Tratamento anterior","Condições de saúde","Medicamento preferido"
    ];
    const rows = leads.map(l => [
      l.timestamp || "",
      l.nome || "",
      l.email || "",
      l.whatsapp || "",
      l.answers?.hairType || "",
      l.answers?.hairLoss || "",
      l.answers?.hairTexture || "",
      l.answers?.family || "",
      l.answers?.goal || "",
      l.answers?.scalp || "",
      l.answers?.prevTreatment || "",
      (l.answers?.conditions || []).join("; "),
      l.answers?.medication || "",
    ]);
    const csv = [headers, ...rows]
      .map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type:"text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fioraiz_leads_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function deleteLead(id) {
    if (!window.confirm("Remover este lead?")) return;
    const updated = leads.filter(l => l.id !== id);
    setLeads(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...updated].reverse()));
    if (detail?.id === id) setDetail(null);
  }

  const font = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Outfit',sans-serif;}`;

  /* ── LOGIN ── */
  if (!authed) return (
    <div style={{ minHeight:"100vh", background:"#F0F7FA", display:"flex", alignItems:"center",
      justifyContent:"center", fontFamily:"'Outfit',sans-serif", padding:20 }}>
      <style>{font}</style>
      <div style={{ background:"#fff", borderRadius:20, padding:"40px 36px", width:"100%", maxWidth:380,
        boxShadow:"0 8px 48px rgba(0,0,0,0.08)", border:"1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ marginBottom:28 }}><FioLogo /></div>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase",
          color:"#888", marginBottom:8 }}>Acesso restrito</div>
        <h1 style={{ fontSize:24, fontWeight:800, letterSpacing:"-0.02em", marginBottom:28 }}>
          Painel de leads
        </h1>
        <form onSubmit={login} style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div>
            <label style={{ fontSize:12, fontWeight:600, color:"#555", display:"block", marginBottom:6 }}>Login</label>
            <input value={user} onChange={e => setUser(e.target.value)} autoComplete="username"
              placeholder="admfioraiz"
              style={{ width:"100%", padding:"12px 14px", border:"1.5px solid rgba(0,0,0,0.12)",
                borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", outline:"none" }} />
          </div>
          <div>
            <label style={{ fontSize:12, fontWeight:600, color:"#555", display:"block", marginBottom:6 }}>Senha</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} autoComplete="current-password"
              placeholder="••••••••"
              style={{ width:"100%", padding:"12px 14px", border:"1.5px solid rgba(0,0,0,0.12)",
                borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", outline:"none" }} />
          </div>
          {error && <div style={{ fontSize:13, color:"#e53e3e", fontWeight:500 }}>{error}</div>}
          <button type="submit" style={{ background:"#004358", color:"#fff", border:"none", borderRadius:100,
            padding:"14px", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif",
            marginTop:8, transition:"opacity 0.2s" }}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );

  /* ── DETAIL MODAL ── */
  if (detail) return (
    <div style={{ minHeight:"100vh", background:"#F0F7FA", fontFamily:"'Outfit',sans-serif", padding:"32px 5%" }}>
      <style>{font}</style>
      <button onClick={() => setDetail(null)} style={{ background:"none", border:"none", cursor:"pointer",
        fontSize:13, color:"#888", marginBottom:24, display:"flex", alignItems:"center", gap:6 }}>
        ← Voltar para a lista
      </button>

      <div style={{ maxWidth:680, margin:"0 auto" }}>
        <div style={{ background:"#fff", borderRadius:20, padding:"28px 32px", border:"1px solid rgba(0,0,0,0.06)", marginBottom:16 }}>
          <div style={{ fontSize:11, color:"#aaa", marginBottom:4 }}>{detail.timestamp}</div>
          <h2 style={{ fontSize:26, fontWeight:800, letterSpacing:"-0.02em", marginBottom:4 }}>{detail.nome || "—"}</h2>
          <div style={{ display:"flex", gap:16, flexWrap:"wrap", fontSize:13, color:"#666" }}>
            <span>✉ {detail.email || "—"}</span>
            <span>📱 {detail.whatsapp || "—"}</span>
          </div>
        </div>

        <div style={{ background:"#fff", borderRadius:20, padding:"28px 32px", border:"1px solid rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize:14, fontWeight:700, marginBottom:20, letterSpacing:"-0.01em" }}>Respostas do questionário</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[
              ["Tipo de calvície",       detail.answers?.hairType],
              ["Como a queda acontece", detail.answers?.hairLoss],
              ["Couro cabeludo",         detail.answers?.hairTexture],
              ["Histórico familiar",     detail.answers?.family],
              ["Objetivo",               detail.answers?.goal],
              ["Sinais no couro",        detail.answers?.scalp],
              ["Tratamento anterior",    detail.answers?.prevTreatment],
              ["Condições de saúde",     (detail.answers?.conditions || []).join(", ") || "—"],
              ["Medicamento preferido",  detail.answers?.medication],
            ].map(([label, val]) => (
              <div key={label} style={{ display:"flex", gap:12, padding:"10px 0",
                borderBottom:"1px solid rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize:12, color:"#aaa", minWidth:180, fontWeight:500 }}>{label}</div>
                <div style={{ fontSize:13, color:"#1A3040", fontWeight:600 }}>{val || "—"}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop:16, display:"flex", gap:10 }}>
          <a href={`https://wa.me/55${(detail.whatsapp||"").replace(/\D/g,"")}`} target="_blank" rel="noreferrer"
            style={{ background:"#25D366", color:"#fff", borderRadius:100, padding:"12px 24px",
              fontSize:13, fontWeight:700, textDecoration:"none", display:"inline-block" }}>
            Abrir WhatsApp
          </a>
          <a href={`mailto:${detail.email}`}
            style={{ background:"#004358", color:"#fff", borderRadius:100, padding:"12px 24px",
              fontSize:13, fontWeight:700, textDecoration:"none", display:"inline-block" }}>
            Enviar e-mail
          </a>
          <button onClick={() => deleteLead(detail.id)}
            style={{ background:"#fee2e2", color:"#b91c1c", border:"none", borderRadius:100,
              padding:"12px 20px", fontSize:13, fontWeight:700, cursor:"pointer" }}>
            Remover lead
          </button>
        </div>
      </div>
    </div>
  );

  /* ── PAINEL ── */
  return (
    <div style={{ minHeight:"100vh", background:"#F0F7FA", fontFamily:"'Outfit',sans-serif" }}>
      <style>{font}</style>

      {/* nav */}
      <div style={{ background:"#fff", borderBottom:"1px solid rgba(0,0,0,0.07)",
        padding:"14px 5%", display:"flex", justifyContent:"space-between", alignItems:"center",
        position:"sticky", top:0, zIndex:100 }}>
        <FioLogo />
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <span style={{ fontSize:12, color:"#aaa" }}>Painel · {ADMIN_USER}</span>
          <button onClick={exportCSV}
            style={{ background:"#004358", color:"#fff", border:"none", borderRadius:100,
              padding:"9px 20px", fontSize:12, fontWeight:600, cursor:"pointer",
              fontFamily:"'Outfit',sans-serif" }}>
            Exportar CSV
          </button>
          <button onClick={() => setAuthed(false)}
            style={{ background:"#EDF5F8", color:"#333", border:"none", borderRadius:100,
              padding:"9px 16px", fontSize:12, fontWeight:600, cursor:"pointer",
              fontFamily:"'Outfit',sans-serif" }}>
            Sair
          </button>
        </div>
      </div>

      <div style={{ padding:"40px 5%", maxWidth:1100, margin:"0 auto" }}>

        {/* stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:32 }}>
          {[
            { label:"Total de leads", value: leads.length },
            { label:"Hoje", value: leads.filter(l => l.timestamp?.startsWith(new Date().toLocaleDateString("pt-BR"))).length },
            { label:"Últimos 7 dias", value: leads.filter(l => {
                try {
                  const [d,m,y] = (l.timestamp||"").split(", ")[0].split("/");
                  const date = new Date(+y, +m-1, +d);
                  return (Date.now() - date.getTime()) < 7 * 86400000;
                } catch { return false; }
              }).length
            },
          ].map(s => (
            <div key={s.label} style={{ background:"#fff", borderRadius:16, padding:"20px 24px",
              border:"1px solid rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize:11, color:"#aaa", fontWeight:600, letterSpacing:"0.08em",
                textTransform:"uppercase", marginBottom:8 }}>{s.label}</div>
              <div style={{ fontSize:32, fontWeight:800, letterSpacing:"-0.03em" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* lista */}
        {leads.length === 0 ? (
          <div style={{ background:"#fff", borderRadius:20, padding:"60px 32px", textAlign:"center",
            border:"1px solid rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize:32, marginBottom:16 }}>📭</div>
            <div style={{ fontSize:16, fontWeight:700, marginBottom:8 }}>Nenhum lead ainda</div>
            <div style={{ fontSize:13, color:"#aaa" }}>Os leads aparecerão aqui assim que alguém completar o questionário.</div>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {leads.map(lead => (
              <div key={lead.id} onClick={() => setDetail(lead)}
                style={{ background:"#fff", borderRadius:16, padding:"18px 24px",
                  border:"1px solid rgba(0,0,0,0.06)", cursor:"pointer",
                  display:"flex", justifyContent:"space-between", alignItems:"center",
                  gap:16, transition:"box-shadow 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.08)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow="none"}>
                <div style={{ display:"flex", gap:20, alignItems:"center", flex:1, flexWrap:"wrap" }}>
                  <div>
                    <div style={{ fontSize:15, fontWeight:700, marginBottom:2 }}>{lead.nome || "—"}</div>
                    <div style={{ fontSize:12, color:"#888" }}>{lead.email || "—"}</div>
                  </div>
                  <div style={{ fontSize:12, color:"#aaa" }}>📱 {lead.whatsapp || "—"}</div>
                  {lead.answers?.hairType && <Badge text={lead.answers.hairType} />}
                  {lead.answers?.medication && <Badge text={lead.answers.medication} color="#1A3040" tc="#fff" />}
                </div>
                <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
                  <div style={{ fontSize:11, color:"#bbb", textAlign:"right" }}>{lead.timestamp}</div>
                  <span style={{ color:"#bbb", fontSize:16 }}>›</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
