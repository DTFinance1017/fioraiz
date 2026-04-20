import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function RotaMedico({ children }) {
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    async function check() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/medico/login"); return; }
      const { data: perfil } = await supabase
        .from("perfis").select("role").eq("id", user.id).single();
      if (!perfil || perfil.role !== "medico") { navigate("/medico/login"); return; }
      setOk(true);
    }
    check();
  }, []);

  if (!ok) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#021d34", fontFamily: "'Outfit',sans-serif" }}>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Verificando acesso…</div>
    </div>
  );

  return children;
}
