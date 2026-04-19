import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "fioraiz_popup_dismissed";

export default function PopupCTA() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  const handleCTA = () => {
    handleClose();
    navigate("/avaliacao");
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes popupIn {
          from { opacity:0; transform:translate(-50%,-48%) scale(0.93); }
          to   { opacity:1; transform:translate(-50%,-50%) scale(1); }
        }
        @keyframes overlayIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        .popup-close:hover { background:rgba(0,0,0,0.12)!important; }
        .popup-cta-btn:hover { background:#000a23!important; transform:translateY(-1px); }
        @media(max-width:480px){
          .popup-box { padding:36px 24px 28px!important; }
        }
      `}</style>

      {/* Overlay */}
      <div
        onClick={handleClose}
        style={{
          position:"fixed", inset:0, zIndex:1000,
          background:"rgba(2,29,52,0.55)", backdropFilter:"blur(6px)",
          animation:"overlayIn 0.25s ease",
        }}
      />

      {/* Box */}
      <div className="popup-box" style={{
        position:"fixed", top:"50%", left:"50%", zIndex:1001,
        transform:"translate(-50%,-50%)",
        background:"#fff", borderRadius:24,
        padding:"44px 40px 36px",
        maxWidth:460, width:"90%",
        boxShadow:"0 32px 80px rgba(2,29,52,0.22)",
        fontFamily:"'Outfit',sans-serif",
        textAlign:"center",
        animation:"popupIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}>

        {/* Botão fechar */}
        <button
          className="popup-close"
          onClick={handleClose}
          aria-label="Fechar"
          style={{
            position:"absolute", top:14, right:14,
            background:"rgba(0,0,0,0.07)", border:"none",
            borderRadius:"50%", width:34, height:34,
            cursor:"pointer", display:"flex", alignItems:"center",
            justifyContent:"center", fontSize:15, color:"#555",
            transition:"background 0.2s",
          }}>✕</button>

        {/* Badge */}
        <div style={{
          display:"inline-block",
          fontSize:10, fontWeight:800, letterSpacing:"0.14em",
          textTransform:"uppercase", color:"#012e46",
          background:"#EDF5F8", padding:"5px 14px",
          borderRadius:100, marginBottom:18,
        }}>Fio Raiz</div>

        {/* Headline */}
        <h2 style={{
          fontSize:"clamp(20px,4vw,26px)", fontWeight:800,
          color:"#021d34", letterSpacing:"-0.02em",
          lineHeight:1.2, marginBottom:12,
        }}>
          Existe tratamento para<br/>a sua queda de cabelo.
        </h2>

        {/* Subtítulo */}
        <p style={{
          fontSize:14, color:"#666", lineHeight:1.75,
          maxWidth:340, margin:"0 auto 28px",
        }}>
          Avaliação gratuita, 100% online e sem compromisso. Protocolo personalizado entregue na sua porta.
        </p>

        {/* CTA principal */}
        <button
          className="popup-cta-btn"
          onClick={handleCTA}
          style={{
            background:"#012e46", color:"#fff",
            padding:"15px 28px", borderRadius:8,
            fontSize:14, fontWeight:800, border:"none",
            cursor:"pointer", fontFamily:"'Outfit',sans-serif",
            width:"100%", letterSpacing:"-0.01em",
            transition:"background 0.2s, transform 0.15s",
          }}>
          Clique aqui e faça sua avaliação gratuita →
        </button>

        {/* Rodapé discreto */}
        <p style={{ fontSize:11, color:"#bbb", marginTop:14, lineHeight:1.5 }}>
          Sem cartão de crédito · Sem compromisso
        </p>
      </div>
    </>
  );
}
