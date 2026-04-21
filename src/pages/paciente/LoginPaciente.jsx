import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function LoginPaciente() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailEnviado, setEmailEnviado] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
      if (error) throw error;
      navigate("/minha-conta");
    } catch (err) {
      if (err.message?.includes("Email not confirmed")) {
        setErro("Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.");
      } else {
        setErro("E-mail ou senha incorretos.");
      }
    } finally { setLoading(false); }
  }

  async function reenviarEmail() {
    if (!email) { setErro("Digite seu e-mail para reenviar a confirmação."); return; }
    const { error } = await supabase.auth.resend({ type: "signup", email });
    if (!error) setEmailEnviado(true);
  }

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(150deg,#000a23 0%,#021d34 100%)", fontFamily:"'Outfit',sans-serif", padding:20 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}.inp:focus{outline:none;border-color:#94b8d7!important;box-shadow:0 0 0 3px rgba(148,184,215,0.15);}.btn-main:hover:not(:disabled){background:#000a23!important;transform:translateY(-1px);}`}</style>
      <div style={{ background:"#fff", borderRadius:20, padding:"44px 40px", width:"100%", maxWidth:420, boxShadow:"0 32px 80px rgba(0,0,0,0.35)" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <img src="/logo-v2.png" alt="Fio Raiz" style={{ height:44, marginBottom:16 }} />
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#94b8d7", marginBottom:6 }}>Minha Conta</div>
          <h1 style={{ fontSize:22, fontWeight:800, color:"#021d34", letterSpacing:"-0.02em" }}>Acessar meu painel</h1>
        </div>

        <form onSubmit={handleLogin} style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div>
            <label style={{ fontSize:12, fontWeight:600, color:"#555", display:"block", marginBottom:6 }}>E-mail</label>
            <input className="inp" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="seu@email.com"
              style={{ width:"100%", padding:"13px 16px", borderRadius:8, border:"1.5px solid #dde8ee", fontSize:14, color:"#021d34", fontFamily:"'Outfit',sans-serif", transition:"border-color 0.2s" }} />
          </div>
          <div>
            <label style={{ fontSize:12, fontWeight:600, color:"#555", display:"block", marginBottom:6 }}>Senha</label>
            <input className="inp" type="password" value={senha} onChange={e => setSenha(e.target.value)} required placeholder="••••••••"
              style={{ width:"100%", padding:"13px 16px", borderRadius:8, border:"1.5px solid #dde8ee", fontSize:14, color:"#021d34", fontFamily:"'Outfit',sans-serif", transition:"border-color 0.2s" }} />
          </div>

          {erro && (
            <div style={{ background:"#FFF1F1", border:"1px solid #fca5a5", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#b91c1c" }}>
              {erro}
              {erro.includes("Confirme") && (
                <button type="button" onClick={reenviarEmail} style={{ display:"block", marginTop:6, fontSize:12, color:"#012e46", fontWeight:700, background:"none", border:"none", cursor:"pointer", padding:0, textDecoration:"underline" }}>
                  Reenviar e-mail de confirmação
                </button>
              )}
            </div>
          )}
          {emailEnviado && (
            <div style={{ background:"#F0FDF4", border:"1px solid #86efac", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#16a34a" }}>
              ✅ E-mail de confirmação reenviado! Verifique sua caixa de entrada.
            </div>
          )}

          <button className="btn-main" type="submit" disabled={loading}
            style={{ background:"#012e46", color:"#fff", padding:14, borderRadius:8, fontSize:14, fontWeight:800, border:"none", cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"all 0.2s", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <div style={{ marginTop:24, textAlign:"center" }}>
          <p style={{ fontSize:12, color:"#bbb", marginBottom:8 }}>Ainda não tem conta?</p>
          <Link to="/avaliacao" style={{ fontSize:13, fontWeight:700, color:"#012e46", textDecoration:"none" }}>
            Fazer avaliação gratuita →
          </Link>
        </div>
      </div>
    </div>
  );
}
