import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const STATUS_LABELS = {
  aguardando_avaliacao: { label:"Aguardando", color:"#d97706", bg:"#FFF8E7" },
  em_analise:           { label:"Em análise",  color:"#2563eb", bg:"#EFF6FF" },
  prescrito:            { label:"Prescrito",   color:"#16a34a", bg:"#F0FDF4" },
  cancelado:            { label:"Cancelado",   color:"#dc2626", bg:"#FEF2F2" },
};

const LOCK_MINUTES = 15;

function isLockExpired(locked_at) {
  if (!locked_at) return true;
  return Date.now() - new Date(locked_at).getTime() > LOCK_MINUTES * 60 * 1000;
}

function LockTimer({ locked_at }) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    function calc() {
      const elapsed = Date.now() - new Date(locked_at).getTime();
      const rem = LOCK_MINUTES * 60 * 1000 - elapsed;
      if (rem <= 0) { setRemaining(""); return; }
      const m = Math.floor(rem / 60000);
      const s = Math.floor((rem % 60000) / 1000);
      setRemaining(`${m}:${s.toString().padStart(2,"0")}`);
    }
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [locked_at]);

  if (!remaining) return null;
  return <span style={{ fontSize:10, color:"#2563eb" }}>({remaining})</span>;
}

export default function DashboardMedico() {
  const navigate = useNavigate();
  const [pedidos,   setPedidos]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [medico,    setMedico]    = useState(null);
  const [filtro,    setFiltro]    = useState("aguardando_avaliacao");
  const [busca,     setBusca]     = useState("");
  const [claiming,  setClaiming]  = useState(null); // pedido id being claimed
  const [ganhos, setGanhos] = useState({ total: 0, pendente: 0, prescricoes: 0 });
  const channelRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      // auth check
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/medico/login"); return; }
      const { data: perfil } = await supabase.from("perfis").select("*").eq("id", user.id).single();
      if (!perfil || !["medico","admin"].includes(perfil.role)) { navigate("/medico/login"); return; }
      if (mounted) setMedico({ ...user, ...perfil });

      await fetchPedidos();
      await fetchGanhos(user.id);

      // Realtime subscription
      channelRef.current = supabase
        .channel("pedidos-realtime")
        .on("postgres_changes", { event: "*", schema: "public", table: "pedidos" }, () => {
          if (mounted) fetchPedidos();
        })
        .subscribe();
    }

    init();
    return () => {
      mounted = false;
      if (channelRef.current) supabase.removeChannel(channelRef.current);
    };
  }, []);

  async function fetchPedidos() {
    const { data, error } = await supabase
      .from("pedidos")
      .select(`*, pacientes(nome, email, telefone, data_nascimento, endereco),
        avaliacoes(grau_calvicie, respostas, condicoes_medicas),
        receitas(status, farmacia_nome)`)
      .order("created_at", { ascending: false });
    if (error) console.error("fetchPedidos:", error);
    if (!error) setPedidos(data || []);
    setLoading(false);
  }

  async function fetchGanhos(userId) {
    const { data } = await supabase
      .from("pedidos")
      .select("id, status, medico_id, created_at")
      .eq("medico_id", userId)
      .eq("status", "prescrito");
    const count = data?.length || 0;
    setGanhos({
      prescricoes: count,
      total: count * 30,
      pendente: count * 30, // simplificado: tudo pendente até pagamento
    });
  }

  async function analisarPedido(pedido) {
    if (claiming) return;
    setClaiming(pedido.id);

    const { data: { user } } = await supabase.auth.getUser();
    const expiredAt = new Date(Date.now() - LOCK_MINUTES * 60 * 1000).toISOString();

    // Tenta clamar a avaliação com condição atômica
    const { error } = await supabase
      .from("pedidos")
      .update({
        status: "em_analise",
        medico_id: user.id,
        locked_at: new Date().toISOString(),
      })
      .eq("id", pedido.id)
      .or(`status.eq.aguardando_avaliacao,and(status.eq.em_analise,locked_at.lt.${expiredAt})`);

    setClaiming(null);

    if (error) {
      alert("Não foi possível abrir esta avaliação. Tente novamente.");
      return;
    }

    navigate(`/medico/avaliacao/${pedido.id}`);
  }

  const pedidosFiltrados = pedidos
    .filter(p => filtro === "todos" || p.status === filtro)
    .filter(p => {
      if (!busca) return true;
      const nome  = p.pacientes?.nome?.toLowerCase()  || "";
      const email = p.pacientes?.email?.toLowerCase() || "";
      return nome.includes(busca.toLowerCase()) || email.includes(busca.toLowerCase());
    });

  const contadores = {
    todos:                pedidos.length,
    aguardando_avaliacao: pedidos.filter(p => p.status === "aguardando_avaliacao").length,
    em_analise:           pedidos.filter(p => p.status === "em_analise").length,
    prescrito:            pedidos.filter(p => p.status === "prescrito").length,
  };

  return (
    <div style={{ minHeight:"100vh", background:"#F0F7FA", fontFamily:"'Outfit',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .filtro-btn:hover{background:#EDF5F8!important;}
        .card-pedido{transition:all 0.2s;}
        .card-pedido:hover{box-shadow:0 8px 24px rgba(0,0,0,0.1)!important;transform:translateY(-1px);}
        @media(max-width:600px){.dash-stats{grid-template-columns:1fr 1fr!important;}}
      `}</style>

      {/* NAV */}
      <nav style={{ background:"#021d34", padding:"0 5%", height:60, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <img src="/logo-v2.png" alt="Fio Raiz" style={{ height:32, filter:"brightness(0) invert(1)" }} />
          <div style={{ width:1, height:24, background:"rgba(255,255,255,0.15)" }} />
          <span style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.6)", letterSpacing:"0.08em", textTransform:"uppercase" }}>Painel Médico</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 0 2px rgba(34,197,94,0.3)" }} />
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:"0.06em" }}>LIVE</span>
          </div>
          <span style={{ fontSize:13, color:"rgba(255,255,255,0.6)" }}>{medico?.nome || medico?.email}</span>
          <button onClick={async () => { await supabase.auth.signOut(); navigate("/medico/login"); }}
            style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", color:"#fff", padding:"7px 16px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
            Sair
          </button>
        </div>
      </nav>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 5%" }}>

        {/* Painel de Ganhos */}
        <div style={{ background:"linear-gradient(135deg,#012e46,#021d34)", borderRadius:16, padding:"20px 24px", marginBottom:20, color:"#fff" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:16 }}>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.5)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>💰 Meus Ganhos</div>
              <div style={{ fontSize:28, fontWeight:800, letterSpacing:"-0.02em" }}>R$ {ganhos.pendente.toFixed(2).replace(".",",")}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.5)", marginTop:2 }}>a receber · {ganhos.prescricoes} prescrições × R$ 30,00</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8, alignItems:"flex-end" }}>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>Total acumulado: <strong style={{color:"#fff"}}>R$ {ganhos.total.toFixed(2).replace(".",",")}</strong></div>
              <button onClick={async () => {
                await supabase.from("solicitacoes_pagamento").insert({
                  medico_id: medico?.id,
                  valor: ganhos.pendente,
                  status: "pendente",
                  created_at: new Date().toISOString(),
                });
                alert(`Solicitação de R$ ${ganhos.pendente.toFixed(2).replace(".",",")} enviada ao financeiro!`);
              }} style={{ background:"rgba(255,255,255,0.15)", border:"1.5px solid rgba(255,255,255,0.25)", color:"#fff", padding:"8px 18px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                💸 Solicitar pagamento
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="dash-stats" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:28 }}>
          {[
            { label:"Total",      valor:contadores.todos,                cor:"#021d34" },
            { label:"Aguardando", valor:contadores.aguardando_avaliacao, cor:"#d97706" },
            { label:"Em análise", valor:contadores.em_analise,           cor:"#2563eb" },
            { label:"Prescritos", valor:contadores.prescrito,            cor:"#16a34a" },
          ].map((s, i) => (
            <div key={i} style={{ background:"#fff", borderRadius:14, padding:"20px", border:"1px solid rgba(0,0,0,0.07)", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize:28, fontWeight:800, color:s.cor, letterSpacing:"-0.02em" }}>{s.valor}</div>
              <div style={{ fontSize:12, color:"#888", fontWeight:500, marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filtros + Busca */}
        <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap", alignItems:"center" }}>
          <div style={{ display:"flex", gap:8, flex:1, flexWrap:"wrap" }}>
            {[
              { key:"aguardando_avaliacao", label:"Aguardando" },
              { key:"em_analise",           label:"Em análise" },
              { key:"prescrito",            label:"Prescritos" },
              { key:"todos",                label:"Todos" },
            ].map(f => (
              <button key={f.key} className="filtro-btn" onClick={() => setFiltro(f.key)} style={{
                padding:"8px 16px", borderRadius:8, fontSize:12, fontWeight:600, border:"1.5px solid",
                cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"all 0.15s",
                borderColor: filtro === f.key ? "#012e46" : "#dde8ee",
                background:  filtro === f.key ? "#012e46" : "#fff",
                color:       filtro === f.key ? "#fff"    : "#555",
              }}>
                {f.label} <span style={{ marginLeft:6, fontSize:11, opacity:0.7 }}>({contadores[f.key] ?? pedidos.length})</span>
              </button>
            ))}
          </div>
          <input
            placeholder="Buscar paciente…"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            style={{ padding:"9px 14px", borderRadius:8, border:"1.5px solid #dde8ee", fontSize:13, fontFamily:"'Outfit',sans-serif", color:"#021d34", outline:"none", minWidth:200 }}
          />
        </div>

        {/* Lista de pedidos */}
        {loading ? (
          <div style={{ textAlign:"center", padding:"60px 0", color:"#888", fontSize:14 }}>Carregando avaliações…</div>
        ) : pedidosFiltrados.length === 0 ? (
          <div style={{ textAlign:"center", padding:"60px 0" }}>
            <div style={{ fontSize:36, marginBottom:12 }}>📋</div>
            <div style={{ fontSize:15, color:"#888" }}>Nenhuma avaliação encontrada</div>
          </div>
        ) : (
          <div style={{ display:"grid", gap:14 }}>
            {pedidosFiltrados.map(pedido => {
              const pac  = pedido.pacientes || {};
              const aval = pedido.avaliacoes?.[0] || {};
              const st   = STATUS_LABELS[pedido.status] || STATUS_LABELS.aguardando_avaliacao;
              const cep  = pac.endereco?.cep || null;

              // lock state
              const isEmAnalise  = pedido.status === "em_analise";
              const lockExpired   = isLockExpired(pedido.locked_at);
              const lockedByOther = isEmAnalise && !lockExpired && pedido.medico_id !== medico?.id;
              const lockedByMe    = isEmAnalise && !lockExpired && pedido.medico_id === medico?.id;
              const canOpen       = pedido.status === "aguardando_avaliacao" || lockExpired || lockedByMe;
              const isPrescrito   = pedido.status === "prescrito" || pedido.status === "cancelado";

              return (
                <div key={pedido.id} className="card-pedido" style={{
                  background:"#fff", borderRadius:14, padding:"20px 24px",
                  border:`1px solid ${lockedByOther ? "#bfdbfe" : "rgba(0,0,0,0.07)"}`,
                  boxShadow:"0 1px 4px rgba(0,0,0,0.04)",
                  opacity: lockedByOther ? 0.8 : 1,
                }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12, flex:1 }}>
                      <div style={{ width:40, height:40, borderRadius:"50%", background:"#EDF5F8", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:800, color:"#012e46", flexShrink:0 }}>
                        {(pac.nome || "?")[0].toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize:15, fontWeight:700, color:"#021d34" }}>{pac.nome || "Nome não informado"}</div>
                        <div style={{ fontSize:12, color:"#888", marginTop:1 }}>
                          {pac.email}
                          {pac.telefone ? ` · ${pac.telefone}` : ""}
                          {cep ? ` · CEP ${cep}` : ""}
                        </div>
                        <div style={{ display:"flex", gap:6, marginTop:6, flexWrap:"wrap", alignItems:"center" }}>
                          {aval.grau_calvicie && (
                            <span style={{ fontSize:11, fontWeight:600, color:"#012e46", background:"#EDF5F8", padding:"2px 10px", borderRadius:100 }}>{aval.grau_calvicie}</span>
                          )}
                          <span style={{ fontSize:11, color:"#aaa" }}>{new Date(pedido.created_at).toLocaleDateString("pt-BR")}</span>
                          {lockedByOther && (
                            <span style={{ fontSize:11, color:"#2563eb", display:"flex", alignItems:"center", gap:4 }}>
                              🔒 Em análise por outro médico <LockTimer locked_at={pedido.locked_at} />
                            </span>
                          )}
                          {lockedByMe && (
                            <span style={{ fontSize:11, color:"#16a34a" }}>🟢 Você está analisando</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{ fontSize:11, fontWeight:700, color:st.color, background:st.bg, padding:"4px 12px", borderRadius:100 }}>{st.label}</span>

                      {isPrescrito ? (
                        <button onClick={() => navigate(`/medico/avaliacao/${pedido.id}`)} style={{
                          padding:"8px 16px", borderRadius:8, border:"1.5px solid #dde8ee",
                          background:"#fff", color:"#021d34", fontSize:12, fontWeight:700,
                          cursor:"pointer", fontFamily:"'Outfit',sans-serif", whiteSpace:"nowrap",
                        }}>
                          Ver →
                        </button>
                      ) : lockedByOther ? (
                        <button disabled style={{
                          padding:"8px 16px", borderRadius:8, border:"1.5px solid #dde8ee",
                          background:"#f5f5f5", color:"#bbb", fontSize:12, fontWeight:700,
                          cursor:"not-allowed", fontFamily:"'Outfit',sans-serif", whiteSpace:"nowrap",
                        }}>
                          🔒 Bloqueado
                        </button>
                      ) : (
                        <button
                          onClick={() => analisarPedido(pedido)}
                          disabled={claiming === pedido.id}
                          style={{
                            padding:"8px 16px", borderRadius:8, border:"none",
                            background:"#012e46", color:"#fff", fontSize:12, fontWeight:700,
                            cursor: claiming === pedido.id ? "wait" : "pointer",
                            fontFamily:"'Outfit',sans-serif", whiteSpace:"nowrap",
                            opacity: claiming === pedido.id ? 0.7 : 1,
                          }}>
                          {claiming === pedido.id ? "Abrindo…" : lockedByMe ? "Continuar →" : "Analisar →"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
