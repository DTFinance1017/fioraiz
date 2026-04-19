import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FioLogo({ color = "#1A3040", size = 20 }) {
  const navigate = useNavigate();
  const isWhite = color === "#fff";
  return (
    <div onClick={() => navigate("/")} style={{ display:"flex", alignItems:"center", cursor:"pointer", userSelect:"none", WebkitTapHighlightColor:"transparent" }} role="link" aria-label="Home">
      <img src="/logo-v2.png" alt="Fio Raiz" style={{ height: size * 2.8, width:"auto", display:"block", filter: isWhite ? "brightness(0) invert(1)" : "none" }} />
    </div>
  );
}

const ARTICLES = [
  {
    id: "calvicie",
    icon: "🧬",
    label: "Calvície Masculina",
    title: "Calvície Masculina: o guia completo",
    subtitle: "O que é, como detectar cedo, e como agir antes que piore",
    sections: [
      {
        heading: "O que é a calvície masculina?",
        body: `A calvície masculina — tecnicamente chamada de Alopecia Androgenética (AGA) — é a forma mais comum de queda de cabelo em homens. Ela é causada pela ação de um hormônio chamado DHT (di-hidrotestosterona) nos folículos capilares geneticamente sensíveis a ele.\n\nCom o tempo, o DHT miniaturiza progressivamente esses folículos: os fios ficam mais finos, crescem menos, e com o tempo param de crescer. O processo é lento, mas irreversível se não tratado.\n\nA boa notícia: é uma das condições mais estudadas na medicina. Existem tratamentos com eficácia comprovada por décadas de ensaios clínicos.`,
      },
      {
        heading: "O ciclo capilar — e como a calvície o quebra",
        body: `Cada fio do seu cabelo passa por um ciclo com três fases:\n\n**Anágena (crescimento):** dura de 2 a 7 anos. É quando o fio cresce ativamente. Em folículos saudáveis, 85–90% dos fios estão nessa fase.\n\n**Catágena (transição):** curta, de 2 a 3 semanas. O fio para de crescer e o folículo se contrai.\n\n**Telógena (repouso/queda):** dura 3 a 4 meses. O fio cai e o ciclo reinicia.\n\nNa calvície androgenética, o DHT encurta progressivamente a fase anágena — o fio passa cada vez menos tempo crescendo e mais tempo caindo. Com o tempo, a fase anágena fica tão curta que o fio nem chega à superfície da pele.`,
      },
      {
        heading: "Como detectar cedo",
        body: `Os primeiros sinais geralmente aparecem entre os 18 e 30 anos. Quanto mais cedo identificados, mais fácil é frear a progressão.\n\n**Sinais de alerta iniciais:**\n• Entradas (recessão temporal) ficando mais marcadas\n• Fios mais ralos no alto da cabeça (vértice)\n• Fios visivelmente mais finos do que eram\n• Mais cabelo na travesseira, no ralo ou na escova do que o habitual\n• Couro cabeludo mais visível sob luz forte\n\nA escala de Norwood-Hamilton classifica a calvície em 7 estágios — do I (sem recuo aparente) ao VII (calvície extensa no alto). Quanto menor o estágio ao iniciar o tratamento, melhor o prognóstico.`,
      },
      {
        heading: "Fatores de risco",
        body: `**Genética:** é o fator principal. Se seu pai, avô paterno ou tios maternos têm calvície, seu risco é significativamente maior. Mas genética não é destino — é risco.\n\n**Hormônios:** níveis elevados de DHT (derivado da testosterona) aceleram o processo em pessoas geneticamente predispostas.\n\n**Idade:** a prevalência aumenta progressivamente. Estima-se que 25% dos homens com 25 anos, 50% com 50 anos e 70% com 70 anos apresentam algum grau de AGA.\n\n**Estresse e dieta:** não causam calvície androgenética, mas podem acelerar outros tipos de queda (eflúvio telógeno) que somam-se à AGA.`,
      },
      {
        heading: "O que fazer antes que piore",
        body: `A regra de ouro é: **agir cedo**. A ciência é clara — é muito mais fácil manter o cabelo que você tem do que recuperar o que perdeu.\n\n1. **Reconheça os sinais** — entradas progressivas, rarefação no vértice, fios mais finos\n2. **Consulte um profissional** — dermatologista ou médico com experiência em tricologia\n3. **Inicie o tratamento com ativos comprovados** — Finasterida, Dutasterida, Minoxidil (tópico ou oral)\n4. **Seja consistente** — o tratamento funciona enquanto é mantido. Descontinuar = progressão retoma\n5. **Não perca tempo com promessas sem evidência** — shampoos anticaspa, suplementos genéricos e lasers de baixa potência não travam AGA`,
      },
    ],
  },
  {
    id: "ciclo",
    icon: "🔄",
    label: "Ciclo Capilar",
    title: "Guia Completo do Ciclo Capilar",
    subtitle: "Entenda como seu cabelo nasce, cresce e cai — e o que interfere nisso",
    sections: [
      {
        heading: "O folículo capilar — a raiz de tudo",
        body: `O folículo capilar é uma estrutura tubular na derme responsável por produzir o fio de cabelo. Cada couro cabeludo tem entre 100.000 e 150.000 folículos. Eles são as unidades produtoras e, uma vez destruídos definitivamente, não regeneram.\n\nO fio em si é composto majoritariamente por queratina, uma proteína produzida por células chamadas queratinócitos. A cor vem dos melanócitos, presentes na base do folículo.`,
      },
      {
        heading: "As três fases do ciclo capilar",
        body: `**1. Fase Anágena — crescimento ativo**\nDuração: 2 a 7 anos (média de 3 a 5 anos)\nO fio cresce cerca de 1 cm por mês. Quanto mais longa a fase anágena, mais longo pode ser o fio. Aproximadamente 85–90% dos fios estão nessa fase simultaneamente.\n\n**2. Fase Catágena — transição**\nDuração: 2 a 3 semanas\nO folículo regride, o bulbo se afasta da papila dérmica. O crescimento para. Apenas 1–2% dos fios estão nessa fase em qualquer momento.\n\n**3. Fase Telógena — repouso e queda**\nDuração: 3 a 4 meses\nO fio entra em repouso e eventualmente cai — cedendo lugar ao novo fio da próxima fase anágena. 10–15% dos fios estão nessa fase. Perder 50–100 fios/dia é fisiologicamente normal.`,
      },
      {
        heading: "O que interfere negativamente no ciclo",
        body: `**DHT (calvície androgenética):** encurta a fase anágena progressivamente — principal mecanismo da calvície masculina\n\n**Deficiências nutricionais:** ferro, vitamina D, biotina e zinco insuficientes afetam a qualidade e quantidade dos fios\n\n**Estresse agudo:** pode desencadear eflúvio telógeno — aumento repentino de fios em fase telógena\n\n**Tireoide desregulada:** hipo e hipertireoidismo causam queda difusa\n\n**Medicamentos:** quimioterapia, anticoagulantes, excesso de vitamina A e alguns antidepressivos\n\n**Dietas extremas:** restrição calórica severa ou jejum prolongado`,
      },
      {
        heading: "Como otimizar seu ciclo capilar",
        body: `**Nutrição:** proteína adequada (1,2–1,6g/kg/dia), ferro sérico acima de 70 ng/mL, vitamina D entre 40–60 ng/mL, zinco e biotina em níveis adequados.\n\n**Sono:** o hormônio do crescimento — essencial para a proliferação celular folicular — é liberado principalmente nas fases profundas do sono.\n\n**Redução do DHT (quando há AGA):** o uso de Finasterida ou Dutasterida prolonga artificialmente a fase anágena ao bloquear a conversão de testosterona em DHT.\n\n**Minoxidil:** estimula vasodilatação perifolicular e prolonga a fase anágena — independentemente do mecanismo hormonal.`,
      },
    ],
  },
  {
    id: "minoxidil",
    icon: "💧",
    label: "Minoxidil",
    title: "Minoxidil: tudo o que você precisa saber",
    subtitle: "Como funciona, resultados esperados, tópico vs oral, efeitos colaterais",
    sections: [
      {
        heading: "O que é o Minoxidil",
        body: `Minoxidil é um vasodilatador originalmente desenvolvido nos anos 1970 como medicamento oral para hipertensão arterial severa. Quando pacientes hipertensos relataram crescimento de pelos como efeito colateral, pesquisadores investigaram o potencial capilar.\n\nHoje é um dos dois únicos ativos aprovados pela FDA especificamente para tratamento de alopecia androgênica. O outro é a Finasterida.\n\nNo Brasil, é comercializado em formulações tópicas e, mais recentemente, em microdoses orais prescritas por médicos.`,
      },
      {
        heading: "Como funciona",
        body: `O mecanismo exato do Minoxidil ainda é estudado, mas sabe-se que ele atua por:\n\n**Vasodilatação perifolicular:** aumenta o fluxo sanguíneo ao redor dos folículos, melhorando o aporte de oxigênio e nutrientes.\n\n**Prolongamento da fase anágena:** os folículos passam mais tempo na fase de crescimento ativo.\n\n**Abertura dos canais de potássio:** interfere na sinalização celular dentro do folículo.\n\n**Importante:** Minoxidil não bloqueia o DHT. Ele estimula o crescimento independentemente da causa da queda — por isso é eficaz também em outros tipos de alopecia.`,
      },
      {
        heading: "Tópico vs Oral — qual a diferença?",
        body: `**Minoxidil tópico (2% ou 5%):**\n• Aplicado diretamente no couro cabeludo\n• Menos absorção sistêmica — menos efeitos colaterais\n• 5% é mais eficaz que 2% em homens (evidência do NEJM)\n• Pode causar dermatite de contato em alguns pacientes\n\n**Minoxidil oral (microdose: 0,5–2,5mg/dia):**\n• Administração simplificada — 1 comprimido/dia\n• Maior biodisponibilidade sistêmica\n• Efeito potencialmente mais uniforme no couro cabeludo inteiro\n• Estudo de 2019 no JAAD mostrou eficácia significativa em doses baixas\n• Monitoramento periódico recomendado (pressão arterial)\n• Pode causar hipertricose (crescimento de pelos corporais) em alguns casos`,
      },
      {
        heading: "Resultados esperados e timeline",
        body: `**Mês 1–2:** É comum haver aumento temporário na queda (shedding inicial). Isso é normal — os folículos estão sendo reiniciados para nova fase anágena.\n\n**Mês 3–4:** Primeiros fios novos surgem — finos e macios inicialmente.\n\n**Mês 6:** Melhora visível em quem responde bem. 60–70% dos pacientes reportam resultado positivo nesse horizonte.\n\n**Mês 12:** Resultado mais consolidado. Estudos mostram que a densidade capilar continua melhorando até o 12º mês.\n\n**Após 12 meses:** Fase de manutenção — o tratamento precisa ser continuado indefinidamente. Parar o Minoxidil = retorno progressivo à queda em 3–6 meses.`,
      },
    ],
  },
  {
    id: "finasterida",
    icon: "💊",
    label: "Finasterida",
    title: "Finasterida: mecanismo, eficácia e o que esperar",
    subtitle: "O inibidor da 5-alfa redutase tipo II mais estudado do mundo para calvície",
    sections: [
      {
        heading: "O que é a Finasterida",
        body: `Finasterida é um inibidor da enzima 5-alfa redutase tipo II, responsável por converter testosterona em DHT (di-hidrotestosterona). Ao bloquear essa conversão, a Finasterida reduz os níveis de DHT no couro cabeludo em até 70%.\n\nFoi aprovada pela FDA em 1992 na dose de 5mg para hiperplasia prostática benigna e em 1997 na dose de 1mg para alopecia androgenética masculina.\n\nÉ, junto ao Minoxidil, o tratamento de primeira linha mais prescrito no mundo para calvície masculina.`,
      },
      {
        heading: "Como funciona",
        body: `O DHT é produzido pela ação da 5-alfa redutase tipo II sobre a testosterona — principalmente nos folículos capilares, próstata e pele.\n\nNos folículos geneticamente sensíveis, o DHT encurta progressivamente a fase anágena e miniaturiza o fio. Ao inibir a enzima em ~70%, a Finasterida reduz esse estímulo hormonal prejudicial.\n\nDiferente do Minoxidil — que estimula o crescimento independente da causa — a Finasterida atua na raiz hormonal do problema.`,
      },
      {
        heading: "Eficácia — o que os estudos mostram",
        body: `Um dos estudos mais citados, publicado no Journal of the American Academy of Dermatology, acompanhou 1.553 homens por 5 anos:\n\n• **83%** mantiveram ou aumentaram a contagem de fios\n• **66%** tiveram crescimento visível de cabelo\n• **Apenas 17%** continuaram perdendo cabelo (versus 100% no grupo placebo)\n\nOutro estudo de 10 anos de acompanhamento mostrou que 99% dos pacientes que usaram Finasterida continuamente mantiveram ou melhoraram o resultado.\n\nA dose padrão é 1mg/dia, administrada continuamente.`,
      },
      {
        heading: "Efeitos colaterais — a verdade sem alarmismo",
        body: `Os efeitos colaterais sexuais (disfunção erétil, redução de libido, alteração de volume seminal) foram reportados em 1,8% dos pacientes nos estudos controlados versus 1,3% no grupo placebo.\n\nNa grande maioria dos casos, são reversíveis com a descontinuação do medicamento.\n\n**Contexto importante:** o alarmismo online tende a exagerar. Estudos populacionais com centenas de milhares de pacientes mostram que a taxa de efeitos persistentes é muito menor do que a percepção pública sugere.\n\n**Nota:** Finasterida é contraindicada para mulheres em idade fértil e crianças.`,
      },
    ],
  },
  {
    id: "dutasterida",
    icon: "⚡",
    label: "Dutasterida",
    title: "Dutasterida: o inibidor de maior potência",
    subtitle: "Bloqueia 90% do DHT — indicada para casos mais avançados ou sem resposta à Finasterida",
    sections: [
      {
        heading: "O que é a Dutasterida",
        body: `Dutasterida é um inibidor dual da 5-alfa redutase — bloqueia tanto o tipo I quanto o tipo II da enzima. Enquanto a Finasterida inibe apenas o tipo II (reduzindo DHT em ~70%), a Dutasterida inibe os dois tipos, reduzindo o DHT em até 90–95%.\n\nFoi aprovada pela FDA em 2001 para hiperplasia prostática benigna. Para alopecia androgenética, é aprovada no Japão e Coreia do Sul — e usada off-label em outros países, incluindo o Brasil.`,
      },
      {
        heading: "Dutasterida vs Finasterida",
        body: `Um estudo comparativo publicado no British Journal of Dermatology (2006) comparou Dutasterida 0,5mg com Finasterida 1mg:\n\n• Dutasterida mostrou **eficácia superior** na redução de DHT e no crescimento capilar\n• A contagem de fios foi significativamente maior no grupo Dutasterida em 24 semanas\n\n**Quando considerar Dutasterida:**\n• Sem resposta satisfatória à Finasterida após 12 meses\n• Progressão rápida de AGA com histórico familiar agressivo\n• Estágio de calvície mais avançado ao início do tratamento\n\n**Meia-vida:** ~5 semanas (vs ~6h da Finasterida) — leva mais tempo para sair do organismo após descontinuação.`,
      },
      {
        heading: "Eficácia e evidências",
        body: `Um estudo de fase III realizado na Coreia do Sul com 153 homens, publicado no Journal of the American Academy of Dermatology (2016), mostrou:\n\n• Crescimento de cabelo significativamente superior ao placebo em 6 e 12 meses\n• Melhora na contagem total de fios e no diâmetro do fio\n• Boa tolerabilidade com perfil de segurança semelhante à Finasterida\n\nEstudos japoneses levaram à aprovação regulatória local — reconhecimento oficial da eficácia para AGA.`,
      },
      {
        heading: "Efeitos colaterais e considerações",
        body: `O perfil de efeitos colaterais é semelhante ao da Finasterida. Efeitos reportados nos estudos (minoria dos pacientes):\n• Redução de libido\n• Disfunção erétil\n• Alteração de volume ejaculatório\n• Ginecomastia (rara)\n\n**Importante:** Dutasterida reduz os níveis de PSA (antígeno prostático específico) — isso pode mascarar diagnóstico de câncer de próstata em homens mais velhos. Informe sempre seu médico que está em uso.`,
      },
    ],
  },
  {
    id: "saw-palmetto",
    icon: "🌿",
    label: "Saw Palmetto",
    title: "Saw Palmetto: a via natural para quem não quer sintético",
    subtitle: "O ativo fitoterápico com evidência mais robusta para calvície androgenética",
    sections: [
      {
        heading: "O que é o Saw Palmetto",
        body: `Saw Palmetto (Serenoa repens) é uma palmeira nativa do sudeste dos Estados Unidos. Seu extrato — obtido principalmente das bagas — contém ácidos graxos livres e esteróis que demonstraram atividade inibitória sobre a 5-alfa redutase.\n\nÉ o fitoterápico mais estudado para alopecia androgenética e hiperplasia prostática benigna. Não é um tratamento farmacológico sintético — é considerado suplemento alimentar em muitos países.`,
      },
      {
        heading: "Como funciona e o que a ciência diz",
        body: `O Saw Palmetto inibe a 5-alfa redutase de forma não seletiva (tipos I e II), reduzindo a conversão de testosterona em DHT — mecanismo similar ao da Finasterida, porém com potência significativamente menor.\n\n**Estudo importante:** Uma revisão sistemática publicada no Journal of Alternative and Complementary Medicine (2012) avaliou 7 estudos sobre Saw Palmetto em AGA. Os resultados mostraram melhora em 60% dos pacientes após 24 semanas.\n\n**Comparativo direto (Rossi et al., 2012):** Saw Palmetto 320mg/dia vs Finasterida 1mg/dia por 24 meses — a Finasterida foi mais eficaz (68% vs 38% com melhora), mas o Saw Palmetto mostrou benefício real e foi bem tolerado.`,
      },
      {
        heading: "Quando considerar Saw Palmetto",
        body: `• Preferência por rota fitoterápica sem medicamento sintético\n• Contraindicação ou intolerância à Finasterida/Dutasterida\n• Complemento a outros ativos (sinergia)\n• Estágio inicial de queda com histórico familiar moderado\n• Quem busca profilaxia antes de progressão significativa\n\n**Dose estudada:** 320mg/dia de extrato padronizado (80–90% de ácidos graxos e esteróis), geralmente dividida em 2 tomadas.\n\n**Prazo de resposta:** 6 a 12 meses — mais longo do que com sintéticos.`,
      },
      {
        heading: "Perfil de segurança",
        body: `Um dos grandes atrativos do Saw Palmetto é seu perfil de segurança favorável. Os estudos mostram muito poucos efeitos adversos — os mais relatados são gastrointestinais leves (náusea, desconforto) quando tomado sem alimentação.\n\nNão há evidências de efeitos sexuais adversos na mesma magnitude dos sintéticos.\n\n**Interações:** pode interagir com anticoagulantes (varfarina) — informe sempre seu médico sobre o uso.`,
      },
    ],
  },
  {
    id: "biotina",
    icon: "🌱",
    label: "Biotina",
    title: "Biotina: o papel real das vitaminas no cabelo",
    subtitle: "O que a ciência diz de verdade — sem exagero de marketing",
    sections: [
      {
        heading: "O que é a Biotina",
        body: `Biotina (vitamina B7 ou vitamina H) é uma vitamina hidrossolúvel essencial para o metabolismo de carboidratos, gorduras e proteínas. Está envolvida na síntese de queratina — a proteína que forma o fio de cabelo.\n\nÉ naturalmente encontrada em ovos (especialmente na gema), nozes, sementes, carnes e vegetais verdes. Deficiência real de biotina é rara em pessoas com dieta equilibrada.`,
      },
      {
        heading: "O que a ciência realmente mostra",
        body: `Aqui é preciso honestidade: **a biotina só beneficia o cabelo quando há deficiência documentada**.\n\nUma revisão sistemática publicada no Skin Appendage Disorders (2017) analisou 18 estudos sobre biotina e queda de cabelo:\n\n• Todos os casos com melhora documentada tinham **deficiência comprovada de biotina** ou doença rara associada\n• **Não há evidência robusta** de que a suplementação melhore o cabelo em pessoas com níveis normais\n\nIsso não torna a biotina inútil — mas coloca-a no lugar correto: suporte nutricional, não tratamento de AGA.`,
      },
      {
        heading: "Quem pode se beneficiar",
        body: `**Perfis com potencial benefício real:**\n• Pessoas com deficiência comprovada de biotina (exame de sangue)\n• Grávidas e lactantes (necessidade aumentada)\n• Dietas veganas restritivas\n• Usuários crônicos de antibióticos (alteram microbioma intestinal que produz biotina)\n\n**No contexto da AGA:** a biotina não bloqueia DHT, não prolonga fase anágena e não substitui os tratamentos comprovados. Mas como suporte nutricional complementar, pode contribuir para a saúde geral do fio.`,
      },
      {
        heading: "Nutrição capilar completa — além da biotina",
        body: `**Vitaminas e minerais com papel documentado:**\n• **Ferro:** ferritina abaixo de 40 ng/mL está associada a queda capilar difusa. Manter acima de 70 ng/mL é ideal.\n• **Vitamina D:** deficiência comum no Brasil, associada a queda. Alvo: 40–60 ng/mL.\n• **Zinco:** cofator enzimático essencial para síntese de queratina.\n• **Vitamina B12:** relevante especialmente para vegetarianos.\n\n**Importante:** exames de rotina (ferro, ferritina, vitamina D, zinco, TSH) devem anteceder qualquer suplementação em dose elevada. Excesso de vitamina A, por exemplo, causa queda — o oposto do pretendido.`,
      },
    ],
  },
  {
    id: "cuidados",
    icon: "🧴",
    label: "Guia de Cuidados",
    title: "Guia completo de cuidados pessoais para o cabelo masculino",
    subtitle: "Rotina diária, o que evitar e como maximizar os resultados do tratamento",
    sections: [
      {
        heading: "Lavagem e higiene — mitos e verdades",
        body: `**Frequência ideal de lavagem:** depende do tipo de couro cabeludo. Couro oleoso: lavar diariamente ou a cada dois dias. Couro seco: 2 a 3 vezes por semana. Não há evidência de que lavagem frequente cause calvície.\n\n**Shampoos com cetoconazol 2%:** mostraram efeito antiandrogênico local em estudos — uso como coadjuvante, não como tratamento principal.\n\n**Temperatura da água:** água muito quente resseca o fio e pode irritar o couro cabeludo. Preferir morna a fria no enxágue.\n\n**Mito:** "Lavar com frequência causa calvície." Falso — calvície é determinada pelo DHT e pela genética, não pela lavagem.`,
      },
      {
        heading: "Secagem e manipulação",
        body: `**Secador:** use em temperatura média, não quente. Distância mínima de 15 cm do couro cabeludo. O calor excessivo danifica a cutícula do fio.\n\n**Toalha:** evite esfregar vigorosamente. Pressione suavemente para absorver o excesso de água. Fios úmidos são mais vulneráveis a danos mecânicos.\n\n**Penteado e tração:** estilos que tracionam o couro (tranças muito apertadas, topetes) podem causar alopecia por tração — reversível se cessada a tempo.`,
      },
      {
        heading: "Nutrição para o cabelo",
        body: `O cabelo é um tecido metabolicamente ativo — mas considerado "não essencial" pelo organismo. Em situações de déficit nutricional, é um dos primeiros a ser privado de recursos.\n\n**O que incluir:**\n• **Proteína completa:** frango, ovos, peixe, leguminosas — o cabelo é feito de queratina (proteína)\n• **Ômega-3:** sardinha, salmão, linhaça — reduz inflamação perifolicular\n• **Antioxidantes:** vegetais coloridos, frutas vermelhas\n• **Hidratação adequada:** mantém o couro cabeludo saudável\n\n**O que evitar:**\n• Dietas muito restritivas (abaixo de 1.200 kcal/dia) desencadeiam eflúvio telógeno\n• Excesso de álcool prejudica absorção de zinco e vitaminas B`,
      },
      {
        heading: "Rotina com tratamento — como integrar",
        body: `**Minoxidil tópico:**\n• Aplique no couro cabeludo SECO\n• Espere absorver (30–60 min) antes de lavar o cabelo\n• Consistência é mais importante do que horário perfeito\n• Não use mais do que a dose prescrita\n\n**Finasterida/Dutasterida oral:**\n• Tomar no mesmo horário todos os dias facilita a aderência\n• Com ou sem alimentação — não há diferença de absorção significativa\n• Não pule doses — o efeito é cumulativo\n\n**Exames de acompanhamento:**\n• Avaliação clínica a cada 3–6 meses no início do tratamento\n• Fotos padronizadas (mesma iluminação, posição) são a melhor forma de monitorar evolução`,
      },
    ],
  },
];

