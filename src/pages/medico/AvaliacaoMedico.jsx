import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const ANSWER_LABELS = {
  hairType:          "Tipo de calvície",
  gradual:           "Início da queda",
  hairTexture:       "Couro cabeludo",
  family:            "Histórico familiar",
  goal:              "Objetivo do tratamento",
  scalpConditions:   "Sinais no couro cabeludo",
  prevTreatment12mo: "Tratamento nos últimos 12 meses",
  treatments:        "Ativos utilizados anteriormente",
  medication:        "Preferência de inibidor DHT",
  minoxidilType:     "Preferência de Minoxidil",
};

function getProtocolo(respostas = {}) {
  const conds = respostas.conditions || [];
  const has = (rx) => conds.some(c => rx.test(c));
  const hepatic   = has(/hepát|hepatit|cirrose|esteatose/i);
  const renal     = has(/renal/i);
  const endocrine = has(/libido|ereç|erét|ginecomastia/i);
  const cardiac   = has(/cardiovascular|hipertens|tontur/i);

  if (hepatic || renal)  return { label:"Protocolo Tópico Exclusivo",     color:"#d97706", desc:"Ativos sistêmicos contraindicados. Apenas uso tópico recomendado." };
  if (endocrine)         return { label:"Protocolo sem Inibidores DHT",    color:"#2563eb", desc:"Inibidores hormonais orais contraindicados por perfil endócrino." };
  if (cardiac)           return { label:"Protocolo sem Minoxidil Oral",    color:"#7c3aed", desc:"Via oral do Minoxidil restrita por perfil cardiovascular." };
  return                        { label:"Protocolo Completo",              color:"#16a34a", desc:"Sem contraindicações identificadas. Protocolo completo disponível." };
}

