import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const STATUS_LABELS = {
  aguardando_avaliacao: { label: "Aguardando", color: "#d97706", bg: "#FFF8E7" },
  em_analise:           { label: "Em análise",  color: "#2563eb", bg: "#EFF6FF" },
  prescrito:            { label: "Prescrito",   color: "#16a34a", bg: "#F0FDF4" },
  cancelado:            { label: "Cancelado",   color: "#dc2626", bg: "#FEF2F2" },
};

export default function DashboardMedico() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [medico, setMedico] = useState(null);
  const [filtro, setFiltro] = useState("aguardando_avaliacao");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    checkSession();
    fetchPedidos();
  }, []);

  async function checkSession() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/medico/login"); return; }
    const { data: perfil } = await supabase
      .from("perfis").select("*").eq("id", user.id).single();
    if (!perfil || ["medico","admin"].includes(perfil.role) === false) { navigate("/medico/login"); return; }
    setMedico({ ...user, ...perfil });
  }

  async function fetchPedidos() {
    setLoading(true);
    const { data, error } = await supabase
      .from("pedidos")
      .select(`
        *,
        pacientes ( nome, email, telefone, data_nascimento ),
        avaliacoes ( grau_calvicie, respostas, condicoes_medicas ),
        receitas ( status, observacoes )
      `)
      .order("created_at", { ascending: false });

    if (!error) setPedidos(data || []);
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/medico/login");
  }

  async function atualizarStatus(pedidoId, novoStatus) {
    await supabase.from("pedidos").update({ status: novoStatus }).eq("id", pedidoId);
    fetchPedidos();
  }

  const pedidosFiltrados = pedidos
    .filter(p => filtro === "todos" || p.status === filtro)
    .filter(p => {
      if (!busca) return true;
      const nome = p.pacientes?.nome?.toLowerCase() || "";
      const email = p.pacientes?.email?.toLowerCase() || "";
      return nome.includes(busca.toLowerCase()) || email.includes(busca.toLowerCase());
    });

  const contadores = {
    todos: pedidos.length,
    aguardando_avaliacao: pedidos.filter(p => p.status === "aguardando_avaliacao").length,
    em_analise: pedidos.filter(p => p.status === "em_analise").length,
    prescrito: pedidos.filter(p => p.status === "prescrito").length,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F0F7FA", fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .filtro-btn:hover{background:#EDF5F8!important;}
        .card-pedido:hover{box-shadow:0 8px 24px rgba(0,0,0,0.1)!important;transform:translateY(-1px);}
        .status-select{border:1px solid #dde8ee;border-radius:6px;padding:6px 10px;font-size:12px;font-family:'Outfit',sans-serif;cursor:pointer;background:#fff;color:#021d34;}
        .btn-logout:hover{background:#000a23!important;}
        @media(max-width:600px){.dash-grid{grid-template-columns:1fr!important;}.dash-stats{grid-template-columns:1fr 1fr!important;}}
      `}</style>

      {/* NAV */}
      <nav style={{
        background: "#021d34", padding: "0 5%", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src="/logo-v2.png" alt="Fio Raiz" style={{ height: 32, filter: "brightness(0) invert(1)" }} />
          <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.15)" }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Painel Médico
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
            {medico?.nome || medico?.email}
          </span>
          <button className="btn-logout" onClick={handleLogout} style={{
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff", padding: "7px 16px", borderRadius: 6, fontSize: 12,
            fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif",
            transition: "background 0.2s",
          }}>
            Sair
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 5%" }}>

        {/* Stats */}
        <div className="dash-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Total", valor: contadores.todos, cor: "#021d34" },
            { label: "Aguardando", valor: contadores.aguardando_avaliacao, cor: "#d97706" },
            { label: "Em análise", valor: contadores.em_analise, cor: "#2563eb" },
            { label: "Prescritos", valor: contadores.prescrito, cor: "#16a34a" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "20px 20px",
              border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.cor, letterSpacing: "-0.02em" }}>{s.valor}</div>
              <div style={{ fontSize: 12, color: "#888", fontWeight: 500, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filtros + Busca */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 8, flex: 1, flexWrap: "wrap" }}>
            {[
              { key: "aguardando_avaliacao", label: "Aguardando" },
              { key: "em_analise", label: "Em análise" },
              { key: "prescrito", label: "Prescritos" },
              { key: "todos", label: "Todos" },
            ].map(f => (
              <button key={f.key} className="filtro-btn" onClick={() => setFiltro(f.key)}
                style={{
                  padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                  border: "1.5px solid", cursor: "pointer", fontFamily: "'Outfit',sans-serif",
                  transition: "all 0.15s",
                  borderColor: filtro === f.key ? "#012e46" : "#dde8ee",
                  background: filtro === f.key ? "#012e46" : "#fff",
                  color: filtro === f.key ? "#fff" : "#555",
                }}>
                {f.label}
                <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>
                  ({contadores[f.key] ?? pedidos.length})
                </span>
              </button>
            ))}
          </div>
          <input
            placeholder="Buscar paciente…"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            style={{
              padding: "9px 14px", borderRadius: 8, border: "1.5px solid #dde8ee",
              fontSize: 13, fontFamily: "'Outfit',sans-serif", color: "#021d34",
              outline: "none", minWidth: 200,
            }}
          />
        </div>

        {/* Lista */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#888", fontSize: 14 }}>
            Carregando avaliações…
          </div>
        ) : pedidosFiltrados.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
            <div style={{ fontSize: 15, color: "#888" }}>Nenhuma avaliação encontrada</div>
          </div>
        ) : (
          <div className="dash-grid" style={{ display: "grid", gridTemplateColumns: "repeat(1,1fr)", gap: 14 }}>
            {pedidosFiltrados.map(pedido => {
              const pac = pedido.pacientes || {};
              const aval = pedido.avaliacoes?.[0] || {};
              const st = STATUS_LABELS[pedido.status] || STATUS_LABELS.aguardando_avaliacao;
              const idade = pac.data_nascimento
                ? Math.floor((Date.now() - new Date(pac.data_nascimento)) / 31557600000)
                : null;

              return (
                <div key={pedido.id} className="card-pedido" style={{
                  background: "#fff", borderRadius: 14, padding: "22px 24px",
                  border: "1px solid rgba(0,0,0,0.07)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  transition: "all 0.2s",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                    {/* Paciente info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#EDF5F8",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 14, fontWeight: 800, color: "#012e46", flexShrink: 0 }}>
                          {(pac.nome || "?")[0].toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: "#021d34" }}>
                            {pac.nome || "Nome não informado"}
                          </div>
                          <div style={{ fontSize: 12, color: "#888" }}>
                            {pac.email}{idade ? ` · ${idade} anos` : ""}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                        {aval.grau_calvicie && (
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#012e46",
                            background: "#EDF5F8", padding: "3px 10px", borderRadius: 100 }}>
                            Grau: {aval.grau_calvicie}
                          </span>
                        )}
                        {pedido.plano && (
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#555",
                            background: "#f4f4f4", padding: "3px 10px", borderRadius: 100 }}>
                            {pedido.plano}
                          </span>
                        )}
                        <span style={{ fontSize: 11, color: "#aaa" }}>
                          {new Date(pedido.created_at).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>

                    {/* Status + ações */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: st.color,
                        background: st.bg, padding: "4px 12px", borderRadius: 100 }}>
                        {st.label}
                      </span>
                      <select
                        className="status-select"
                        value={pedido.status}
                        onChange={e => atualizarStatus(pedido.id, e.target.value)}>
                        <option value="aguardando_avaliacao">Aguardando</option>
                        <option value="em_analise">Em análise</option>
                        <option value="prescrito">Prescrito</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </div>
                  </div>

                  {/* Respostas resumo */}
                  {aval.respostas && (
                    <div style={{ marginTop: 14, padding: "12px 14px", background: "#F8FBFD",
                      borderRadius: 8, border: "1px solid rgba(0,0,0,0.06)" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#94b8d7",
                        letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                        Respostas do quiz
                      </div>
                      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                        {Object.entries(aval.respostas).slice(0, 4).map(([k, v]) => (
                          <div key={k} style={{ fontSize: 12, color: "#555" }}>
                            <span style={{ fontWeight: 600, color: "#021d34" }}>{k}:</span> {String(v)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