export default function Comunidade() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState("calvicie");
  const [scrolled, setScrolled] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const active = ARTICLES.find(a => a.id === activeId);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpenSections({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeId]);

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const c = {
    page: { fontFamily: "'Outfit',sans-serif", background: "#F0F7FA", color: "#1A3040", overflowX: "hidden", minHeight: "100vh" },
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      padding: "0 5%", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "rgba(255,255,255,0.97)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(0,0,0,0.07)",
    },
    cta: { background: "#004358", color: "#fff", padding: "11px 24px", borderRadius: 6, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif" },
  };

  return (
    <div style={c.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        a{text-decoration:none;color:inherit;}
        .btn:hover{opacity:0.88!important;}
        .art-btn{background:none;border:none;width:100%;text-align:left;cursor:pointer;font-family:'Outfit',sans-serif;transition:all 0.18s;border-radius:10px;}
        .art-btn:hover{background:rgba(0,67,88,0.06)!important;}
        .art-btn.active{background:#004358!important;color:#fff!important;}
        .sec-toggle{cursor:pointer;user-select:none;transition:background 0.2s;}
        .sec-toggle:hover{background:#e8f2f6!important;}
        @media(max-width:768px){
          .layout{flex-direction:column!important;}
          .sidebar{flex-direction:row!important;overflow-x:auto!important;border-right:none!important;border-bottom:1px solid rgba(0,0,0,0.08)!important;padding:8px 0 12px!important;min-width:unset!important;gap:6px!important;}
          .art-btn{padding:8px 14px!important;white-space:nowrap!important;font-size:12px!important;}
          .content-area{padding:20px 0!important;}
        }
      `}</style>

      {/* NAV */}
      <nav style={c.nav}>
        <FioLogo color="#1A3040" size={20} />
        <div style={{ display:"flex", gap:16, alignItems:"center" }}>
          <a href="/" style={{ fontSize:13, color:"#666", fontWeight:500 }}>Início</a>
          <a href="/quemsomos" style={{ fontSize:13, color:"#666", fontWeight:500 }} className="hide-mob">Quem Somos</a>
          <button className="btn" onClick={() => navigate("/avaliacao")} style={c.cta}>Avaliação gratuita</button>
        </div>
      </nav>

      {/* HERO STRIP */}
      <div style={{ background:"#1A3040", paddingTop:64 }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"48px 5% 36px" }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", marginBottom:12 }}>
            Comunidade Fio Raiz
          </div>
          <h1 style={{ fontSize:"clamp(26px,4vw,44px)", fontWeight:800, color:"#fff", letterSpacing:"-0.02em", lineHeight:1.15, marginBottom:12 }}>
            Guia completo sobre queda capilar
          </h1>
          <p style={{ fontSize:15, color:"rgba(255,255,255,0.5)", lineHeight:1.7, maxWidth:520 }}>
            Tudo o que você precisa saber sobre calvície, ciclo capilar e os ativos com evidência científica — baseado em estudos, sem promessas sem fundamento.
          </p>
        </div>
      </div>

      {/* LAYOUT */}
      <div className="layout" style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"flex-start", padding:"32px 5% 80px", gap:32 }}>

        {/* SIDEBAR */}
        <aside className="sidebar" style={{ minWidth:210, display:"flex", flexDirection:"column", gap:4, position:"sticky", top:80, borderRight:"1px solid rgba(0,0,0,0.08)", paddingRight:20 }}>
          {ARTICLES.map(a => (
            <button key={a.id}
              className={`art-btn${activeId===a.id ? " active" : ""}`}
              onClick={() => setActiveId(a.id)}
              style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px", fontSize:13, fontWeight:600, color: activeId===a.id ? "#fff" : "#444" }}>
              <span style={{ fontSize:17 }}>{a.icon}</span>
              {a.label}
            </button>
          ))}
        </aside>

        {/* CONTENT */}
        <main className="content-area" style={{ flex:1, minWidth:0, paddingLeft:8 }}>
          {/* Header */}
          <div style={{ marginBottom:28, paddingBottom:24, borderBottom:"1px solid rgba(0,0,0,0.07)" }}>
            <div style={{ fontSize:32, marginBottom:8 }}>{active.icon}</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:800, letterSpacing:"-0.02em", lineHeight:1.15, marginBottom:10 }}>
              {active.title}
            </h2>
            <p style={{ fontSize:14, color:"#888", lineHeight:1.65 }}>{active.subtitle}</p>
          </div>

          {/* Accordion sections */}
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {active.sections.map((s, i) => {
              const key = `${activeId}-${i}`;
              const open = !!openSections[key];
              return (
                <div key={i} style={{ background:"#fff", borderRadius:16, border:"1px solid rgba(0,0,0,0.07)", overflow:"hidden" }}>
                  <div className="sec-toggle"
                    onClick={() => toggleSection(key)}
                    style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 22px", background: open ? "#EDF5F8" : "#fff" }}>
                    <h3 style={{ fontSize:14, fontWeight:700, color:"#1A3040", lineHeight:1.3 }}>{s.heading}</h3>
                    <span style={{ fontSize:20, color:"#aaa", flexShrink:0, marginLeft:12, display:"inline-block", transform: open ? "rotate(45deg)" : "rotate(0deg)", transition:"transform 0.2s" }}>+</span>
                  </div>
                  {open && (
                    <div style={{ padding:"18px 22px 22px", borderTop:"1px solid rgba(0,0,0,0.05)" }}>
                      {s.body.split("\n\n").map((para, j) => {
                        const parts = para.split(/(\*\*[^*]+\*\*)/g);
                        return (
                          <p key={j} style={{ fontSize:14, color:"#555", lineHeight:1.85, marginBottom: j < s.body.split("\n\n").length-1 ? 14 : 0 }}>
                            {parts.map((part, k) =>
                              part.startsWith("**") && part.endsWith("**")
                                ? <strong key={k} style={{ color:"#1A3040" }}>{part.slice(2,-2)}</strong>
                                : part
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

          {/* CTA */}
          <div style={{ marginTop:36, background:"#1A3040", borderRadius:20, padding:"32px 28px", textAlign:"center" }}>
            <h3 style={{ fontSize:"clamp(18px,2.5vw,26px)", fontWeight:800, color:"#fff", letterSpacing:"-0.02em", marginBottom:10 }}>
              Pronto para começar o tratamento certo?
            </h3>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.5)", lineHeight:1.7, marginBottom:24 }}>
              Avaliação rápida e gratuita. Protocolo personalizado entregue em casa.
            </p>
            <button className="btn" onClick={() => navigate("/avaliacao")}
              style={{ background:"#fff", color:"#1A3040", padding:"14px 36px", borderRadius:6, fontSize:14, fontWeight:700, border:"none", cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
              Fazer avaliação gratuita
            </button>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer style={{ background:"#fff", padding:"32px 5%", borderTop:"1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
          <FioLogo color="#1A3040" size={18} />
          <p style={{ fontSize:12, color:"rgba(0,0,0,0.4)", lineHeight:1.6, maxWidth:600 }}>
            A Fio Raiz não é uma farmácia. Todos os produtos adquiridos são manipulados pelas farmácias credenciadas, de acordo com as normas da Anvisa.
          </p>
        </div>
      </footer>
    </div>
  );
}
