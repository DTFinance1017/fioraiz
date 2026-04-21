import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const STATUS_INFO = {
  aguardando_avaliacao: { label:"Aguardando avaliação médica", color:"#d97706", bg:"#FFF8E7", icon:"⏳", desc:"Seu questionário foi recebido. Um médico parceiro irá analisar suas respostas em breve." },
  em_analise:           { label:"Em análise",  color:"#2563eb", bg:"#EFF6FF", icon:"🔍", desc:"Um médico está revisando suas respostas e preparando seu protocolo." },
  prescrito:            { label:"Protocolo prescrito!", color:"#16a34a", bg:"#F0FDF4", icon:"✅", desc:"Seu protocolo foi aprovado por um médico. A farmácia parceira foi notificada." },
  cancelado:            { label:"Cancelado", color:"#dc2626", bg:"#FEF2F2", icon:"❌", desc:"Esta avaliação foi cancelada. Entre em contato conosco para mais informações." },
};

const PRODUTOS = [
  { nome:"Minoxidil 5% Tópico", desc:"Ativador folicular de uso tópico. Aplicação diária.", preco:"R$ 89,90/mês", tag:"Mais vendido" },
  { nome:"Finasterida 1mg", desc:"Inibidor de DHT oral. Prescrição médica necessária.", preco:"R$ 69,90/mês", tag:"Prescrição" },
  { nome:"Kit Completo Fio Raiz", desc:"Minoxidil + Finasterida + Shampoo terapêutico.", preco:"R$ 149,90/mês", tag:"Melhor custo-benefício" },
  { nome:"Dutasterida 0,5mg", desc:"Inibidor DHT de alta potência. Para casos avançados.", preco:"R$ 89,90/mês", tag:"Avançado" },
  { nome:"Shampoo Terapêutico", desc:"Anticaspa + estimulante capilar com Ketoconazol 2%.", preco:"R$ 49,90/mês", tag:"Complementar" },
];

