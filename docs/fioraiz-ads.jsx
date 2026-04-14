import { useState } from "react";

const ADS = {
  reels: {
    label: "Reels / TikTok",
    color: "#dc2626",
    icon: "🎬",
    scripts: [
      {
        id: "r1",
        titulo: "O espelho não mente",
        duracao: "30s",
        angulo: "Provocação + solução",
        hook: "Você olha pro espelho e finge que não viu.",
        roteiro: `[0-3s] HOOK — texto na tela:
"Você olha pro espelho e finge que não viu."

[3-8s] VOZ + LEGENDA:
"Todo homem que está perdendo cabelo sabe exatamente o que está acontecendo. Só que a maioria espera. E esperar é o pior erro."

[8-15s] PROBLEMA:
"A calvície masculina não para sozinha. Cada mês sem tratar é um mês que não volta."

[15-22s] SOLUÇÃO:
"Finasterida e minoxidil são os únicos tratamentos com comprovação científica real. A Fio Raiz conecta você a um médico online — sem consultório, sem fila."

[22-28s] PROVA SOCIAL:
"9 em cada 10 homens travam a queda. Mais de [X] homens já começaram."

[28-30s] CTA:
"Avaliação gratuita em fioraiz.com.br"
Texto na tela: "3 minutos. Resultado real."`,
        notas: "Gravar com iPhone em luz natural. Sem fundo clínico. Tom de conversa, não de comercial."
      },
      {
        id: "r2",
        titulo: "Quanto tempo você ainda vai esperar?",
        duracao: "15s",
        angulo: "Urgência emocional",
        hook: "Quanto tempo você ainda vai fingir que não está acontecendo?",
        roteiro: `[0-3s] HOOK — voz direta, sem música:
"Quanto tempo você ainda vai fingir que não está acontecendo?"

[3-8s]:
"Calvície masculina tem tratamento. Tem ciência. Tem resultado."

[8-12s]:
"Fio Raiz. Médico online. Tratamento em casa."

[12-15s] CTA:
"Avaliação gratuita. 3 minutos."
→ Link na bio / swipe up`,
        notas: "Sem trilha sonora ou trilha muito baixa. A força é na voz. Corte rápido entre frases."
      },
      {
        id: "r3",
        titulo: "Antes que piore",
        duracao: "45s",
        angulo: "Educativo + autoridade",
        hook: "O erro que 9 em cada 10 homens cometem quando percebem que estão perdendo cabelo.",
        roteiro: `[0-4s] HOOK:
"O erro que 9 em cada 10 homens cometem quando percebem que estão perdendo cabelo."

[4-12s] ERRO:
"Esperam. Compram shampoo caro. Tentam suplemento. Esperam mais. Aí já perderam 2 anos."

[12-22s] CIÊNCIA:
"Os únicos tratamentos com evidência científica real são finasterida e minoxidil. Prescritos por médicos. Usados no mundo inteiro há décadas."

[22-32s] COMO FUNCIONA:
"Na Fio Raiz você responde um questionário em 3 minutos. Um médico avalia. O tratamento chega em casa."

[32-40s] PROVA:
"Sem consultório. Sem fila. Sem constrangimento. Embalagem discreta."

[40-45s] CTA:
"Avaliação gratuita em fioraiz.com.br"`,
        notas: "Bom para campanha de awareness. Pode virar carrossel também."
      }
    ]
  },

  stories: {
    label: "Stories",
    color: "#7c3aed",
    icon: "📱",
    scripts: [
      {
        id: "s1",
        titulo: "Quiz direto",
        duracao: "10s",
        angulo: "Curiosidade + CTA",
        hook: "Você se qualifica para o tratamento?",
        roteiro: `[Tela única — estático ou com animação leve]

TEXTO GRANDE:
"Você se qualifica para o tratamento?"

SUBTEXTO:
"3 perguntas. Resultado em segundos."

CTA SWIPE:
"👆 Descubra agora"

[Cor de fundo: preto]
[Tipografia: bold, branco]
[Logo Fio Raiz no canto superior]`,
        notas: "A/B testar fundo preto vs. fundo branco. Swipe up direto para o quiz."
      },
      {
        id: "s2",
        titulo: "Prova social rápida",
        duracao: "8s",
        angulo: "Depoimento estilizado",
        hook: "\"Fiz tudo pelo celular em 10 minutos.\"",
        roteiro: `[Tela 1 — 4s]
ASPAS GRANDES:
"Fiz tudo pelo celular em 10 minutos. O tratamento chegou em 3 dias."
— Bruno, 29 anos

[Tela 2 — 4s]
LOGO FIO RAIZ
"Avaliação gratuita"
→ Swipe up`,
        notas: "Usar depoimentos reais dos primeiros clientes beta. Fonte grande, fundo escuro."
      },
      {
        id: "s3",
        titulo: "Dado científico",
        duracao: "6s",
        angulo: "Autoridade científica",
        hook: "9 em cada 10",
        roteiro: `[Animação de número crescendo até 9/10]

NÚMERO GRANDE: "9/10"
SUBTEXTO: "homens travam a queda com finasterida"

RODAPÉ: "Fonte: estudos clínicos publicados"

CTA: "Fio Raiz — avaliação gratuita"`,
        notas: "Testar versão com e sem fonte científica no rodapé."
      }
    ]
  },

  feed: {
    label: "Feed / Carrossel",
    color: "#2563eb",
    icon: "🖼️",
    scripts: [
      {
        id: "f1",
        titulo: "Os 4 erros",
        duracao: "Carrossel 5 slides",
        angulo: "Educativo — lista",
        hook: "4 erros que fazem você perder cabelo mais rápido",
        roteiro: `[SLIDE 1 — CAPA]
"4 erros que fazem você perder cabelo mais rápido."
Subtexto: "Você provavelmente está cometendo pelo menos 2."
[Fundo preto, texto branco]

[SLIDE 2]
Erro 1: Esperar
"A calvície não para sozinha. Cada mês sem tratar, mais fios que não voltam."

[SLIDE 3]
Erro 2: Confiar em shampoo anticaída
"Shampoo não trata calvície androgenética. Só limpa o cabelo — muito bem."

[SLIDE 4]
Erro 3: Tentar um tratamento por vez
"Finasterida age no hormônio. Minoxidil age no folículo. Juntos: +90% de eficácia."

[SLIDE 5 — CTA]
"Corrija agora."
Logo Fio Raiz
"Avaliação gratuita em fioraiz.com.br"
[Botão: Fazer avaliação]`,
        notas: "Ótimo para salvar e compartilhar. Testar variação com tom mais bem-humorado no erro do shampoo."
      },
      {
        id: "f2",
        titulo: "Antes e depois — processo",
        duracao: "Carrossel 4 slides",
        angulo: "Jornada do cliente",
        hook: "Como funciona o tratamento Fio Raiz",
        roteiro: `[SLIDE 1 — CAPA]
"Da queda ao controle. Como funciona."

[SLIDE 2]
Passo 1: Questionário
"3 minutos. Sem sair de casa."
Ícone: celular

[SLIDE 3]
Passo 2: Médico avalia
"Um especialista lê seu caso e prescreve o tratamento certo."
Ícone: médico

[SLIDE 4]
Passo 3: Tratamento em casa
"Fórmula manipulada, embalagem discreta, entrega em até 3 dias."
CTA: "Avaliação gratuita → fioraiz.com.br"`,
        notas: "Usar ilustrações minimalistas. Sem foto de cabelo ou médico de stock genérico."
      }
    ]
  },

  copy: {
    label: "Copy (texto do anúncio)",
    color: "#16a34a",
    icon: "✍️",
    scripts: [
      {
        id: "c1",
        titulo: "Copy curto — feed",
        duracao: "3 linhas",
        angulo: "Provocação direta",
        hook: "Você já sabe o que está acontecendo.",
        roteiro: `Você já sabe o que está acontecendo.

A questão é quanto tempo você ainda vai deixar.

Avaliação gratuita → fioraiz.com.br`,
        notas: "Melhor para cold audience. Testar com e sem emoji."
      },
      {
        id: "c2",
        titulo: "Copy médio — feed",
        duracao: "6 linhas",
        angulo: "Educativo + urgência",
        hook: "Calvície masculina tem tratamento comprovado.",
        roteiro: `Calvície masculina tem tratamento comprovado.

Não é shampoo. Não é suplemento. É finasterida + minoxidil — prescritos por médico, usados no mundo inteiro há décadas.

Na Fio Raiz você faz o questionário em 3 minutos, um médico avalia, e o tratamento chega em casa.

Sem consultório. Sem fila. Sem desculpa.

→ Avaliação gratuita em fioraiz.com.br`,
        notas: "Bom para retargeting. Funciona bem com imagem estática de produto."
      },
      {
        id: "c3",
        titulo: "Copy longo — conversão",
        duracao: "Parágrafo completo",
        angulo: "Storytelling + objeções",
        hook: "Fiquei 2 anos esperando a calvície parar sozinha.",
        roteiro: `"Fiquei 2 anos esperando a calvície parar sozinha."

Não parou.

A maioria dos homens espera. Testa shampoo. Testa suplemento. Espera mais. Aí olha pra trás e perdeu 3, 4 anos.

A ciência é clara: finasterida bloqueia o DHT, o hormônio que causa a queda. Minoxidil estimula o crescimento. Juntos, funcionam em mais de 90% dos homens.

A Fio Raiz conecta você a um médico especialista online. Sem consulta presencial. Sem fila. O tratamento é manipulado por farmácia certificada pela ANVISA e entregue na sua porta em embalagem discreta.

3 minutos de questionário. Avaliação médica real. Tratamento que funciona.

O único arrependimento de quem começa é não ter começado antes.

→ fioraiz.com.br — avaliação gratuita`,
        notas: "Ideal para retargeting quente e lookalike. Testar com depoimento real no início em vez de storytelling genérico."
      },
      {
        id: "c4",
        titulo: "Copy objeção — preço",
        duracao: "4 linhas",
        angulo: "Quebra de objeção",
        hook: "Mais barato do que você pensa.",
        roteiro: `Mais barato do que você pensa.

Tratamento completo (finasterida + minoxidil) a partir de R$ 99/mês.

Menos do que muita gente gasta em shampoo que não funciona.

→ fioraiz.com.br`,
        notas: "Usar para audiência que visitou o site mas não converteu."
      }
    ]
  },

  ugc: {
    label: "UGC / Influencer",
    color: "#ea580c",
    icon: "🎤",
    scripts: [
      {
        id: "u1",
        titulo: "Brief para criador de conteúdo",
        duracao: "30-60s",
        angulo: "Autêntico, pessoal",
        hook: "História pessoal de queda de cabelo",
        roteiro: `BRIEF PARA CRIADOR:

Tom: Natural, como se estivesse contando pra um amigo. NÃO parecer comercial.

Estrutura sugerida:

1. GANCHO (0-5s)
Algo pessoal sobre perceber a queda. Ex: "O dia que eu olhei a foto do meu aniversário e percebi..."

2. PROBLEMA (5-15s)
O que você tentou antes que não funcionou. Seja honesto.

3. DESCOBERTA (15-30s)
Como chegou na Fio Raiz. O processo (quiz, médico, entrega).

4. RESULTADO (30-45s)
O que mudou. Não precisa ser dramático — "parou de cair" já é suficiente.

5. CTA (45-60s)
"Link na bio" ou "fioraiz.com.br" — natural, não forçado.

PROIBIDO:
× Falar que é milagre ou cura
× Prometer resultado específico
× Usar jaleco ou cenário clínico genérico
× Tom de comercial dos anos 90

OBRIGATÓRIO:
✓ Mencionar que é tratamento com prescrição médica
✓ Dizer que resultados variam
✓ Mostrar o produto brevemente`,
        notas: "Pagar por vídeo, não por resultado. Pedir 2-3 versões de hook diferentes para testar."
      }
    ]
  }
};

