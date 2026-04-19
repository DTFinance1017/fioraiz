import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FioLogo({ color = "#021d34", size = 20 }) {
  const navigate = useNavigate();
  const isWhite = color === "#fff";
  return (
    <div onClick={() => navigate("/")} style={{ display:"flex", alignItems:"center", cursor:"pointer", userSelect:"none", WebkitTapHighlightColor:"transparent" }} role="link" aria-label="Home">
      <img src="/logo-v2.png" alt="Fio Raiz" style={{ height: size * 2.8, width:"auto", display:"block", filter: isWhite ? "brightness(0) invert(1)" : "none" }} />
    </div>
  );
}

// Paleta de cores para cards de imagem (gradientes)
const GRADIENTS = {
  calvicie:     "linear-gradient(135deg, #1A3040 0%, #004358 60%, #006680 100%)",
  ciclo:        "linear-gradient(135deg, #2d4a1e 0%, #3d6b28 60%, #5a9e3a 100%)",
  minoxidil:    "linear-gradient(135deg, #1a2a4a 0%, #203560 60%, #2e4d8c 100%)",
  finasterida:  "linear-gradient(135deg, #3a1a1a 0%, #5c2121 60%, #8c3131 100%)",
  dutasterida:  "linear-gradient(135deg, #2a1a40 0%, #3f2060 60%, #5e308a 100%)",
  "saw-palmetto":"linear-gradient(135deg, #1a3a20 0%, #1f5028 60%, #2d7038 100%)",
  biotina:      "linear-gradient(135deg, #3a2a0a 0%, #5a4210 60%, #8a651a 100%)",
  cuidados:     "linear-gradient(135deg, #021d34 0%, #153f59 60%, #365b77 100%)",
};

const CARD_IMAGES = {
  calvicie:      "/alopecia.jpg",
  ciclo:         "/fases.jpg",
  minoxidil:     "/minoxidil.jpg",
  finasterida:   "/finasterida.jpg",
  dutasterida:   "/dutasterida.jpg",
  "saw-palmetto": "/saw-palmetto.jpg",
  biotina:       "/biotina.jpg",
  cuidados:      "/kit.jpg",
};

const CARD_ICONS = {
  calvicie:     { emoji: "🧬", label: "Calvície", sublabel: "Alopecia Androgenética" },
  ciclo:        { emoji: "🔄", label: "Ciclo Capilar", sublabel: "Anágena · Catágena · Telógena" },
  minoxidil:    { emoji: "💧", label: "Minoxidil", sublabel: "Vasodilatador capilar" },
  finasterida:  { emoji: "💊", label: "Finasterida", sublabel: "Inibidor 5-alfa redutase II" },
  dutasterida:  { emoji: "⚡", label: "Dutasterida", sublabel: "Inibidor dual — máxima potência" },
  "saw-palmetto":{ emoji: "🌿", label: "Saw Palmetto", sublabel: "Rota fitoterápica" },
  biotina:      { emoji: "🌱", label: "Biotina", sublabel: "Vitaminas & nutrição capilar" },
  cuidados:     { emoji: "🧴", label: "Cuidados", sublabel: "Rotina diária completa" },
};