export default function DashboardPaciente() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [abaCancelar, setAbaCancelar] = useState(false);
  const [cancelMotivo, setCancelMotivo] = useState("");
  const [cancelEnviado, setCancelEnviado] = useState(false);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    const { data: { user: u } } = await supabase.auth.getUser();
    if (!u) { navigate("/paciente/login"); return; }
    setUser(u);

    const { data } = await supabase
      .from("pedidos")
      .select(`*, pacientes(nome, email, telefone, endereco),
        avaliacoes(grau_calvicie, respostas, fotos_urls),
        receitas(status, observacoes, farmacia_nome)`)
      .in("paciente_id",
        (await supabase.from("pacientes").select("id").eq("user_id", u.id)).data?.map(p => p.id) || []
      )
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    setPedido(data || null);
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/paciente/login");
  }

  const st = pedido ? (STATUS_INFO[pedido.status] || STATUS_INFO.aguardando_avaliacao) : null;
  const receita = pedido?.receitas?.[0];
  const aval = pedido?.avaliacoes?.[0];
  const pac = pedido?.pacientes;

  return (
    <div style={{ minHeight:"100vh", background:"#F0F7FA", fontFamily:"'Outfit',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}.produto-card:hover{box-shadow:0 8px 24px rgba(0,0,0,0.1)!important;transform:translateY(-1px);}`}</style>

      {/* NAV */}
      <nav style={{ background:"#021d34", padding:"0 5%", height:60, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <img src="/logo-v2.png" alt="Fio Raiz" style={{ height:32, filter:"brightness(0) invert(1)" }} />
          <div style={{ width:1, height:24, background:"rgba(255,255,255,0.15)" }} />
          <span style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.6)", letterSpacing:"0.08em", textTransform:"uppercase" }}>Minha Conta</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:13, color:"rgba(255,255,255,0.6)" }}>{pac?.nome || user?.email}</span>
          <button onClick={handleLogout} style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", color:"#fff", padding:"7px 16px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>Sair</button>
        </div>
      </nav>

      <div style={{ maxWidth:860, margin:"0 auto", padding:"32px 5%" }}>

        {loading ? (
          <div style={{ textAlign:"center", padding:"60px 0", color:"#888" }}>Carregando…</div>
        ) : (
          <>
            {/* Status da avaliação */}
            {pedido && st && (
              <div style={{ background:"#fff", borderRadius:16, padding:"24px", marginBottom:24, border:"1px solid rgba(0,0,0,0.07)", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#94b8d7", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>📋 Sua avaliação</div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:16 }}>
                  <div style={{ fontSize:36, flexShrink:0 }}>{st.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:st.color, background:st.bg, padding:"3px 10px", borderRadius:100, display:"inline-block", marginBottom:8 }}>{st.label}</div>
                    <p style={{ fontSize:14, color:"#555", lineHeight:1.6 }}>{st.desc}</p>
                    {aval?.grau_calvicie && (
                      <div style={{ marginTop:10, fontSize:13, color:"#021d34" }}>
                        <strong>Tipo identificado:</strong> {aval.grau_calvicie}
                      </div>
                    )}
                    <div style={{ fontSize:11, color:"#aaa", marginTop:6 }}>
                      Pedido {pedido.protocolo} · {new Date(pedido.created_at).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                </div>

                {/* Receita */}
                {receita && (
                  <div style={{ marginTop:20, padding:"16px", background:"#F0FDF4", borderRadius:12, border:"1px solid #86efac" }}>
                    <div style={{ fontSize:12, fontWeight:700, color:"#16a34a", marginBottom:8 }}>✅ Protocolo aprovado pelo médico</div>
                    {receita.farmacia_nome && (
                      <p style={{ fontSize:13, color:"#555" }}>🏥 <strong>Farmácia:</strong> {receita.farmacia_nome}</p>
                    )}
                    {receita.observacoes && (
                      <p style={{ fontSize:13, color:"#555", marginTop:6 }}>📝 <strong>Orientações:</strong> {receita.observacoes}</p>
                    )}
                  </div>
                )}

                {/* Fotos */}
                {aval?.fotos_urls && Object.keys(aval.fotos_urls).length > 0 && (
                  <div style={{ marginTop:16 }}>
                    <div style={{ fontSize:11, color:"#94b8d7", fontWeight:700, marginBottom:8, letterSpacing:"0.08em" }}>FOTOS ENVIADAS</div>
                    <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                      {Object.entries(aval.fotos_urls).map(([k, url]) => (
                        <a key={k} href={url} target="_blank" rel="noreferrer" style={{ textDecoration:"none" }}>
                          <img src={url} alt={k} style={{ width:80, height:80, objectFit:"cover", borderRadius:10, border:"1px solid #dde8ee" }} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!pedido && (
              <div style={{ background:"#fff", borderRadius:16, padding:"40px", textAlign:"center", marginBottom:24, border:"1px solid rgba(0,0,0,0.07)" }}>
                <div style={{ fontSize:40, marginBottom:12 }}>📋</div>
                <h3 style={{ fontSize:18, fontWeight:700, color:"#021d34", marginBottom:8 }}>Nenhuma avaliação encontrada</h3>
                <p style={{ fontSize:14, color:"#888", marginBottom:20 }}>Faça sua avaliação gratuita para começar seu tratamento.</p>
                <button onClick={() => navigate("/avaliacao")} style={{ background:"#012e46", color:"#fff", padding:"13px 28px", borderRadius:10, border:"none", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                  Fazer avaliação gratuita →
                </button>
              </div>
            )}

            {/* Produtos da farmácia */}
            <div style={{ background:"#fff", borderRadius:16, padding:"24px", marginBottom:24, border:"1px solid rgba(0,0,0,0.07)", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#94b8d7", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>🏥 Farmácias Parceiras</div>
              <p style={{ fontSize:13, color:"#888", marginBottom:18 }}>Produtos disponíveis para você, com entrega discreta.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {PRODUTOS.map((p, i) => (
                  <div key={i} className="produto-card" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 16px", borderRadius:12, border:"1px solid rgba(0,0,0,0.07)", transition:"all 0.2s", flexWrap:"wrap", gap:10 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                        <span style={{ fontSize:13, fontWeight:700, color:"#021d34" }}>{p.nome}</span>
                        <span style={{ fontSize:10, fontWeight:700, color:"#012e46", background:"#EDF5F8", padding:"2px 8px", borderRadius:100 }}>{p.tag}</span>
                      </div>
                      <div style={{ fontSize:12, color:"#888" }}>{p.desc}</div>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      <div style={{ fontSize:14, fontWeight:800, color:"#021d34" }}>{p.preco}</div>
                      <button style={{ marginTop:6, padding:"7px 14px", background:"#012e46", color:"#fff", border:"none", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                        Solicitar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cancelar assinatura */}
            <div style={{ background:"#fff", borderRadius:16, padding:"24px", border:"1px solid rgba(0,0,0,0.07)", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#94b8d7", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>⚙️ Configurações da conta</div>
              {!abaCancelar && !cancelEnviado && (
                <button onClick={() => setAbaCancelar(true)} style={{ marginTop:10, fontSize:13, color:"#dc2626", background:"none", border:"1px solid #fca5a5", borderRadius:8, padding:"9px 16px", cursor:"pointer", fontFamily:"'Outfit',sans-serif", fontWeight:600 }}>
                  Cancelar assinatura
                </button>
              )}
              {abaCancelar && !cancelEnviado && (
                <div style={{ marginTop:14 }}>
                  <p style={{ fontSize:13, color:"#555", marginBottom:12 }}>Nos conte o motivo para que possamos melhorar:</p>
                  <textarea value={cancelMotivo} onChange={e => setCancelMotivo(e.target.value)}
                    placeholder="Motivo do cancelamento…" rows={3}
                    style={{ width:"100%", padding:"12px", borderRadius:10, border:"1.5px solid #dde8ee", fontSize:13, fontFamily:"'Outfit',sans-serif", outline:"none", marginBottom:10, boxSizing:"border-box", resize:"vertical" }} />
                  <div style={{ display:"flex", gap:10 }}>
                    <button onClick={() => setAbaCancelar(false)} style={{ flex:1, padding:"11px", borderRadius:8, border:"1.5px solid #dde8ee", background:"#fff", color:"#021d34", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>Voltar</button>
                    <button onClick={() => { setCancelEnviado(true); setAbaCancelar(false); }}
                      style={{ flex:1, padding:"11px", borderRadius:8, border:"none", background:"#dc2626", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                      Confirmar cancelamento
                    </button>
                  </div>
                </div>
              )}
              {cancelEnviado && (
                <div style={{ marginTop:12, padding:"12px 16px", background:"#FFF8E7", borderRadius:10, border:"1px solid #fde68a", fontSize:13, color:"#92400e" }}>
                  Solicitação recebida. Nossa equipe entrará em contato em até 24h para confirmar o cancelamento.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