// ── helpers ──
function Section({ title, children }) {
  return (
    <div style={{ marginBottom:24 }}>
      <div style={{ fontSize:11, fontWeight:700, color:"#94b8d7", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>{title}</div>
      {children}
    </div>
  );
}
function Field({ label, value }) {
  return (
    <div style={{ background:"#F8FBFD", borderRadius:8, padding:"10px 12px", border:"1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ fontSize:10, color:"#aaa", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>{label}</div>
      <div style={{ fontSize:13, fontWeight:600, color:"#021d34" }}>{value || "—"}</div>
    </div>
  );
}

export default function AvaliacaoMedico() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pedido,    setPedido]    = useState(null);
  const [farmacias, setFarmacias] = useState([]);
  const [medico,    setMedico]    = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [erro,      setErro]      = useState("");
  const [fotoUrls,  setFotoUrls]  = useState({});

  // form prescrição
  const [farmaciaSel,   setFarmaciaSel]   = useState(null);
  const [obsReceita,    setObsReceita]    = useState("");
  const [salvando,      setSalvando]      = useState(false);
  const [prescrito,     setPrescrito]     = useState(false);

  // form recusa
  const [recusando,     setRecusando]     = useState(false);
  const [motivoRecusa,  setMotivoRecusa]  = useState("");
  const [showRecusaForm, setShowRecusaForm] = useState(false);

  // responsividade
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => { init(); }, [id]);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  async function init() {
    // auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/medico/login"); return; }
    const { data: perfil } = await supabase.from("perfis").select("*").eq("id", user.id).single();
    if (!perfil || !["medico","admin"].includes(perfil.role)) { navigate("/medico/login"); return; }
    setMedico({ ...user, ...perfil });

    // load farmacias
    const { data: fList } = await supabase.from("farmacias").select("*").eq("ativo", true).order("nome");
    setFarmacias(fList || []);

    // load pedido
    await loadPedido(fList || []);
  }

  async function generateSignedUrls(fotosObj) {
    if (!fotosObj || typeof fotosObj !== "object") return;
    const entries = Object.entries(fotosObj);
    if (entries.length === 0) return;
    const result = {};
    await Promise.all(
      entries.map(async ([k, fullUrl]) => {
        try {
          const path = fullUrl.split("/avaliacoes-fotos/")[1];
          if (!path) { result[k] = fullUrl; return; }
          const { data, error } = await supabase.storage
            .from("avaliacoes-fotos")
            .createSignedUrl(path, 3600);
          result[k] = error ? fullUrl : data.signedUrl;
        } catch { result[k] = fullUrl; }
      })
    );
    setFotoUrls(result);
  }

  async function loadPedido(fList) {
    setLoading(true);
    const { data, error } = await supabase
      .from("pedidos")
      .select(`*, prontuario_id, pacientes(nome, email, telefone, data_nascimento, cpf, medicamentos_em_uso, endereco),
        avaliacoes(grau_calvicie, respostas, condicoes_medicas, fotos_urls),
        receitas(status, observacoes, farmacia_nome, medico_id)`)
      .eq("id", id)
      .single();

    if (error || !data) { setErro("Avaliação não encontrada."); setLoading(false); return; }

    setPedido(data);
    if (data.status === "prescrito") setPrescrito(true);

    // gera URLs assinadas para as fotos (válidas por 1 hora)
    const fotosObj = data?.avaliacoes?.[0]?.fotos_urls;
    if (fotosObj && Object.keys(fotosObj).length > 0) {
      await generateSignedUrls(fotosObj);
    }

    // pré-seleciona farmácia mais próxima
    const cep = data.pacientes?.endereco?.cep || "";
    const prefix = cep.replace(/\D/g, "").substring(0, 2);
    const proxima = (fList || farmacias).find(f => f.cep_prefixos?.includes(prefix)) || (fList || farmacias)[0] || null;
    if (proxima) setFarmaciaSel(proxima);
    if (data.receitas?.[0]?.observacoes) setObsReceita(data.receitas[0].observacoes);

    setLoading(false);
  }

  async function recusarAvaliacao() {
    if (motivoRecusa.trim().length < 10) {
      setErro("Informe o motivo com ao menos 10 caracteres.");
      return;
    }
    setRecusando(true);
    setErro("");

    const { error: e1 } = await supabase.from("pedidos")
      .update({ status: "cancelado", medico_id: medico.id })
      .eq("id", pedido.id);

    const { error: e2 } = await supabase.from("receitas").insert({
      pedido_id:    pedido.id,
      medico_id:    medico.id,
      status:       "recusada",
      observacoes:  motivoRecusa,
      farmacia_nome: null,
    });

    setRecusando(false);
    if (e1 || e2) { setErro("Erro ao registrar recusa. Tente novamente."); return; }
    navigate("/medico/dashboard");
  }

  async function confirmarReceita() {
    if (!farmaciaSel || !pedido) return;
    setSalvando(true);
    setErro("");

    const { error: e1 } = await supabase.from("pedidos")
      .update({ status: "prescrito", medico_id: medico.id })
      .eq("id", pedido.id);

    const { error: e2 } = await supabase.from("receitas").insert({
      pedido_id:    pedido.id,
      medico_id:    medico.id,
      status:       "emitida",
      observacoes:  obsReceita,
      farmacia_nome: farmaciaSel.nome,
    });

    setSalvando(false);
    if (e1 || e2) { setErro("Erro ao salvar prescrição. Tente novamente."); return; }
    setPrescrito(true);
    await loadPedido(farmacias);
  }

  // ── render ────────────────────────────────────────────────────────────────
  if (loading) return (
    <div style={{ minHeight:"100vh", background:"#021d34", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Outfit',sans-serif", color:"rgba(255,255,255,0.4)", fontSize:14 }}>
      Carregando avaliação…
    </div>
  );

  if (erro && !pedido) return (
    <div style={{ minHeight:"100vh", background:"#F0F7FA", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Outfit',sans-serif" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:40, marginBottom:12 }}>⚠️</div>
        <div style={{ fontSize:16, color:"#555", marginBottom:20 }}>{erro}</div>
        <button onClick={() => navigate("/medico/dashboard")} style={{ background:"#012e46", color:"#fff", border:"none", padding:"12px 24px", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
          ← Voltar ao painel
        </button>
      </div>
    </div>
  );

  const pac     = pedido?.pacientes || {};
  const aval    = pedido?.avaliacoes?.[0] || {};
  const respostas = aval.respostas || {};
  const proto   = getProtocolo(respostas);
  const cep     = pac.endereco?.cep || "";
  const receita      = pedido?.receitas?.find(r => r.status === "emitida") || pedido?.receitas?.[0] || null;
  const jaPrescritos = pedido?.receitas?.some(r => r.status === "emitida") || pedido?.status === "prescrito" || pedido?.status === "cancelado";

  return (
    <div style={{ minHeight:"100vh", background:"#F0F7FA", fontFamily:"'Outfit',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}.farm-card{cursor:pointer;transition:all 0.15s;}.farm-card:hover{box-shadow:0 4px 16px rgba(0,0,0,0.08)!important;}`}</style>

      {/* NAV */}
      <nav style={{ background:"#021d34", padding: isMobile ? "0 16px" : "0 5%", height:60, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <button onClick={() => navigate("/medico/dashboard")} style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.8)", padding:"7px 14px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>← Painel</button>
          {!isMobile && (
            <>
              <div style={{ width:1, height:24, background:"rgba(255,255,255,0.15)" }} />
              <div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:"0.1em", textTransform:"uppercase" }}>Avaliação</div>
                <div style={{ fontSize:14, fontWeight:700, color:"#fff", marginTop:1 }}>{pac.nome || "Paciente"}</div>
              </div>
            </>
          )}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          {!isMobile && <span style={{ fontSize:12, color:"rgba(255,255,255,0.5)" }}>{medico?.nome || medico?.email}</span>}
          <button onClick={async () => { await supabase.auth.signOut(); navigate("/medico/login"); }}
            style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", color:"#fff", padding:"7px 14px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
            Sair
          </button>
        </div>
      </nav>

      <div style={{ maxWidth:900, margin:"0 auto", padding: isMobile ? "20px 16px" : "32px 5%", paddingBottom: isMobile && !prescrito && !jaPrescritos ? 100 : undefined }}>

        {/* Status banner prescrito */}
        {prescrito && (
          <div style={{ background:"#F0FDF4", borderRadius:14, padding:"18px 24px", marginBottom:24, border:"1px solid #86efac", display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:28 }}>✅</span>
            <div>
              <div style={{ fontSize:15, fontWeight:800, color:"#16a34a" }}>Protocolo prescrito com sucesso!</div>
              {receita?.farmacia_nome && <div style={{ fontSize:13, color:"#555", marginTop:2 }}>Farmácia: {receita.farmacia_nome}</div>}
            </div>
          </div>
        )}

        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:20 }}>

          {/* ── COLUNA ESQUERDA: dados + respostas ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

            {/* Dados do paciente */}
            <div style={{ background:"#fff", borderRadius:16, padding:"24px", border:"1px solid rgba(0,0,0,0.07)", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
              <Section title="👤 Dados do Paciente">
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  <Field label="Nome" value={pac.nome} />
                  <Field label="E-mail" value={pac.email} />
                  <Field label="WhatsApp" value={pac.telefone} />
                  <Field label="CEP" value={cep} />
                  {pac.endereco?.rua && <Field label="Endereço" value={`${pac.endereco.rua}${pac.endereco.numero ? ", "+pac.endereco.numero : ""}${pac.endereco.complemento ? " "+pac.endereco.complemento : ""}`} />}
                  {pac.endereco?.cidade && <Field label="Cidade / Estado" value={`${pac.endereco.cidade} - ${pac.endereco.estado}`} />}
                  <Field label="Prontuário ID" value={pedido?.prontuario_id} />
                  <Field label="Data de Nascimento" value={pac.data_nascimento ? new Date(pac.data_nascimento).toLocaleDateString("pt-BR") : "—"} />
                  <Field label="CPF" value={pac.cpf || aval?.respostas?.cpf || "—"} />
                  <Field label="Peso / Altura" value={(respostas.peso && respostas.altura) ? `${respostas.peso}kg / ${respostas.altura}cm` : "—"} />
                  <Field label="Medicamentos em uso" value={pac.medicamentos_em_uso || respostas.medicamentosAtuais || "—"} />
                </div>
              </Section>
              <div style={{ marginTop:12, display:"flex", gap:8, flexWrap:"wrap" }}>
                <span style={{ fontSize:11, fontWeight:700, color:proto.color, background:proto.color+"15", padding:"4px 12px", borderRadius:100 }}>{proto.label}</span>
                {aval.grau_calvicie && <span style={{ fontSize:11, fontWeight:700, color:"#012e46", background:"#EDF5F8", padding:"4px 12px", borderRadius:100 }}>{aval.grau_calvicie}</span>}
                <span style={{ fontSize:11, color:"#aaa", padding:"4px 0" }}>Pedido em {new Date(pedido.created_at).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>

            {/* Protocolo */}
            <div style={{ background:"#fff", borderRadius:16, padding:"24px", border:"1px solid rgba(0,0,0,0.07)", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
              <Section title="💊 Protocolo Recomendado">
                <div style={{ background:proto.color+"10", border:`1.5px solid ${proto.color}30`, borderRadius:12, padding:"16px" }}>
                  <div style={{ fontSize:14, fontWeight:700, color:proto.color, marginBottom:6 }}>{proto.label}</div>
                  <div style={{ fontSize:13, color:"#555", lineHeight:1.6 }}>{proto.desc}</div>
                </div>
              </Section>
            </div>

            {/* Fotos */}
            {Object.keys(fotoUrls).length > 0 && (
              <div style={{ background:"#fff", borderRadius:16, padding:"24px", border:"1px solid rgba(0,0,0,0.07)", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
                <Section title="📸 Fotos Enviadas">
                  <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill, 120px)", gap:12 }}>
                    {Object.entries(fotoUrls).map(([k, url]) => (
                      <div key={k} onClick={() => window.open(url, "_blank")}
                        style={{ position:"relative", cursor:"pointer", borderRadius:12, overflow:"hidden", border:"1px solid #dde8ee" }}>
                        <img src={url} alt={k} style={{ width:"100%", aspectRatio:"1/1", objectFit:"cover", display:"block" }} />
                        <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"rgba(2,29,52,0.6)", borderRadius:"0 0 12px 12px", padding:"4px 8px", fontSize:10, color:"#fff", fontWeight:600, textTransform:"capitalize" }}>{k}</div>
                      </div>
                    ))}
                  </div>
                </Section>
              </div>
            )}
          </div>

          {/* ── COLUNA DIREITA: respostas + prescrição ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

            {/* Respostas do quiz */}
            <div style={{ background:"#fff", borderRadius:16, padding:"24px", border:"1px solid rgba(0,0,0,0.07)", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
              <Section title="📋 Respostas do Questionário">
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {Object.entries(ANSWER_LABELS).map(([key, label]) => {
                    const val = respostas[key];
                    if (!val || (Array.isArray(val) && val.length === 0)) return null;
                    return (
                      <div key={key} style={{ display:"flex", flexDirection:"column", gap:3, padding:"10px 14px", background:"#F8FBFD", borderRadius:8, border:"1px solid rgba(0,0,0,0.05)" }}>
                        <div style={{ fontSize:10, color:"#aaa", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em" }}>{label}</div>
                        <div style={{ fontSize:13, color:"#021d34", fontWeight:500 }}>
                          {Array.isArray(val) ? val.join(", ") : String(val)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Section>
            </div>

            {/* Condições médicas */}
            {(() => {
              const condicoes = (aval.condicoes_medicas || []).filter(c => !c.toLowerCase().includes("nenhuma"));
              if (condicoes.length === 0 && !respostas.alergiaDetalhe) return null;
              return (
                <div style={{ background:"#fff", borderRadius:16, padding:"24px", border:"1px solid rgba(0,0,0,0.07)", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
                  <Section title="⚕️ Condições Médicas Relatadas">
                    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                      {condicoes.map((c, i) => (
                        <div key={i} style={{ fontSize:13, color:"#92400e", padding:"8px 12px", background:"#FFF8E7", borderRadius:8, border:"1px solid #fde68a" }}>⚠️ {c}</div>
                      ))}
                    </div>
                    {respostas.alergiaDetalhe && (
                      <div style={{ fontSize:13, color:"#b91c1c", padding:"8px 12px", background:"#FEF2F2",
                        borderRadius:8, border:"1px solid #fca5a5", marginTop:8 }}>
                        🚨 Alergia relatada: {respostas.alergiaDetalhe}
                      </div>
                    )}
                  </Section>
                </div>
              );
            })()}

            {/* PRESCRIÇÃO */}
            {!prescrito && !jaPrescritos ? (
              <div style={{ background:"#fff", borderRadius:16, padding:"24px", border:"1px solid rgba(0,0,0,0.07)", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
                <Section title="🏥 Prescrever — Selecione a Farmácia">
                  <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
                    {farmacias.map(f => {
                      const prefix = cep.replace(/\D/g,"").substring(0,2);
                      const isProxima = cep !== "" && f.cep_prefixos?.includes(prefix);
                      const isSel = farmaciaSel?.id === f.id;
                      return (
                        <div key={f.id} className="farm-card" onClick={() => setFarmaciaSel(f)} style={{
                          padding:"12px 16px", borderRadius:10,
                          border:`2px solid ${isSel ? "#012e46" : "rgba(0,0,0,0.08)"}`,
                          background: isSel ? "#EDF5F8" : "#fff",
                        }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                            <div>
                              <div style={{ fontSize:13, fontWeight:700, color:"#021d34" }}>{f.nome}</div>
                              <div style={{ fontSize:11, color:"#888", marginTop:2 }}>📍 {f.cidade}/{f.estado} · {f.telefone}</div>
                            </div>
                            <div style={{ display:"flex", gap:5, flexShrink:0 }}>
                              {isProxima && <span style={{ fontSize:10, fontWeight:700, color:"#16a34a", background:"#F0FDF4", padding:"2px 8px", borderRadius:100 }}>+ próxima</span>}
                              {isSel && <span style={{ fontSize:10, fontWeight:700, color:"#012e46", background:"#012e4615", padding:"2px 8px", borderRadius:100 }}>✓</span>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <label style={{ fontSize:12, fontWeight:700, color:"#021d34", display:"block", marginBottom:8, letterSpacing:"0.06em", textTransform:"uppercase" }}>
                    Orientações ao Paciente
                  </label>
                  <textarea
                    value={obsReceita}
                    onChange={e => setObsReceita(e.target.value)}
                    placeholder="Ex: Minoxidil 5% pela manhã, Finasterida 1mg à noite com refeição…"
                    rows={4}
                    style={{ width:"100%", padding:"12px 14px", borderRadius:10, border:"1.5px solid #dde8ee", fontSize:13, fontFamily:"'Outfit',sans-serif", color:"#021d34", resize:"vertical", outline:"none", boxSizing:"border-box", marginBottom:12 }}
                  />

                  {erro && <div style={{ background:"#FEF2F2", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#b91c1c", marginBottom:12 }}>{erro}</div>}

                  <div style={{ background:"#FFF8E7", borderRadius:10, padding:"10px 14px", border:"1px solid #fde68a", fontSize:12, color:"#92400e", marginBottom:14, lineHeight:1.6 }}>
                    ⚠️ Ao confirmar, o status será atualizado para <strong>Prescrito</strong> e a farmácia será notificada.
                  </div>

                  {!isMobile && (
                    <button
                      onClick={confirmarReceita}
                      disabled={!farmaciaSel || salvando}
                      style={{
                        width:"100%", padding:"15px", borderRadius:10, border:"none",
                        background: farmaciaSel ? "#16a34a" : "#ccc",
                        color:"#fff", fontSize:15, fontWeight:800,
                        cursor: farmaciaSel ? "pointer" : "not-allowed",
                        fontFamily:"'Outfit',sans-serif", transition:"background 0.2s",
                      }}>
                      {salvando ? "Salvando…" : "✓ Confirmar Prescrição"}
                    </button>
                  )}

                  {/* ── Recusa ── */}
                  <button
                    onClick={() => { setShowRecusaForm(v => !v); setErro(""); setMotivoRecusa(""); }}
                    style={{
                      width:"100%", marginTop:10, padding:"12px", borderRadius:10,
                      border:"1.5px solid #fca5a5", background:"#fff",
                      color:"#b91c1c", fontSize:13, fontWeight:700,
                      cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"background 0.15s",
                    }}>
                    {showRecusaForm ? "↑ Fechar formulário de recusa" : "✕ Recusar caso"}
                  </button>

                  {showRecusaForm && (
                    <div style={{ marginTop:12, display:"flex", flexDirection:"column", gap:10 }}>
                      <textarea
                        value={motivoRecusa}
                        onChange={e => setMotivoRecusa(e.target.value)}
                        placeholder="Descreva o motivo da recusa clínica…"
                        rows={3}
                        style={{ width:"100%", padding:"12px 14px", borderRadius:10, border:"1.5px solid #fca5a5", fontSize:13, fontFamily:"'Outfit',sans-serif", color:"#021d34", resize:"vertical", outline:"none", boxSizing:"border-box" }}
                      />
                      <div style={{ background:"#FFF8E7", borderRadius:8, padding:"10px 14px", border:"1px solid #fde68a", fontSize:12, color:"#92400e", lineHeight:1.6 }}>
                        ⚠️ A recusa será registrada no prontuário do paciente.
                      </div>
                      <div style={{ display:"flex", gap:8 }}>
                        <button
                          onClick={recusarAvaliacao}
                          disabled={recusando}
                          style={{ flex:1, padding:"12px", borderRadius:10, border:"none", background:"#b91c1c", color:"#fff", fontSize:13, fontWeight:800, cursor:"pointer", fontFamily:"'Outfit',sans-serif", opacity: recusando ? 0.7 : 1 }}>
                          {recusando ? "Registrando…" : "Confirmar recusa"}
                        </button>
                        <button
                          onClick={() => { setShowRecusaForm(false); setMotivoRecusa(""); setErro(""); }}
                          style={{ flex:1, padding:"12px", borderRadius:10, border:"1.5px solid #dde8ee", background:"#f5f7f9", color:"#555", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </Section>
              </div>
            ) : prescrito && receita && (
              <div style={{ background:"#fff", borderRadius:16, padding:"24px", border:"1px solid rgba(0,0,0,0.07)", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
                <Section title="✅ Receita Emitida">
                  <div style={{ background:"#F0FDF4", borderRadius:12, padding:"16px", border:"1px solid #86efac" }}>
                    <div style={{ fontSize:14, fontWeight:700, color:"#16a34a", marginBottom:8 }}>🏥 {receita.farmacia_nome}</div>
                    {receita.observacoes && <div style={{ fontSize:13, color:"#555", lineHeight:1.6 }}>📝 {receita.observacoes}</div>}
                  </div>
                </Section>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ── Barra fixa mobile: Confirmar Prescrição ── */}
      {isMobile && !prescrito && !jaPrescritos && (
        <div style={{
          position:"fixed", bottom:0, left:0, right:0, zIndex:200,
          background:"#fff", borderTop:"1px solid #e5eef3",
          padding:"12px 16px", boxShadow:"0 -4px 20px rgba(0,0,0,0.1)",
        }}>
          <button
            onClick={confirmarReceita}
            disabled={!farmaciaSel || salvando}
            style={{
              width:"100%", padding:"15px", borderRadius:12, border:"none",
              background: farmaciaSel ? "#16a34a" : "#ccc",
              color:"#fff", fontSize:15, fontWeight:800,
              cursor: farmaciaSel ? "pointer" : "not-allowed",
              fontFamily:"'Outfit',sans-serif", transition:"background 0.2s",
            }}>
            {salvando ? "Salvando…" : "✓ Confirmar Prescrição"}
          </button>
        </div>
      )}
    </div>
  );
}