const ARTICLES = [
  {
    id: "calvicie",
    icon: "🧬",
    label: "Calvície Masculina",
    tag: "Essencial",
    tagColor: "#012e46",
    title: "Calvície Masculina: o guia completo",
    subtitle: "O que é, como detectar cedo, e como agir antes que piore",
    readTime: "8 min",
    sections: [
      {
        heading: "O que é a calvície masculina?",
        body: `A calvície masculina — tecnicamente chamada de Alopecia Androgenética (AGA) — é a forma mais comum de queda de cabelo em homens. Ela é causada pela ação de um hormônio chamado DHT (di-hidrotestosterona) nos folículos capilares geneticamente sensíveis a ele.\n\nCom o tempo, o DHT miniaturiza progressivamente esses folículos: os fios ficam mais finos, crescem menos, e com o tempo param de crescer. O processo é lento, mas irreversível se não tratado.\n\nA boa notícia: é uma das condições mais estudadas na medicina. Existem tratamentos com eficácia comprovada por décadas de ensaios clínicos.`,
      },
      {
        heading: "O ciclo capilar — e como a calvície o quebra",
        body: `Cada fio do seu cabelo passa por um ciclo com três fases:\n\n**Anágena (crescimento):** dura de 2 a 7 anos. É quando o fio cresce ativamente. Em folículos saudáveis, 85–90% dos fios estão nessa fase.\n\n**Catágena (transição):** curta, de 2 a 3 semanas. O fio para de crescer e o folículo se contrai.\n\n**Telógena (repouso/queda):** dura 3 a 4 meses. O fio cai e o ciclo reinicia.\n\nNa calvície androgenética, o DHT encurta progressivamente a fase anágena — o fio passa cada vez menos tempo crescendo e mais tempo caindo.`,
      },
      {
        heading: "Como detectar cedo",
        body: `Os primeiros sinais geralmente aparecem entre os 18 e 30 anos. Quanto mais cedo identificados, mais fácil é frear a progressão.\n\n**Sinais de alerta iniciais:**\n• Entradas (recessão temporal) ficando mais marcadas\n• Fios mais ralos no alto da cabeça (vértice)\n• Fios visivelmente mais finos do que eram\n• Mais cabelo na travesseira, no ralo ou na escova\n• Couro cabeludo mais visível sob luz forte\n\nA escala de Norwood-Hamilton classifica a calvície em 7 estágios — do I (sem recuo aparente) ao VII (calvície extensa). Quanto menor o estágio ao iniciar o tratamento, melhor o prognóstico.`,
      },
      {
        heading: "Fatores de risco",
        body: `**Genética:** é o fator principal. Se seu pai, avô paterno ou tios maternos têm calvície, seu risco é significativamente maior. Mas genética não é destino — é risco.\n\n**Hormônios:** níveis elevados de DHT aceleram o processo em pessoas geneticamente predispostas.\n\n**Idade:** 25% dos homens com 25 anos, 50% com 50 anos e 70% com 70 anos apresentam algum grau de AGA.\n\n**Estresse e dieta:** não causam AGA, mas podem acelerar outros tipos de queda que somam-se à calvície androgenética.`,
      },
      {
        heading: "O que fazer antes que piore",
        body: `A regra de ouro é: **agir cedo**. A ciência é clara — é muito mais fácil manter o cabelo que você tem do que recuperar o que perdeu.\n\n1. **Reconheça os sinais** — entradas progressivas, rarefação no vértice, fios mais finos\n2. **Consulte um profissional** — dermatologista ou médico com experiência em tricologia\n3. **Inicie o tratamento com ativos comprovados** — Finasterida, Dutasterida, Minoxidil\n4. **Seja consistente** — o tratamento funciona enquanto é mantido\n5. **Não perca tempo com promessas sem evidência** — shampoos anticaspa genéricos e lasers de baixa potência não travam AGA`,
      },
    ],
  },
  {
    id: "ciclo",
    icon: "🔄",
    label: "Ciclo Capilar",
    tag: "Fundamentos",
    tagColor: "#2d6a1e",
    title: "Guia Completo do Ciclo Capilar",
    subtitle: "Entenda como seu cabelo nasce, cresce e cai — e o que interfere nisso",
    readTime: "6 min",
    sections: [
      {
        heading: "O folículo capilar — a raiz de tudo",
        body: `O folículo capilar é uma estrutura tubular na derme responsável por produzir o fio de cabelo. Cada couro cabeludo tem entre 100.000 e 150.000 folículos. Uma vez destruídos definitivamente, não regeneram.\n\nO fio é composto majoritariamente por queratina, produzida por queratinócitos. A cor vem dos melanócitos, presentes na base do folículo.`,
      },
      {
        heading: "As três fases do ciclo capilar",
        body: `**1. Fase Anágena — crescimento ativo**\nDuração: 2 a 7 anos. O fio cresce cerca de 1 cm por mês. 85–90% dos fios estão nessa fase simultaneamente.\n\n**2. Fase Catágena — transição**\nDuração: 2 a 3 semanas. O folículo regride, o crescimento para. 1–2% dos fios estão aqui.\n\n**3. Fase Telógena — repouso e queda**\nDuração: 3 a 4 meses. O fio entra em repouso e cai — cedendo lugar ao novo ciclo. Perder 50–100 fios/dia é fisiologicamente normal.`,
      },
      {
        heading: "O que interfere negativamente no ciclo",
        body: `**DHT (calvície androgenética):** encurta a fase anágena progressivamente\n\n**Deficiências nutricionais:** ferro, vitamina D, biotina e zinco insuficientes\n\n**Estresse agudo:** pode desencadear eflúvio telógeno — aumento repentino de fios em queda\n\n**Tireoide desregulada:** hipo e hipertireoidismo causam queda difusa\n\n**Medicamentos:** quimioterapia, anticoagulantes, excesso de vitamina A\n\n**Dietas extremas:** restrição calórica severa ou jejum prolongado`,
      },
      {
        heading: "Como otimizar seu ciclo capilar",
        body: `**Nutrição:** proteína adequada (1,2–1,6g/kg/dia), ferro sérico acima de 70 ng/mL, vitamina D entre 40–60 ng/mL.\n\n**Sono:** o hormônio do crescimento — essencial para proliferação celular folicular — é liberado nas fases profundas do sono.\n\n**Redução do DHT:** Finasterida ou Dutasterida prolongam a fase anágena ao bloquear a conversão de testosterona em DHT.\n\n**Minoxidil:** estimula vasodilatação perifolicular e prolonga a fase anágena independentemente do mecanismo hormonal.`,
      },
    ],
  },
  {
    id: "minoxidil",
    icon: "💧",
    label: "Minoxidil",
    tag: "Aprovado Anvisa",
    tagColor: "#1a3585",
    title: "Minoxidil: tudo o que você precisa saber",
    subtitle: "Como funciona, resultados esperados, tópico vs oral, efeitos colaterais",
    readTime: "7 min",
    sections: [
      {
        heading: "O que é o Minoxidil",
        body: `Minoxidil é um vasodilatador originalmente desenvolvido nos anos 1970 para hipertensão arterial severa. Quando pacientes relataram crescimento de pelos como efeito colateral, pesquisadores investigaram o potencial capilar.\n\nHoje é um dos dois únicos ativos aprovados pela FDA especificamente para alopecia androgênica. O outro é a Finasterida.\n\nNo Brasil, disponível em formulações tópicas e em microdoses orais prescritas por médicos.`,
      },
      {
        heading: "Como funciona",
        body: `**Vasodilatação perifolicular:** aumenta o fluxo sanguíneo ao redor dos folículos, melhorando o aporte de oxigênio e nutrientes.\n\n**Prolongamento da fase anágena:** os folículos passam mais tempo na fase de crescimento ativo.\n\n**Abertura dos canais de potássio:** interfere na sinalização celular dentro do folículo.\n\n**Importante:** Minoxidil não bloqueia o DHT. Ele estimula o crescimento independentemente da causa da queda.`,
      },
      {
        heading: "Tópico vs Oral — qual a diferença?",
        body: `**Minoxidil tópico (5%):**\n• Aplicado diretamente no couro cabeludo\n• Menos absorção sistêmica — menos efeitos colaterais\n• 5% mais eficaz que 2% em homens (evidência NEJM)\n• Pode causar dermatite de contato em pele sensível\n\n**Minoxidil oral (microdose 0,5–2,5mg/dia):**\n• Administração simplificada — 1 comprimido/dia\n• Maior biodisponibilidade sistêmica\n• Estudo de 2019 no JAAD mostrou eficácia significativa em doses baixas\n• Monitoramento periódico da pressão arterial recomendado`,
      },
      {
        heading: "Timeline de resultados",
        body: `**Mês 1–2:** Aumento temporário na queda (shedding inicial) — normal, os folículos estão sendo reiniciados.\n\n**Mês 3–4:** Primeiros fios novos surgem — finos e macios inicialmente.\n\n**Mês 6:** Melhora visível em quem responde bem. 60–70% dos pacientes reportam resultado positivo.\n\n**Mês 12:** Resultado mais consolidado. A densidade continua melhorando até o 12º mês.\n\n**Após 12 meses:** Fase de manutenção — parar o Minoxidil = retorno progressivo à queda em 3–6 meses.`,
      },
    ],
  },
  {
    id: "finasterida",
    icon: "💊",
    label: "Finasterida",
    tag: "Aprovado Anvisa",
    tagColor: "#8c1a1a",
    title: "Finasterida: mecanismo, eficácia e o que esperar",
    subtitle: "O inibidor da 5-alfa redutase tipo II mais estudado do mundo para calvície",
    readTime: "7 min",
    sections: [
      {
        heading: "O que é a Finasterida",
        body: `Finasterida é um inibidor da enzima 5-alfa redutase tipo II, responsável por converter testosterona em DHT. Ao bloquear essa conversão, reduz o DHT no couro cabeludo em até 70%.\n\nAprovada pela FDA em 1997 na dose de 1mg para alopecia androgenética masculina.\n\nÉ, junto ao Minoxidil, o tratamento de primeira linha mais prescrito no mundo para calvície masculina.`,
      },
      {
        heading: "Como funciona",
        body: `O DHT é produzido nos folículos capilares, próstata e pele pela ação da 5-alfa redutase tipo II sobre a testosterona.\n\nNos folículos geneticamente sensíveis, o DHT encurta a fase anágena e miniaturiza o fio. Ao inibir a enzima em ~70%, a Finasterida atua na raiz hormonal do problema.\n\nDiferente do Minoxidil — que estimula o crescimento independente da causa — a Finasterida combate o mecanismo central da AGA.`,
      },
      {
        heading: "Eficácia — o que os estudos mostram",
        body: `Estudo publicado no Journal of the American Academy of Dermatology, 1.553 homens acompanhados por 5 anos:\n\n• **83%** mantiveram ou aumentaram a contagem de fios\n• **66%** tiveram crescimento visível de cabelo\n• **17%** continuaram perdendo cabelo (versus 100% no grupo placebo)\n\nEstudo de 10 anos: 99% dos pacientes que usaram Finasterida continuamente mantiveram ou melhoraram o resultado.`,
      },
      {
        heading: "Efeitos colaterais — sem alarmismo",
        body: `Efeitos sexuais (disfunção erétil, redução de libido) foram reportados em 1,8% dos pacientes nos estudos versus 1,3% no grupo placebo.\n\nNa grande maioria dos casos, são reversíveis com a descontinuação.\n\n**Contexto:** estudos populacionais com centenas de milhares de pacientes mostram que a taxa de efeitos persistentes é muito menor do que a percepção online sugere. A decisão deve ser feita com seu médico.\n\n**Nota:** contraindicada para mulheres em idade fértil e crianças.`,
      },
    ],
  },
  {
    id: "dutasterida",
    icon: "⚡",
    label: "Dutasterida",
    tag: "Alta Potência",
    tagColor: "#5e1a8a",
    title: "Dutasterida: o inibidor de maior potência",
    subtitle: "Bloqueia 90% do DHT — para casos avançados ou sem resposta à Finasterida",
    readTime: "6 min",
    sections: [
      {
        heading: "O que é a Dutasterida",
        body: `Dutasterida é um inibidor dual da 5-alfa redutase — bloqueia os tipos I e II da enzima. Enquanto a Finasterida inibe apenas o tipo II (redução de ~70% do DHT), a Dutasterida reduz em até 90–95%.\n\nAprovada pela FDA em 2001 para hiperplasia prostática benigna. Para AGA, aprovada no Japão e Coreia do Sul — e usada off-label no Brasil com prescrição médica.`,
      },
      {
        heading: "Dutasterida vs Finasterida",
        body: `Estudo comparativo (British Journal of Dermatology, 2006):\n\n• Dutasterida mostrou **eficácia superior** na redução de DHT e crescimento capilar\n• Contagem de fios significativamente maior no grupo Dutasterida em 24 semanas\n\n**Quando considerar:**\n• Sem resposta satisfatória à Finasterida após 12 meses\n• Progressão rápida com histórico familiar agressivo\n• Estágio de calvície mais avançado\n\n**Meia-vida:** ~5 semanas (vs ~6h da Finasterida) — leva mais tempo para sair do organismo.`,
      },
      {
        heading: "Evidências clínicas",
        body: `Estudo de fase III, Coreia do Sul, 153 homens (JAAD, 2016):\n\n• Crescimento significativamente superior ao placebo em 6 e 12 meses\n• Melhora na contagem total de fios e no diâmetro do fio\n• Boa tolerabilidade com perfil de segurança semelhante à Finasterida\n\nEstudos japoneses levaram à aprovação regulatória local — reconhecimento oficial para AGA.`,
      },
      {
        heading: "Efeitos colaterais e considerações",
        body: `Perfil semelhante à Finasterida. Reportados em minoria dos pacientes:\n• Redução de libido\n• Disfunção erétil\n• Alteração de volume ejaculatório\n• Ginecomastia (rara)\n\n**Importante:** reduz PSA (antígeno prostático específico) — pode mascarar diagnóstico de câncer de próstata. Informe seu médico que está em uso.`,
      },
    ],
  },
  {
    id: "saw-palmetto",
    icon: "🌿",
    label: "Saw Palmetto",
    tag: "Fitoterápico",
    tagColor: "#1e5a28",
    title: "Saw Palmetto: a via natural para quem não quer sintético",
    subtitle: "O ativo fitoterápico com evidência mais robusta para calvície androgenética",
    readTime: "5 min",
    sections: [
      {
        heading: "O que é o Saw Palmetto",
        body: `Saw Palmetto (Serenoa repens) é uma palmeira nativa do sudeste dos EUA. Seu extrato contém ácidos graxos livres e esteróis com atividade inibitória sobre a 5-alfa redutase.\n\nÉ o fitoterápico mais estudado para alopecia androgenética e hiperplasia prostática benigna — e a principal alternativa para quem prefere não usar medicação sintética.`,
      },
      {
        heading: "Como funciona e o que a ciência diz",
        body: `O Saw Palmetto inibe a 5-alfa redutase (tipos I e II), reduzindo a conversão de testosterona em DHT — mecanismo similar ao da Finasterida, com potência menor.\n\n**Revisão sistemática (Journal of Alternative and Complementary Medicine, 2012):** 7 estudos avaliados, melhora em 60% dos pacientes após 24 semanas.\n\n**Comparativo direto (Rossi et al., 2012):** Saw Palmetto 320mg vs Finasterida 1mg — 38% vs 68% com melhora. A Finasterida foi superior, mas o Saw Palmetto mostrou benefício real com excelente tolerabilidade.`,
      },
      {
        heading: "Quando considerar",
        body: `• Preferência por rota fitoterápica sem medicamento sintético\n• Contraindicação ou intolerância à Finasterida/Dutasterida\n• Complemento a outros ativos em protocolo combinado\n• Estágio inicial de queda com histórico familiar moderado\n\n**Dose estudada:** 320mg/dia de extrato padronizado (80–90% ácidos graxos), geralmente em 2 tomadas.\n\n**Prazo de resposta:** 6 a 12 meses — mais longo do que com sintéticos.`,
      },
      {
        heading: "Perfil de segurança",
        body: `Perfil de segurança muito favorável. Efeitos adversos reportados são gastrointestinais leves (náusea, desconforto) quando tomado sem alimentação.\n\nNão há evidências de efeitos sexuais adversos na mesma magnitude dos sintéticos.\n\n**Interações:** pode interagir com anticoagulantes (varfarina) — informe sempre seu médico.`,
      },
    ],
  },
  {
    id: "biotina",
    icon: "🌱",
    label: "Biotina",
    tag: "Nutrição",
    tagColor: "#7a5010",
    title: "Biotina: o papel real das vitaminas no cabelo",
    subtitle: "O que a ciência diz de verdade — sem exagero de marketing",
    readTime: "5 min",
    sections: [
      {
        heading: "O que é a Biotina",
        body: `Biotina (vitamina B7 ou vitamina H) é uma vitamina hidrossolúvel essencial para o metabolismo de carboidratos, gorduras e proteínas. Está envolvida na síntese de queratina — a proteína que forma o fio.\n\nEncontrada em ovos, nozes, sementes, carnes e vegetais verdes. Deficiência real é rara em pessoas com dieta equilibrada.`,
      },
      {
        heading: "O que a ciência realmente mostra",
        body: `Honestidade é necessária aqui: **a biotina só beneficia o cabelo quando há deficiência documentada**.\n\nRevisão sistemática (Skin Appendage Disorders, 2017), 18 estudos analisados:\n• Todos os casos com melhora documentada tinham **deficiência comprovada** ou doença rara associada\n• **Não há evidência robusta** de que suplementação melhore o cabelo em pessoas com níveis normais\n\nA biotina é suporte nutricional — não tratamento de AGA.`,
      },
      {
        heading: "Quem pode se beneficiar",
        body: `• Pessoas com deficiência comprovada de biotina (exame de sangue)\n• Grávidas e lactantes\n• Dietas veganas restritivas\n• Usuários crônicos de antibióticos\n\n**No contexto da AGA:** não bloqueia DHT, não prolonga fase anágena, não substitui tratamentos comprovados. Como suporte nutricional complementar, contribui para a saúde geral do fio.`,
      },
      {
        heading: "Nutrição capilar completa",
        body: `**Com papel documentado:**\n• **Ferro:** ferritina abaixo de 40 ng/mL associada à queda difusa. Alvo: acima de 70 ng/mL\n• **Vitamina D:** deficiência comum no Brasil. Alvo: 40–60 ng/mL\n• **Zinco:** cofator essencial para síntese de queratina\n• **Vitamina B12:** especialmente importante para vegetarianos\n\n**Atenção:** exames de rotina devem anteceder suplementação em dose elevada. Excesso de vitamina A causa queda.`,
      },
    ],
  },
  {
    id: "cuidados",
    icon: "🧴",
    label: "Guia de Cuidados",
    tag: "Rotina",
    tagColor: "#365b77",
    title: "Guia completo de cuidados pessoais",
    subtitle: "Rotina diária, o que evitar e como maximizar os resultados do tratamento",
    readTime: "6 min",
    sections: [
      {
        heading: "Lavagem e higiene — mitos e verdades",
        body: `**Frequência ideal:** couro oleoso: lavar diariamente ou a cada dois dias. Couro seco: 2 a 3 vezes por semana.\n\n**Shampoos com cetoconazol 2%:** mostraram efeito antiandrogênico local em estudos — uso como coadjuvante, não como tratamento principal.\n\n**Temperatura:** água muito quente resseca o fio e irrita o couro cabeludo. Preferir morna no enxágue.\n\n**Mito derrubado:** "Lavar com frequência causa calvície." Falso — calvície é determinada pelo DHT e genética.`,
      },
      {
        heading: "Secagem e manipulação",
        body: `**Secador:** temperatura média, distância mínima de 15 cm. Calor excessivo danifica a cutícula do fio.\n\n**Toalha:** evite esfregar vigorosamente — pressione suavemente. Fios úmidos são mais vulneráveis.\n\n**Penteado e tração:** estilos que tracionam o couro (tranças apertadas, topetes) podem causar alopecia por tração — reversível se cessada a tempo.`,
      },
      {
        heading: "Nutrição para o cabelo",
        body: `O cabelo é tecido metabolicamente ativo — mas "não essencial" para o organismo. Em déficit nutricional, é um dos primeiros privados de recursos.\n\n**Incluir:**\n• Proteína completa: frango, ovos, peixe, leguminosas\n• Ômega-3: sardinha, salmão, linhaça — reduz inflamação perifolicular\n• Antioxidantes: vegetais coloridos, frutas vermelhas\n• Hidratação adequada\n\n**Evitar:**\n• Dietas abaixo de 1.200 kcal/dia desencadeiam eflúvio telógeno\n• Excesso de álcool prejudica absorção de zinco e vitaminas B`,
      },
      {
        heading: "Rotina com tratamento — como integrar",
        body: `**Minoxidil tópico:**\n• Aplique no couro cabeludo SECO\n• Espere 30–60 min antes de lavar\n• Consistência é mais importante do que horário perfeito\n\n**Finasterida/Dutasterida:**\n• Mesmo horário todos os dias facilita aderência\n• Com ou sem alimentação — sem diferença de absorção\n• Não pule doses — efeito é cumulativo\n\n**Acompanhamento:**\n• Avaliação clínica a cada 3–6 meses no início\n• Fotos padronizadas são a melhor forma de monitorar evolução`,
      },
    ],
  },
];

