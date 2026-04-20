import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function LoginMedico() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
      if (error) throw error;

      // Verifica se é médico
      const { data: perfil, error: perfilError } = await supabase
        .from("perfis")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (perfilError || !["medico","admin"].includes(perfil?.role)) {
        await supabase.auth.signOut();
        throw new Error("Acesso restrito a médicos.");
      }

      navigate("/medico/dashboard");
    } catch (err) {
      setErro(err.message || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(150deg, #000a23 0%, #021d34 100%)",
      fontFamily: "'Outfit', sans-serif", padding: "20px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .login-input:focus{outline:none;border-color:#94b8d7!important;box-shadow:0 0 0 3px rgba(148,184,215,0.15);}
        .login-btn:hover:not(:disabled){background:#000a23!important;transform:translateY(-1px);}
        .login-btn:disabled{opacity:0.6;cursor:not-allowed;}
      `}</style>

      <div style={{
        background: "#fff", borderRadius: 20, padding: "44px 40px",
        width: "100%", maxWidth: 420,
        boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
      }}>
        {/* Logo / header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img src="/logo-v2.png" alt="Fio Raiz" style={{ height: 44, marginBottom: 16 }} />
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#94b8d7", marginBottom: 6 }}>
            Área Médica
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#021d34", letterSpacing: "-0.02em" }}>
            Acesso ao Painel
          </h1>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>
              E-mail
            </label>
            <input
              className="login-input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              style={{
                width: "100%", padding: "13px 16px", borderRadius: 8,
                border: "1.5px solid #dde8ee", fontSize: 14, color: "#021d34",
                fontFamily: "'Outfit', sans-serif", transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>
              Senha
            </label>
            <input
              className="login-input"
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: "100%", padding: "13px 16px", borderRadius: 8,
                border: "1.5px solid #dde8ee", fontSize: 14, color: "#021d34",
                fontFamily: "'Outfit', sans-serif", transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            />
          </div>

          {erro && (
            <div style={{
              background: "#FFF1F1", border: "1px solid #fca5a5", borderRadius: 8,
              padding: "10px 14px", fontSize: 13, color: "#b91c1c",
            }}>
              {erro}
            </div>
          )}

          <button
            className="login-btn"
            type="submit"
            disabled={loading}
            style={{
              background: "#012e46", color: "#fff", padding: "14px",
              borderRadius: 8, fontSize: 14, fontWeight: 800,
              border: "none", cursor: "pointer", marginTop: 4,
              fontFamily: "'Outfit', sans-serif", transition: "all 0.2s",
            }}>
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p style={{ fontSize: 11, color: "#bbb", textAlign: "center", marginTop: 24, lineHeight: 1.6 }}>
          Acesso exclusivo para médicos credenciados Fio Raiz
        </p>
      </div>
    </div>
  );
}
