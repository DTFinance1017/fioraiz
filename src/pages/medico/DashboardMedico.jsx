import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const STATUS_LABELS = {
  aguardando_avaliacao: { label: "Aguardando", color: "#d97706", bg: "#FFF8E7" },
  em_analise:           { label: "Em análise",  color: "#2563eb", bg: "#EFF6FF" },
  prescrito:            { label: "Prescrito",   color: "#16a34a", bg: "#F0FDF4" },
  cancelado:            { label: "Cancelado",   color: "#dc2626", bg: "#FEF2F2" },
};

const FARMACIAS = [
  { id:1, nome:"Farmácia Dose Certa Manipulação", cidade:"São Paulo - SP",
    telefone:"(11) 3333-4444", email:"atendimento@dosecerta.com.br",
    prefixos:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19"] },
  { id:2, nome:"Farmácia Magistral Carioca", cidade:"Rio de Janeiro - RJ",
    telefone:"(21) 3333-4444", email:"atendimento@magistralcarioca.com.br",
    prefixos:["20","21","22","23","24","25","26","27","28"] },
  { id:3, nome:"Farmácia Central Mineira", cidade:"Belo Horizonte - MG",
    telefone:"(31) 3333-4444", email:"atendimento@centralmineira.com.br",
    prefixos:["30","31","32","33","34","35","36","37","38","39"] },
  { id:4, nome:"Farmácia Manipula Sul", cidade:"Porto Alegre - RS",
    telefone:"(51) 3333-4444", email:"atendimento@manipulasul.com.br",
    prefixos:["90","91","92","93","94","95","96","97","98","99"] },
  { id:5, nome:"Farmácia Arte Magistral", cidade:"Brasília - DF",
    telefone:"(61) 3333-4444", email:"atendimento@artemagistral.com.br",
    prefixos:["70","71","72","73"] },
  { id:6, nome:"Farmácia NordFarma Manipulação", cidade:"Recife - PE",
    telefone:"(81) 3333-4444", email:"atendimento@nordfarma.com.br",
    prefixos:["50","51","52","53","54","55","56"] },
];

const ANSWER_LABELS = {
  hairType:        "Tipo de calvície",
  gradual:         "Início da queda",
  duration:        "Duração",
  age:             "Faixa etária",
  family:          "Histórico familiar",
  scalpConditions: "Condições do couro cabeludo",
  treatments:      "Tratamentos anteriores",
  conditions:      "Condições médicas",
};

function farmaciaMaisProxima(cep) {
  if (!cep) return FARMACIAS[0];
  const prefix = cep.replace(/\D/g, "").substring(0, 2);
  return FARMACIAS.find(f => f.prefixos.includes(prefix)) || FARMACIAS[0];
}

function getProtocolo(respostas = {}) {
  const conds = respostas.conditions || [];
  const has = (rx) => conds.some(c => rx.test(c));
  const cardiac   = has(/cardiovascular|hipertens|tontur/i);
  const endocrine = has(/libido|ereç|erét|ginecomastia/i);
  const hepatic   = has(/hepát|hepatit|cirrose|esteatose/i);
  const renal     = has(/renal/i);

  if (hepatic || renal) return { label:"Protocolo Tópico Exclusivo", color:"#d97706", desc:"Ativos sistêmicos contraindicados. Apenas uso tópico." };
  if (endocrine) return { label:"Protocolo sem Inibidores DHT", color:"#2563eb", desc:"Inibidores hormonais orais contraindicados por perfil endócrino." };
  if (cardiac) return { label:"Protocolo sem Minoxidil Oral", color:"#7c3aed", desc:"Via oral do Minoxidil restrita por perfil cardiovascular." };
  return { label:"Protocolo Completo", color:"#16a34a", desc:"Sem contraindicações identificadas. Protocolo completo disponível." };
}

// ── Modal de Detalhes ─────────────────────────────────────────────────────────
function DetalheModal({ pedido, farmacia, onClose, onPrescrever }) {
  const pac   = pedido.pacientes || {};
  const aval  = pedido.avaliacoes?.[0] || {};
  const respostas = aval.respostas || {};
  const proto = getProtocolo(respostas);
  const cep   = pac.endereco?.cep || "—";
  const st    = STATUS_LABELS[pedido.status] || STATUS_LABELS.aguardando_avaliacao;
  const jaPrescritos = pedido.status === "prescrito" || pedido.status === "cancelado";

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:200,
      background:"rgba(2,29,52,0.55)", display:"flex", justifyContent:"flex-end",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width:"min(620px, 100vw)", height:"100vh", overflowY:"auto",
        background:"#fff", boxShadow:"-8px 0 40px rgba(0,0,0,0.2)",
        fontFamily:"'Outfit',sans-serif", display:"flex", flexDirection:"column",
      }}>
        {/* Header */}
        <div style={{ background:"#021d34", padding:"20px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
          <div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", letterSpacing:"0.1em", textTransform:"uppercase" }}>Avaliação do paciente</div>
            <div style={{ fontSize:17, fontWeight:700, color:"#fff", marginTop:2 }}>{pac.nome || "Paciente"}</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.1)", border:"none", borderRadius:"50%", width:32, height:32, color:"#fff", fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
        </div>

        <div style={{ flex:1, padding:"24px", display:"flex", flexDirection:"column", gap:20 }}>

          {/* Status + protocolo */}
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <span style={{ fontSize:11, fontWeight:700, color:st.color, background:st.bg, padding:"4px 12px", borderRadius:100 }}>{st.label}</span>
            <span style={{ fontSize:11, fontWeight:700, color:proto.color, background:proto.color+"15", padding:"4px 12px", borderRadius:100 }}>{proto.label}</span>
          </div>

          {/* Dados do paciente */}
          <Section title="👤 Dados do Paciente">
            <Grid2>
              <Field label="Nome" value={pac.nome} />
              <Field label="E-mail" value={pac.email} />
              <Field label="WhatsApp" value={pac.telefone} />
              <Field label="CEP" value={cep} />
              <Field label="Tipo de calvície" value={aval.grau_calvicie} />
              <Field label="Pedido em" value={new Date(pedido.created_at).toLocaleDateString("pt-BR")} />
            </Grid2>
          </Section>

          {/* Protocolo recomendado */}
          <Section title="💊 Protocolo Recomendado">
            <div style={{ background: proto.color+"10", border:`1px solid ${proto.color}30`, borderRadius:10, padding:"14px 16px" }}>
              <div style={{ fontSize:13, fontWeight:700, color:proto.color, marginBottom:4 }}>{proto.label}</div>
              <div style={{ fontSize:13, color:"#555", lineHeight:1.6 }}>{proto.desc}</div>
            </div>
          </Section>

          {/* Respostas do quiz */}
          <Section title="📋 Respostas do Questionário">
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {Object.entries(ANSWER_LABELS).map(([key, label]) => {
                const val = respostas[key];
                if (!val || (Array.isArray(val) && val.length === 0)) return null;
                return (
                  <div key={key} style={{ display:"flex", gap:12, padding:"10px 14px", background:"#F8FBFD", borderRadius:8, border:"1px solid rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize:12, color:"#888", fontWeight:600, minWidth:160, flexShrink:0 }}>{label}</div>
                    <div style={{ fontSize:13, color:"#021d34", fontWeight:500 }}>
                      {Array.isArray(val) ? val.join(", ") : String(val)}
                    </div>
                  </div>
                );
              })}
              {respostas.performance && Object.keys(respostas.performance).length > 0 && (
                <div style={{ padding:"10px 14px", background:"#F8FBFD", borderRadius:8, border:"1px solid rgba(0,0,0,0.05)" }}>
                  <div style={{ fontSize:12, color:"#888", fontWeight:600, marginBottom:6 }}>Performance em tratamentos anteriores</div>
                  {Object.entries(respostas.performance).map(([k, v]) => (
                    <div key={k} style={{ fontSize:13, color:"#021d34" }}>
                      <span style={{ fontWeight:600 }}>{k}:</span> {String(v)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Section>

          {/* Condições médicas */}
          {(aval.condicoes_medicas || []).length > 0 && (
            <Section title="⚕️ Condições Médicas Relatadas">
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {(aval.condicoes_medicas || []).map((c, i) => (
                  <div key={i} style={{ fontSize:13, color:"#021d34", padding:"8px 12px", background:"#FFF8E7", borderRadius:8, border:"1px solid #fde68a" }}>
                    {c}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Farmácia mais próxima */}
          {farmacia && (
            <Section title="🏥 Farmácia Parceira Indicada">
              <div style={{ background:"#EDF5F8", borderRadius:10, padding:"14px 16px", border:"1px solid #c8dde6" }}>
                <div style={{ fontSize:14, fontWeight:700, color:"#021d34", marginBottom:4 }}>{farmacia.nome}</div>
                <div style={{ fontSize:12, color:"#555", marginBottom:2 }}>📍 {farmacia.cidade}</div>
                <div style={{ fontSize:12, color:"#555", marginBottom:2 }}>📞 {farmacia.telefone}</div>
                <div style={{ fontSize:12, color:"#555" }}>✉️ {farmacia.email}</div>
                {cep !== "—" && (
                  <div style={{ fontSize:11, color:"#94b8d7", marginTop:6 }}>Selecionada com base no CEP do paciente: {cep}</div>
                )}
              </div>
            </Section>
          )}

          {/* Receita existente */}
          {pedido.receitas?.[0] && (
            <Section title="✅ Receita Emitida">
              <div style={{ background:"#F0FDF4", borderRadius:10, padding:"14px 16px", border:"1px solid #86efac" }}>
                <div style={{ fontSize:13, fontWeight:600, color:"#16a34a" }}>Farmácia: {pedido.receitas[0].farmacia_nome || "—"}</div>
                {pedido.receitas[0].observacoes && (
                  <div style={{ fontSize:13, color:"#555", marginTop:6 }}>{pedido.receitas[0].observacoes}</div>
                )}
              </div>
            </Section>
          )}
        </div>

        {/* Footer */}
        {!jaPrescritos && (
          <div style={{ padding:"16px 24px", borderTop:"1px solid rgba(0,0,0,0.07)", display:"flex", gap:10, flexShrink:0 }}>
            <button onClick={onClose} style={{
              flex:1, padding:"13px", borderRadius:10, border:"1.5px solid #dde8ee",
              background:"#fff", color:"#021d34", fontSize:14, fontWeight:600,
              cursor:"pointer", fontFamily:"'Outfit',sans-serif",
            }}>Fechar</button>
            <button onClick={onPrescrever} style={{
              flex:2, padding:"13px", borderRadius:10, border:"none",
              background:"#012e46", color:"#fff", fontSize:14, fontWeight:700,
              cursor:"pointer", fontFamily:"'Outfit',sans-serif",
            }}>Prescrever →</button>
          </div>
        )}
        {jaPrescritos && (
          <div style={{ padding:"16px 24px", borderTop:"1px solid rgba(0,0,0,0.07)" }}>
            <button onClick={onClose} style={{
              width:"100%", padding:"13px", borderRadius:10, border:"1.5px solid #dde8ee",
              background:"#fff", color:"#021d34", fontSize:14, fontWeight:600,
              cursor:"pointer", fontFamily:"'Outfit',sans-serif",
            }}>Fechar</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Modal Prescrever ──────────────────────────────────────────────────────────
function PrescreverModal({ pedido, farmacias, farmaciaSel, setFarmaciaSel, obs, setObs, salvando, onConfirm, onBack, onClose }) {
  const pac = pedido.pacientes || {};
  const cep = pac.endereco?.cep || "";

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:300,
      background:"rgba(2,29,52,0.65)", display:"flex", alignItems:"center", justifyContent:"center",
      padding:"20px", fontFamily:"'Outfit',sans-serif",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background:"#fff", borderRadius:20, width:"min(560px, 100%)", maxHeight:"90vh",
        overflowY:"auto", boxShadow:"0 32px 80px rgba(0,0,0,0.35)",
      }}>
        {/* Header */}
        <div style={{ padding:"22px 24px 0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:11, color:"#888", letterSpacing:"0.1em", textTransform:"uppercase" }}>Emitir prescrição</div>
            <div style={{ fontSize:18, fontWeight:800, color:"#021d34", marginTop:2 }}>{pac.nome}</div>
          </div>
          <button onClick={onClose} style={{ background:"#EDF5F8", border:"none", borderRadius:"50%", width:32, height:32, cursor:"pointer", fontSize:16, color:"#666", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
        </div>

        <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:18 }}>

          {/* Seleção de farmácia */}
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:"#021d34", marginBottom:10, letterSpacing:"0.06em", textTransform:"uppercase" }}>
              Selecione a Farmácia Parceira
            </div>
            {farmacias.map(f => {
              const isProxima = cep && f.prefixos?.includes(cep.replace(/\D/g,"").substring(0,2));
              const isSel = farmaciaSel?.id === f.id;
              return (
                <div key={f.id} onClick={() => setFarmaciaSel(f)}
                  style={{
                    padding:"14px 16px", borderRadius:10, marginBottom:8, cursor:"pointer", transition:"all 0.15s",
                    border:`2px solid ${isSel ? "#012e46" : "rgba(0,0,0,0.08)"}`,
                    background: isSel ? "#EDF5F8" : "#fff",
                  }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:"#021d34" }}>{f.nome}</div>
                      <div style={{ fontSize:11, color:"#888", marginTop:2 }}>📍 {f.cidade} · {f.telefone}</div>
                    </div>
                    <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                      {isProxima && (
                        <span style={{ fontSize:10, fontWeight:700, color:"#16a34a", background:"#F0FDF4", padding:"3px 8px", borderRadius:100 }}>
                          Mais próxima
                        </span>
                      )}
                      {isSel && (
                        <span style={{ fontSize:10, fontWeight:700, color:"#012e46", background:"#012e4620", padding:"3px 8px", borderRadius:100 }}>
                          ✓ Selecionada
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Observações */}
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#021d34", display:"block", marginBottom:8, letterSpacing:"0.06em", textTransform:"uppercase" }}>
              Observações / Orientações ao Paciente
            </label>
            <textarea
              value={obs}
              onChange={e => setObs(e.target.value)}
              placeholder="Ex: Usar Minoxidil 5% pela manhã, Finasterida 1mg à noite com refeição..."
              rows={4}
              style={{
                width:"100%", padding:"12px 14px", borderRadius:10,
                border:"1.5px solid #dde8ee", fontSize:13, fontFamily:"'Outfit',sans-serif",
                color:"#021d34", resize:"vertical", outline:"none", boxSizing:"border-box",
              }}
            />
          </div>

          {/* Aviso */}
          <div style={{ background:"#FFF8E7", borderRadius:10, padding:"12px 16px", border:"1px solid #fde68a", fontSize:12, color:"#92400e", lineHeight:1.6 }}>
            ⚠️ Ao confirmar, o status do pedido será atualizado para <strong>Prescrito</strong> e a farmácia selecionada será notificada.
          </div>

          {/* Botões */}
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={onBack} style={{
              flex:1, padding:"13px", borderRadius:10, border:"1.5px solid #dde8ee",
              background:"#fff", color:"#021d34", fontSize:14, fontWeight:600,
              cursor:"pointer", fontFamily:"'Outfit',sans-serif",
            }}>← Voltar</button>
            <button
              onClick={onConfirm}
              disabled={!farmaciaSel || salvando}
              style={{
                flex:2, padding:"13px", borderRadius:10, border:"none",
                background: farmaciaSel ? "#16a34a" : "#ccc",
                color:"#fff", fontSize:14, fontWeight:700,
                cursor: farmaciaSel ? "pointer" : "not-allowed",
                fontFamily:"'Outfit',sans-serif", transition:"background 0.2s",
              }}>
              {salvando ? "Salvando…" : "✓ Confirmar Prescrição"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers de UI ─────────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div>
      <div style={{ fontSize:11, fontWeight:700, color:"#94b8d7", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>{title}</div>
      {children}
    </div>
  );
}
function Grid2({ children }) {
  return <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>{children}</div>;
}
function Field({ label, value }) {
  return (
    <div style={{ background:"#F8FBFD", borderRadius:8, padding:"10px 12px", border:"1px solid rgba(0,0,0,0.05)" }}>
      <div style={{ fontSize:10, color:"#aaa", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>{label}</div>
      <div style={{ fontSize:13, fontWeight:600, color:"#021d34" }}>{value || "—"}</div>
    </div>
  );
}

// ── Dashboard Principal ───────────────────────────────────────────────────────
export default function DashboardMedico() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [medico, setMedico] = useState(null);
  const [filtro, setFiltro] = useState("aguardando_avaliacao");
  const [busca, setBusca] = useState("");
  const [pedidoDetalhe, setPedidoDetalhe] = useState(null);
  const [prescrevendo, setPrescrevendo] = useState(false);
  const [farmaciaSel, setFarmaciaSel] = useState(null);
  const [obsReceita, setObsReceita] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => { checkSession(); fetchPedidos(); }, []);

  async function checkSession() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/medico/login"); return; }
    const { data: perfil } = await supabase.from("perfis").select("*").eq("id", user.id).single();
    if (!perfil || !["medico","admin"].includes(perfil.role)) { navigate("/medico/login"); return; }
    setMedico({ ...user, ...perfil });
  }

  async function fetchPedidos() {
    setLoading(true);
    const { data, error } = await supabase
      .from("pedidos")
      .select(`*, pacientes ( nome, email, telefone, data_nascimento, endereco ),
        avaliacoes ( grau_calvicie, respostas, condicoes_medicas ),
        receitas ( status, observacoes, farmacia_nome )`)
      .order("created_at", { ascending: false });
    if (error) console.error("fetchPedidos error:", error);
    if (!error) setPedidos(data || []);
    setLoading(false);
  }

  async function confirmarReceita() {
    if (!farmaciaSel || !pedidoDetalhe) return;
    setSalvando(true);
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("pedidos").update({ status: "prescrito" }).eq("id", pedidoDetalhe.id);
    await supabase.from("receitas").insert({
      pedido_id: pedidoDetalhe.id,
      medico_id: user?.id,
      status: "emitida",
      observacoes: obsReceita,
      farmacia_nome: farmaciaSel.nome,
    });
    setSalvando(false);
    setPrescrevendo(false);
    setPedidoDetalhe(null);
    setObsReceita("");
    setFarmaciaSel(null);
    fetchPedidos();
  }

  function abrirDetalhe(pedido) {
    const cep = pedido.pacientes?.endereco?.cep || "";
    setFarmaciaSel(farmaciaMaisProxima(cep));
    setPedidoDetalhe(pedido);
    setPrescrevendo(false);
    setObsReceita("");
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
    <div style={{ minHeight:"100vh", background:"#F0F7FA", fontFamily:"'Outfit',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .filtro-btn:hover{background:#EDF5F8!important;}
        .card-pedido:hover{box-shadow:0 8px 24px rgba(0,0,0,0.1)!important;transform:translateY(-1px);}
        .btn-logout:hover{background:#000a23!important;}
        .btn-ver:hover{background:#EDF5F8!important;}
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
          <span style={{ fontSize:13, color:"rgba(255,255,255,0.6)" }}>{medico?.nome || medico?.email}</span>
          <button className="btn-logout" onClick={async () => { await supabase.auth.signOut(); navigate("/medico/login"); }}
            style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", color:"#fff", padding:"7px 16px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"background 0.2s" }}>
            Sair
          </button>
        </div>
      </nav>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 5%" }}>
        {/* Stats */}
        <div className="dash-stats" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:28 }}>
          {[
            { label:"Total", valor:contadores.todos, cor:"#021d34" },
            { label:"Aguardando", valor:contadores.aguardando_avaliacao, cor:"#d97706" },
            { label:"Em análise", valor:contadores.em_analise, cor:"#2563eb" },
            { label:"Prescritos", valor:contadores.prescrito, cor:"#16a34a" },
          ].map((s,i) => (
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
              { key:"em_analise", label:"Em análise" },
              { key:"prescrito", label:"Prescritos" },
              { key:"todos", label:"Todos" },
            ].map(f => (
              <button key={f.key} className="filtro-btn" onClick={() => setFiltro(f.key)} style={{
                padding:"8px 16px", borderRadius:8, fontSize:12, fontWeight:600, border:"1.5px solid", cursor:"pointer",
                fontFamily:"'Outfit',sans-serif", transition:"all 0.15s",
                borderColor: filtro === f.key ? "#012e46" : "#dde8ee",
                background: filtro === f.key ? "#012e46" : "#fff",
                color: filtro === f.key ? "#fff" : "#555",
              }}>
                {f.label} <span style={{ marginLeft:6, fontSize:11, opacity:0.7 }}>({contadores[f.key] ?? pedidos.length})</span>
              </button>
            ))}
          </div>
          <input placeholder="Buscar paciente…" value={busca} onChange={e => setBusca(e.target.value)}
            style={{ padding:"9px 14px", borderRadius:8, border:"1.5px solid #dde8ee", fontSize:13, fontFamily:"'Outfit',sans-serif", color:"#021d34", outline:"none", minWidth:200 }} />
        </div>

        {/* Lista */}
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
              return (
                <div key={pedido.id} className="card-pedido" style={{
                  background:"#fff", borderRadius:14, padding:"20px 24px",
                  border:"1px solid rgba(0,0,0,0.07)", boxShadow:"0 1px 4px rgba(0,0,0,0.04)",
                  transition:"all 0.2s", cursor:"default",
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
                        <div style={{ display:"flex", gap:6, marginTop:6, flexWrap:"wrap" }}>
                          {aval.grau_calvicie && (
                            <span style={{ fontSize:11, fontWeight:600, color:"#012e46", background:"#EDF5F8", padding:"2px 10px", borderRadius:100 }}>{aval.grau_calvicie}</span>
                          )}
                          <span style={{ fontSize:11, color:"#aaa" }}>{new Date(pedido.created_at).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{ fontSize:11, fontWeight:700, color:st.color, background:st.bg, padding:"4px 12px", borderRadius:100 }}>{st.label}</span>
                      <button className="btn-ver" onClick={() => abrirDetalhe(pedido)} style={{
                        padding:"8px 16px", borderRadius:8, border:"1.5px solid #dde8ee",
                        background:"#fff", color:"#021d34", fontSize:12, fontWeight:700,
                        cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"all 0.15s", whiteSpace:"nowrap",
                      }}>
                        Ver detalhes →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modais */}
      {pedidoDetalhe && !prescrevendo && (
        <DetalheModal
          pedido={pedidoDetalhe}
          farmacia={farmaciaSel}
          onClose={() => setPedidoDetalhe(null)}
          onPrescrever={() => setPrescrevendo(true)}
        />
      )}
      {pedidoDetalhe && prescrevendo && (
        <PrescreverModal
          pedido={pedidoDetalhe}
          farmacias={FARMACIAS}
          farmaciaSel={farmaciaSel}
          setFarmaciaSel={setFarmaciaSel}
          obs={obsReceita}
          setObs={setObsReceita}
          salvando={salvando}
          onConfirm={confirmarReceita}
          onBack={() => setPrescrevendo(false)}
          onClose={() => { setPrescrevendo(false); setPedidoDetalhe(null); }}
        />
      )}
    </div>
  );
}