export default function Comunidade() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const active = ARTICLES.find(a => a.id === activeId);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    setOpenSections({});
    if (activeId) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeId]);

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const c = {
    page: { fontFamily:"'Outfit',sans-serif", background:"#F0F7FA", color:"#021d34", overflowX:"hidden", minHeight:"100vh" },
    nav: {
      position:"fixed", top:0, left:0, right:0, zIndex:200,
      padding:"0 5%", height:64,
      display:"flex", alignItems:"center", justifyContent:"space-between",
      background:"rgba(255,255,255,0.97)", backdropFilter:"blur(20px)",
      borderBottom:"1px solid rgba(0,0,0,0.07)",
      boxSizing:"border-box", width:"100%",
    },
    cta: { background:"#012e46", color:"#fff", padding:"11px 22px", borderRadius:6, fontSize:13, fontWeight:700, border:"none", cursor:"pointer", fontFamily:"'Outfit',sans-serif", whiteSpace:"nowrap" },
  };

  // ── Article view ─────────────────────────────────────────────────────────
  if (active) {
    const grad = GRADIENTS[active.id] || GRADIENTS.calvicie;
    return (
      <div style={c.page}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
          a{text-decoration:none;color:inherit;}
          .btn:hover{opacity:0.88!important;}
          .sec-toggle{cursor:pointer;user-select:none;transition:background 0.2s;}
          .sec-toggle:hover{background:#e8f2f6!important;}
          .show-mob{display:none;}
          @media(max-width:600px){.show-mob{display:flex!important;}.hide-mob{display:none!important;}}
        `}</style>
        <nav style={c.nav}>
          <FioLogo color="#021d34" size={20} />
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <button onClick={() => setActiveId(null)} style={{ background:"none", border:"none", fontSize:13, color:"#666", fontWeight:500, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }} className="hide-mob">← Comunidade</button>
            <button className="btn hide-mob" onClick={() => navigate("/avaliacao")} style={c.cta}>Avaliação</button>
            <button onClick={() => setMenuOpen(o => !o)}
              style={{ display:"none", background:"none", border:"none", cursor:"pointer", padding:8, flexDirection:"column", gap:5 }}
              className="show-mob">
              <span style={{ display:"block", width:22, height:2, background:"#021d34", borderRadius:2, transition:"all 0.25s", transform: menuOpen?"rotate(45deg) translate(5px,5px)":"none" }}/>
              <span style={{ display:"block", width:22, height:2, background:"#021d34", borderRadius:2, transition:"all 0.25s", opacity: menuOpen?0:1 }}/>
              <span style={{ display:"block", width:22, height:2, background:"#021d34", borderRadius:2, transition:"all 0.25s", transform: menuOpen?"rotate(-45deg) translate(5px,-5px)":"none" }}/>
            </button>
          </div>
        </nav>

        {/* Mobile drawer — artigo */}
        {menuOpen && (
          <div style={{ position:"fixed", inset:0, zIndex:199, background:"rgba(0,0,0,0.3)", backdropFilter:"blur(4px)" }}
            onClick={() => setMenuOpen(false)} />
        )}
        <div style={{
          position:"fixed", top:64, right:0, bottom:0, zIndex:200,
          width:"75vw", maxWidth:300, background:"#fff",
          boxShadow:"-8px 0 40px rgba(0,0,0,0.12)",
          transform: menuOpen?"translateX(0)":"translateX(100%)",
          transition:"transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          padding:"32px 28px", display:"flex", flexDirection:"column", gap:8,
        }}>
          <button onClick={() => { setMenuOpen(false); setActiveId(null); }}
            style={{ fontSize:18, fontWeight:500, color:"#555", padding:"14px 0", borderBottom:"1px solid rgba(0,0,0,0.06)", background:"none", border:"none", borderBottom:"1px solid rgba(0,0,0,0.06)", textAlign:"left", cursor:"pointer", fontFamily:"'Outfit',sans-serif", width:"100%" }}>
            ← Comunidade
          </button>
          {[["/","Início"],["quemsomos","Quem Somos"]].map(([h,l]) => (
            <a key={h} href={h} onClick={() => setMenuOpen(false)}
              style={{ fontSize:18, fontWeight:500, color:"#555", padding:"14px 0", borderBottom:"1px solid rgba(0,0,0,0.06)", display:"block" }}>{l}</a>
          ))}
          <button className="btn" onClick={() => { setMenuOpen(false); navigate("/avaliacao"); }}
            style={{ background:"#012e46", color:"#fff", padding:"16px 32px", borderRadius:6, fontSize:14, fontWeight:700, border:"none", cursor:"pointer", fontFamily:"'Outfit',sans-serif", marginTop:24, textAlign:"center", width:"100%" }}>
            Avaliação gratuita
          </button>
        </div>

        {/* Card hero do artigo */}
        <div style={{ paddingTop:64, background: grad }}>
          <div style={{ maxWidth:760, margin:"0 auto", padding:"48px 5% 40px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20, flexWrap:"wrap" }}>
              <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase",
                color:"rgba(255,255,255,0.9)", background:"rgba(255,255,255,0.18)", padding:"4px 12px", borderRadius:100, border:"1px solid rgba(255,255,255,0.2)" }}>
                Fio Raiz
              </span>
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase",
                color:"rgba(255,255,255,0.5)", background:"rgba(255,255,255,0.08)", padding:"4px 12px", borderRadius:100 }}>
                {active.tag}
              </span>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)", fontWeight:500 }}>{active.readTime} de leitura</span>
            </div>
            <div style={{ fontSize:48, marginBottom:16 }}>{active.icon}</div>
            <h1 style={{ fontSize:"clamp(22px,4vw,38px)", fontWeight:800, color:"#fff", letterSpacing:"-0.02em", lineHeight:1.15, marginBottom:12 }}>
              {active.title}
            </h1>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.55)", lineHeight:1.65 }}>{active.subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth:760, margin:"0 auto", padding:"32px 5% 80px" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {active.sections.map((s, i) => {
              const key = `${active.id}-${i}`;
              const open = !!openSections[key];
              return (
                <div key={i} style={{ background:"#fff", borderRadius:16, border:"1px solid rgba(0,0,0,0.07)", overflow:"hidden" }}>
                  <div className="sec-toggle" onClick={() => toggleSection(key)}
                    style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 20px", background: open ? "#EDF5F8" : "#fff" }}>
                    <h3 style={{ fontSize:14, fontWeight:700, color:"#021d34", lineHeight:1.3 }}>{s.heading}</h3>
                    <span style={{ fontSize:20, color:"#aaa", flexShrink:0, marginLeft:12, display:"inline-block", transform: open?"rotate(45deg)":"none", transition:"transform 0.2s" }}>+</span>
                  </div>
                  {open && (
                    <div style={{ padding:"16px 20px 20px", borderTop:"1px solid rgba(0,0,0,0.05)" }}>
                      {s.body.split("\n\n").map((para, j) => {
                        const parts = para.split(/(\*\*[^*]+\*\*)/g);
                        return (
                          <p key={j} style={{ fontSize:14, color:"#555", lineHeight:1.85, marginBottom: j < s.body.split("\n\n").length-1 ? 12 : 0 }}>
                            {parts.map((pt, k) => pt.startsWith("**") && pt.endsWith("**")
                              ? <strong key={k} style={{ color:"#021d34" }}>{pt.slice(2,-2)}</strong>
                              : pt
                            )}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Callout Fio Raiz */}
          <div style={{ marginTop:28, background:"#EDF5F8", borderRadius:16, padding:"24px 22px", border:"1px solid rgba(0,67,88,0.12)" }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#012e46", marginBottom:10 }}>
              Por que tratar com a Fio Raiz?
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[
                { icon:"⚡", text:"Do questionário ao protocolo em minutos — 100% online, sem fila" },
                { icon:"🔬", text:"Apenas ativos com evidência clínica comprovada. Sem modismos" },
                { icon:"📦", text:"Farmácias homologadas pela Anvisa. Entrega rápida e discreta" },
                { icon:"🤝", text:"Acompanhamento contínuo em todas as fases — início, progresso e manutenção" },
              ].map((item, i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                  <span style={{ fontSize:16, flexShrink:0, marginTop:1 }}>{item.icon}</span>
                  <span style={{ fontSize:13, color:"#445", lineHeight:1.65 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop:16, background:"#012e46", borderRadius:20, padding:"28px 24px", textAlign:"center" }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.45)", marginBottom:10 }}>Fio Raiz</div>
            <h3 style={{ fontSize:"clamp(16px,2.5vw,22px)", fontWeight:800, color:"#fff", letterSpacing:"-0.02em", marginBottom:10 }}>
              Comece o seu protocolo hoje.
            </h3>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.55)", lineHeight:1.75, marginBottom:20, maxWidth:420, margin:"0 auto 20px" }}>
              Avaliação rápida, gratuita e 100% online. Sem sala de espera, sem constrangimento — o protocolo certo chega na sua porta.
            </p>
            <button className="btn" onClick={() => navigate("/avaliacao")}
              style={{ background:"#fff", color:"#012e46", padding:"14px 36px", borderRadius:6, fontSize:13, fontWeight:800, border:"none", cursor:"pointer", fontFamily:"'Outfit',sans-serif", letterSpacing:"-0.01em" }}>
              Fazer avaliação gratuita na Fio Raiz →
            </button>
          </div>

          {/* Back link */}
          <div style={{ textAlign:"center", marginTop:24 }}>
            <button onClick={() => setActiveId(null)} style={{ background:"none", border:"none", fontSize:13, color:"#888", cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
              ← Ver todos os artigos
            </button>
          </div>
        </div>

        <footer style={{ background:"#fff", padding:"28px 5%", borderTop:"1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth:760, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
            <FioLogo color="#021d34" size={18} />
            <p style={{ fontSize:11, color:"rgba(0,0,0,0.35)", lineHeight:1.6, maxWidth:500 }}>
              A Fio Raiz não é uma farmácia. Todos os produtos são manipulados pelas farmácias credenciadas conforme normas da Anvisa.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // ── Grid index ────────────────────────────────────────────────────────────
  return (
    <div style={c.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        a{text-decoration:none;color:inherit;}
        .btn:hover{opacity:0.88!important;}
        .art-card{cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;border-radius:20px;overflow:hidden;background:#fff;border:1px solid rgba(0,0,0,0.07);}
        .art-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.12);}
        .show-mob{display:none;}
        @media(max-width:600px){
          .cards-grid{grid-template-columns:1fr!important;}
          .show-mob{display:flex!important;}
          .hide-mob{display:none!important;}
        }
      `}</style>

      <nav style={c.nav}>
        <FioLogo color="#021d34" size={20} />
        <div className="hide-mob" style={{ display:"flex", gap:28, alignItems:"center" }}>
          {[["/","Início"],["quemsomos","Quem Somos"],["comunidade","Comunidade"]].map(([h,l]) => (
            <a key={h} href={h} style={{ fontSize:13, color:"#666", fontWeight:500 }}>{l}</a>
          ))}
        </div>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <button className="btn hide-mob" onClick={() => navigate("/avaliacao")} style={c.cta}>Avaliação</button>
          <button onClick={() => setMenuOpen(o => !o)}
            style={{ display:"none", background:"none", border:"none", cursor:"pointer", padding:8, flexDirection:"column", gap:5 }}
            className="show-mob">
            <span style={{ display:"block", width:22, height:2, background:"#021d34", borderRadius:2, transition:"all 0.25s", transform: menuOpen?"rotate(45deg) translate(5px,5px)":"none" }}/>
            <span style={{ display:"block", width:22, height:2, background:"#021d34", borderRadius:2, transition:"all 0.25s", opacity: menuOpen?0:1 }}/>
            <span style={{ display:"block", width:22, height:2, background:"#021d34", borderRadius:2, transition:"all 0.25s", transform: menuOpen?"rotate(-45deg) translate(5px,-5px)":"none" }}/>
          </button>
        </div>
      </nav>

      {/* Mobile drawer — grid */}
      {menuOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:199, background:"rgba(0,0,0,0.3)", backdropFilter:"blur(4px)" }}
          onClick={() => setMenuOpen(false)} />
      )}
      <div style={{
        position:"fixed", top:64, right:0, bottom:0, zIndex:200,
        width:"75vw", maxWidth:300, background:"#fff",
        boxShadow:"-8px 0 40px rgba(0,0,0,0.12)",
        transform: menuOpen?"translateX(0)":"translateX(100%)",
        transition:"transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        padding:"32px 28px", display:"flex", flexDirection:"column", gap:8,
      }}>
        {[["/","Início"],["quemsomos","Quem Somos"],["comunidade","Comunidade"]].map(([h,l]) => (
          <a key={h} href={h} onClick={() => setMenuOpen(false)}
            style={{ fontSize:18, fontWeight:500, color:"#555", padding:"14px 0", borderBottom:"1px solid rgba(0,0,0,0.06)", display:"block" }}>{l}</a>
        ))}
        <button className="btn" onClick={() => { setMenuOpen(false); navigate("/avaliacao"); }}
          style={{ background:"#012e46", color:"#fff", padding:"16px 32px", borderRadius:6, fontSize:14, fontWeight:700, border:"none", cursor:"pointer", fontFamily:"'Outfit',sans-serif", marginTop:24, textAlign:"center", width:"100%" }}>
          Avaliação gratuita
        </button>
      </div>

      {/* Hero */}
      <div style={{ background:"#021d34", paddingTop:64 }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"48px 5% 40px" }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", marginBottom:12 }}>
            Comunidade Fio Raiz
          </div>
          <h1 style={{ fontSize:"clamp(26px,4vw,44px)", fontWeight:800, color:"#fff", letterSpacing:"-0.02em", lineHeight:1.15, marginBottom:12 }}>
            Guia completo sobre queda capilar
          </h1>
          <p style={{ fontSize:15, color:"rgba(255,255,255,0.45)", lineHeight:1.7, maxWidth:480, marginBottom:28 }}>
            Tudo sobre calvície, ciclo capilar e os ativos com evidência científica. Baseado em estudos, sem promessas sem fundamento.
          </p>
          <button className="btn" onClick={() => navigate("/avaliacao")}
            style={{ background:"#fff", color:"#021d34", padding:"13px 28px", borderRadius:6, fontSize:13, fontWeight:800, border:"none", cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
            Fazer avaliação gratuita na Fio Raiz →
          </button>
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"40px 5% 80px" }}>
        <div className="cards-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
          {ARTICLES.map(a => {
            const grad = GRADIENTS[a.id] || GRADIENTS.calvicie;
            const ci = CARD_ICONS[a.id];
            return (
              <div key={a.id} className="art-card" onClick={() => setActiveId(a.id)}>
                {/* Image area */}
                <div style={{ height:180, position:"relative", overflow:"hidden" }}>
                  <img src={CARD_IMAGES[a.id]} alt={a.title}
                    style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", display:"block" }} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.38) 100%)" }} />
                  <span style={{ position:"absolute", top:14, right:14, fontSize:9, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase",
                    background:"rgba(0,0,0,0.35)", backdropFilter:"blur(6px)", color:"#fff", padding:"4px 10px", borderRadius:100 }}>{a.tag}</span>
                </div>
                {/* Card body */}
                <div style={{ padding:"20px 20px 24px" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                    <span style={{ fontSize:11, fontWeight:600, color:"#888" }}>{a.readTime} de leitura</span>
                    <span style={{ fontSize:11, fontWeight:700, color:a.tagColor, background:`${a.tagColor}15`, padding:"3px 10px", borderRadius:100 }}>{a.tag}</span>
                  </div>
                  <h3 style={{ fontSize:"clamp(14px,2vw,17px)", fontWeight:700, color:"#021d34", lineHeight:1.3, marginBottom:8 }}>{a.title}</h3>
                  <p style={{ fontSize:12, color:"#888", lineHeight:1.65, marginBottom:16 }}>{a.subtitle}</p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700, color:"#012e46" }}>
                      Ler artigo <span style={{ fontSize:14 }}>→</span>
                    </div>
                    <span style={{ fontSize:10, fontWeight:700, color:"rgba(0,67,88,0.4)", letterSpacing:"0.06em", textTransform:"uppercase" }}>Fio Raiz</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <footer style={{ background:"#fff", padding:"32px 5%", borderTop:"1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
          <FioLogo color="#021d34" size={18} />
          <p style={{ fontSize:12, color:"rgba(0,0,0,0.4)", lineHeight:1.6, maxWidth:600 }}>
            A Fio Raiz não é uma farmácia. Todos os produtos adquiridos são manipulados pelas farmácias credenciadas, de acordo com as normas da Anvisa.
          </p>
        </div>
      </footer>
    </div>
  );
}