function ScriptCard({ script, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid rgba(0,0,0,0.08)`, marginBottom: 10, background: "#fff", overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", background: color, padding: "3px 8px" }}>{script.duracao}</span>
            <span style={{ fontSize: 10, color: "#aaa", letterSpacing: "0.08em" }}>{script.angulo}</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{script.titulo}</div>
          <div style={{ fontSize: 12, color: "#888", fontStyle: "italic" }}>"{script.hook}"</div>
        </div>
        <span style={{ fontSize: 18, color: "#ccc", marginLeft: 12, flexShrink: 0, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </div>

      {open && (
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ background: "#1a1a1a", padding: "16px", fontFamily: "monospace", fontSize: 12, color: "#e5e5e5", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
            {script.roteiro}
          </div>
          <div style={{ background: "#fffbeb", padding: "12px 16px", borderTop: "1px solid #fcd34d" }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#92400e", letterSpacing: "0.1em", textTransform: "uppercase" }}>Nota de produção: </span>
            <span style={{ fontSize: 12, color: "#78350f" }}>{script.notas}</span>
          </div>
          <div style={{ padding: "12px 16px", display: "flex", gap: 8 }}>
            <button onClick={() => navigator.clipboard?.writeText(script.roteiro)} style={{ fontSize: 11, color: color, border: `1px solid ${color}`, background: "transparent", padding: "6px 14px", cursor: "pointer", fontFamily: "'Jost',sans-serif", letterSpacing: "0.08em" }}>
              Copiar roteiro
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdScripts() {
  const [activeTab, setActiveTab] = useState("reels");
  const tab = ADS[activeTab];

  return (
    <div style={{ minHeight: "100vh", background: "#F9F8F6", fontFamily: "'Jost',sans-serif", color: "#111" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&family=Cormorant+Garamond:wght@700&display=swap');`}</style>

      {/* Header */}
      <div style={{ background: "#111", padding: "20px 16px 0", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Fio Raiz</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Scripts de anúncios — Meta Ads</div>

        <div style={{ display: "flex", gap: 0, overflowX: "auto", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          {Object.entries(ADS).map(([key, val]) => (
            <button key={key} onClick={() => setActiveTab(key)} style={{
              padding: "10px 14px", background: "none", border: "none",
              borderBottom: activeTab === key ? `2px solid ${val.color}` : "2px solid transparent",
              color: activeTab === key ? "#fff" : "rgba(255,255,255,0.35)",
              fontSize: 11, fontWeight: 500, cursor: "pointer",
              fontFamily: "'Jost',sans-serif", whiteSpace: "nowrap",
              letterSpacing: "0.08em", textTransform: "uppercase"
            }}>{val.icon} {val.label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px" }}>
        <div style={{ background: tab.color + "15", border: `1px solid ${tab.color}30`, padding: "12px 16px", marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: tab.color, fontWeight: 600, marginBottom: 4 }}>{tab.icon} {tab.label}</div>
          <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>
            {activeTab === "reels" && "Vídeos curtos para Reels e TikTok. Prioridade máxima — maior alcance orgânico e pago."}
            {activeTab === "stories" && "Stories de 6-10 segundos. Alta frequência, baixo CPM. Bom para retargeting."}
            {activeTab === "feed" && "Carrosseis para feed. Alta taxa de salvamento e compartilhamento."}
            {activeTab === "copy" && "Textos para acompanhar qualquer criativo. Testar múltiplas versões sempre."}
            {activeTab === "ugc" && "Conteúdo gerado por criadores. Maior autenticidade, melhor conversão que produção própria."}
          </div>
        </div>

        {tab.scripts.map(s => <ScriptCard key={s.id} script={s} color={tab.color} />)}

        {/* Estratégia de testes */}
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", padding: "16px", marginTop: 8 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: 12 }}>Estratégia de testes A/B</div>
          {[
            ["Semana 1-2", "Testar 3 hooks diferentes no mesmo roteiro. Orçamento R$ 30/dia cada."],
            ["Semana 3", "Escalar os 2 melhores hooks. Cortar o pior. Novo teste de CTA."],
            ["Semana 4", "Winner de hook + winner de CTA. Escalar para R$ 150/dia."],
            ["Mês 2", "Introduzir UGC. Testar contra melhor criativo próprio."],
          ].map(([fase, desc], i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < 3 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
              <span style={{ fontSize: 11, color: "#aaa", minWidth: 70 }}>{fase}</span>
              <span style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>{desc}</span>
            </div>
          ))}
        </div>

        {/* Prompt para ChatGPT */}
        <div style={{ background: "#f0fdf4", border: "1px solid #86efac", padding: "16px", marginTop: 8 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#16a34a", marginBottom: 8 }}>Prompt para ChatGPT — gerar variações</div>
          <div style={{ fontSize: 12, color: "#166534", lineHeight: 1.7, fontFamily: "monospace", background: "#dcfce7", padding: 12 }}>
            {`Você é copywriter de performance especializado em saúde masculina no Brasil. Tom: provocador com afeto — amigo direto, não clínica.

Crie 5 variações de hook (primeiros 3 segundos) para um Reel sobre tratamento de calvície masculina.

Marca: Fio Raiz
Produto: finasterida + minoxidil via telemedicina
Diferencial: sem consultório, médico online, entrega em casa
Concorrente: Manual (manual.com.br)

Regras:
- Máximo 10 palavras por hook
- Sem mencionar concorrente
- Sem prometer cura
- Deve parar o scroll imediatamente`}
          </div>
        </div>
      </div>
    </div>
  );
}
