const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== Menu no celular ===== */
const menuBotao = document.querySelector(".menu-botao");
const menu = document.getElementById("menu");

menuBotao.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  menuBotao.setAttribute("aria-expanded", String(aberto));
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    menuBotao.setAttribute("aria-expanded", "false");
  });
});

/* Destaca no menu a seção visível */
const linksMenu = [...menu.querySelectorAll("a")];
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        linksMenu.forEach((l) =>
          l.classList.toggle("ativo", l.getAttribute("href") === "#" + entrada.target.id)
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => observador.observe(s));

/* ===== Galeria de plantas ===== */
const plantas = {
  copaiba: {
    nome: "Copaíba",
    cientifico: "<i>Copaifera</i> spp.",
    nota: "A abreviação “spp.” indica que o nome se refere a várias espécies do mesmo gênero, e não a uma única espécie.",
    uso: "Cuidados com a pele, inflamações e cicatrização."
  },
  jatoba: {
    nome: "Jatobá",
    cientifico: "<i>Hymenaea courbaril</i>",
    nota: "Aqui o nome científico identifica uma espécie específica: o gênero <i>Hymenaea</i> e a espécie <i>courbaril</i>.",
    uso: "Problemas respiratórios."
  },
  goiabeira: {
    nome: "Goiabeira",
    cientifico: "<i>Psidium guajava</i>",
    nota: "É a mesma árvore que dá a goiaba, fruta bastante conhecida no Brasil.",
    uso: "Desconfortos intestinais."
  }
};

const fichas = document.querySelectorAll(".ficha");
const detalhe = document.getElementById("detalhe-planta");

function fecharDetalhe() {
  detalhe.hidden = true;
  detalhe.innerHTML = "";
  fichas.forEach((f) => f.setAttribute("aria-expanded", "false"));
}

fichas.forEach((ficha) => {
  ficha.addEventListener("click", () => {
    const jaAberta = ficha.getAttribute("aria-expanded") === "true";
    if (jaAberta) {
      fecharDetalhe();
      ficha.focus();
      return;
    }

    const p = plantas[ficha.dataset.planta];
    fichas.forEach((f) => f.setAttribute("aria-expanded", "false"));
    ficha.setAttribute("aria-expanded", "true");

    detalhe.innerHTML = `
      <h3>${p.nome}</h3>
      <p class="cientifico">${p.cientifico}</p>
      <p>${p.nota}</p>
      <div class="comparativo">
        <div class="comp-tradicao">
          <h4>Uso tradicional informado</h4>
          <p>${p.uso}</p>
        </div>
        <div class="comp-ciencia">
          <h4>Eficácia clinicamente comprovada</h4>
          <p>Este trabalho não apresenta estudos clínicos sobre esta planta. Por isso, o uso ao lado não deve ser entendido como comprovado nem como indicação de tratamento.</p>
        </div>
      </div>
      <p>Para saber se um uso tradicional é seguro e eficaz, é preciso pesquisa científica feita com ética e com a participação das comunidades.</p>
      <button type="button" class="fechar">Fechar ficha</button>
    `;
    detalhe.hidden = false;
    detalhe.style.animation = "none";
    void detalhe.offsetWidth; // reinicia a animação
    detalhe.style.animation = "";

    detalhe.querySelector(".fechar").addEventListener("click", () => {
      fecharDetalhe();
      ficha.focus();
    });

    detalhe.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

/* ===== Da tradição à ciência ===== */
const etapas = [
  {
    titulo: "Conhecimentos tradicionais",
    texto: "Tudo começa com saberes construídos por gerações dentro de cada povo. Eles têm valor próprio, ligado à cultura e ao território, e não dependem da ciência para serem legítimos."
  },
  {
    titulo: "Pesquisa científica ética",
    texto: "Pesquisadores só devem estudar esses saberes com o consentimento das comunidades, explicando os objetivos com transparência e garantindo que elas participem das decisões."
  },
  {
    titulo: "Avaliação de segurança e eficácia",
    texto: "Estudos verificam se um uso realmente funciona, em quais condições e com quais riscos. Muitas hipóteses não se confirmam, e esse também é um resultado importante da ciência."
  },
  {
    titulo: "Possíveis contribuições para a saúde pública",
    texto: "Quando há resultados consistentes, podem surgir contribuições para o cuidado em saúde. Os benefícios gerados devem ser repartidos de forma justa com quem originou o conhecimento."
  }
];

const passos = document.querySelectorAll(".trilha-passo");
const painel = document.getElementById("trilha-painel");
const trilhaTitulo = document.getElementById("trilha-titulo");
const trilhaTexto = document.getElementById("trilha-texto");
const btnAnterior = document.getElementById("trilha-anterior");
const btnProxima = document.getElementById("trilha-proxima");
let etapaAtual = 0;

function mostrarEtapa(i, focar = false) {
  etapaAtual = i;
  trilhaTitulo.textContent = etapas[i].titulo;
  trilhaTexto.textContent = etapas[i].texto;

  passos.forEach((passo, n) => {
    const ativo = n === i;
    passo.setAttribute("aria-selected", String(ativo));
    passo.tabIndex = ativo ? 0 : -1;
    passo.classList.toggle("feito", n < i);
  });
  if (focar) passos[i].focus();

  document.querySelector(".trilha").style.setProperty("--p", i / (etapas.length - 1));

  btnAnterior.disabled = i === 0;
  btnProxima.disabled = i === etapas.length - 1;

  painel.classList.remove("trocando");
  void painel.offsetWidth;
  painel.classList.add("trocando");
}

passos.forEach((passo, n) => {
  passo.addEventListener("click", () => mostrarEtapa(n));
  passo.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      mostrarEtapa((n + 1) % etapas.length, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      mostrarEtapa((n - 1 + etapas.length) % etapas.length, true);
    }
  });
});
btnAnterior.addEventListener("click", () => mostrarEtapa(Math.max(0, etapaAtual - 1)));
btnProxima.addEventListener("click", () => mostrarEtapa(Math.min(etapas.length - 1, etapaAtual + 1)));

mostrarEtapa(0);

/* ===== Quiz ===== */
const perguntas = [
  {
    pergunta: "Como os conhecimentos tradicionais sobre plantas costumam ser transmitidos entre os povos indígenas?",
    opcoes: [
      "Apenas por manuais escritos por pesquisadores.",
      "Pela convivência entre gerações, pela oralidade e pela prática no dia a dia.",
      "Por receitas padronizadas, iguais para todos os povos.",
      "Somente em cursos universitários."
    ],
    correta: 1,
    explicacao: "Esses saberes passam dos mais velhos para os mais novos pela fala, pela observação e pela prática, e variam de povo para povo."
  },
  {
    pergunta: "O uso tradicional da goiabeira para desconfortos intestinais significa que:",
    opcoes: [
      "Já existe comprovação clínica e ela pode substituir remédios.",
      "O uso não tem nenhum valor cultural.",
      "É um uso relatado pela tradição, que só pode ser confirmado por pesquisas de segurança e eficácia.",
      "Qualquer pessoa pode usar a planta em qualquer quantidade."
    ],
    correta: 2,
    explicacao: "Uso tradicional e eficácia comprovada são coisas diferentes. A comprovação depende de pesquisa científica ética."
  },
  {
    pergunta: "Qual atitude combina com uma relação respeitosa entre o SUS e os povos indígenas?",
    opcoes: [
      "Substituir tratamentos médicos por práticas tradicionais.",
      "Ignorar a cultura dos pacientes para padronizar o atendimento.",
      "Usar conhecimentos das comunidades sem pedir consentimento.",
      "Dialogar com respeito, valorizando a cultura sem abrir mão de tratamentos necessários."
    ],
    correta: 3,
    explicacao: "Um atendimento inclusivo respeita a cultura e, ao mesmo tempo, garante acesso aos tratamentos de que a pessoa precisa."
  }
];

const quizArea = document.getElementById("quiz-area");
const quizFinal = document.getElementById("quiz-final");
const elProgresso = document.getElementById("quiz-progresso");
const elPergunta = document.getElementById("quiz-pergunta");
const elOpcoes = document.getElementById("quiz-opcoes");
const elFeedback = document.getElementById("quiz-feedback");
const btnAvancar = document.getElementById("quiz-avancar");
const elResultado = document.getElementById("quiz-resultado");
const elMensagem = document.getElementById("quiz-mensagem");
const btnReiniciar = document.getElementById("quiz-reiniciar");

let indice = 0;
let pontos = 0;

function mostrarPergunta() {
  const q = perguntas[indice];
  elProgresso.textContent = `Pergunta ${indice + 1} de ${perguntas.length}`;
  document.getElementById("quiz-barra").style.width = `${(indice / perguntas.length) * 100}%`;
  [elPergunta, elOpcoes].forEach((el) => {
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "";
  });
  elPergunta.textContent = q.pergunta;
  elFeedback.textContent = "";
  elFeedback.className = "quiz-feedback";
  btnAvancar.hidden = true;
  elOpcoes.innerHTML = "";

  q.opcoes.forEach((texto, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opcao";
    b.textContent = texto;
    b.addEventListener("click", () => responder(i));
    elOpcoes.appendChild(b);
  });
}

function responder(escolha) {
  const q = perguntas[indice];
  const botoes = elOpcoes.querySelectorAll(".opcao");
  botoes.forEach((b) => (b.disabled = true));
  botoes[q.correta].classList.add("correta");

  if (escolha === q.correta) {
    pontos++;
    elFeedback.textContent = "Correto! " + q.explicacao;
    elFeedback.classList.add("certo");
  } else {
    botoes[escolha].classList.add("incorreta");
    elFeedback.textContent = "Não foi dessa vez. " + q.explicacao;
    elFeedback.classList.add("errado");
  }

  btnAvancar.textContent = indice === perguntas.length - 1 ? "Ver resultado" : "Próxima pergunta";
  btnAvancar.hidden = false;
  btnAvancar.focus();
}

btnAvancar.addEventListener("click", () => {
  indice++;
  if (indice < perguntas.length) {
    mostrarPergunta();
    elPergunta.setAttribute("tabindex", "-1");
    elPergunta.focus();
  } else {
    mostrarResultado();
  }
});

function mostrarResultado() {
  quizArea.hidden = true;
  quizFinal.hidden = false;
  document.getElementById("quiz-barra").style.width = "100%";
  // contagem animada da pontuação
  let mostrado = 0;
  elResultado.textContent = `Você acertou 0 de ${perguntas.length}`;
  const contar = setInterval(() => {
    if (mostrado >= pontos) { clearInterval(contar); return; }
    mostrado++;
    elResultado.textContent = `Você acertou ${mostrado} de ${perguntas.length}`;
  }, semMovimento ? 0 : 280);
  const mensagens = [
    "Vale revisar as seções do site e tentar de novo.",
    "Bom começo. Uma revisão rápida já ajuda bastante.",
    "Muito bem, faltou pouco para acertar tudo.",
    "Excelente! Você acompanhou bem o conteúdo."
  ];
  elMensagem.textContent = mensagens[pontos];
  btnReiniciar.focus();
}

btnReiniciar.addEventListener("click", () => {
  indice = 0;
  pontos = 0;
  quizFinal.hidden = true;
  quizArea.hidden = false;
  mostrarPergunta();
});

mostrarPergunta();

/* ===== Biblioteca: filtros ===== */
const filtros = document.querySelectorAll(".filtro");
const materiais = document.querySelectorAll(".biblioteca .material");
const filtroStatus = document.getElementById("filtro-status");

filtros.forEach((botao) => {
  botao.addEventListener("click", () => {
    const tipo = botao.dataset.filtro;
    filtros.forEach((b) => b.setAttribute("aria-pressed", String(b === botao)));
    let visiveis = 0;
    materiais.forEach((m) => {
      const mostrar = tipo === "todos" || m.dataset.tipo === tipo;
      m.hidden = !mostrar;
      if (mostrar) visiveis++;
    });
    filtroStatus.textContent = `Mostrando ${visiveis} ${visiveis === 1 ? "material" : "materiais"}.`;
  });
});

/* ===== Biblioteca: documentário Mboraihu ===== */
/* O player do YouTube já vem no HTML e não inicia sozinho.
   Quando o site é aberto direto do computador (file://), o YouTube recusa
   a incorporação; nesse caso o player vira miniatura com link para a plataforma. */
const player = document.getElementById("player-mboraihu");
const idVideo = player.dataset.video;

if (location.protocol === "file:") {
  player.innerHTML = `
    <img class="player-capa" src="https://i.ytimg.com/vi/${idVideo}/hqdefault.jpg"
         alt="Miniatura do documentário Mboraihu — O Espírito que nos Une" onerror="this.remove()">
    <a class="player-botao" href="https://www.youtube.com/watch?v=${idVideo}" target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z"/></svg>
      <span>Ver no YouTube</span><span class="sr">(abre em nova aba)</span>
    </a>`;
}

/* ===== Entrada do topo da página ===== */
requestAnimationFrame(() => document.querySelector(".hero").classList.add("pronto"));

/* ===== Revelar elementos ao rolar ===== */
const grupos = [
  ".secao-cabeca", ".saber", ".nota-lateral", ".aviso", ".ficha", ".trilha", ".trilha-painel",
  ".destaque", ".etica", ".sus-bloco", ".quiz", ".conclusao h2", ".conclusao p",
  ".filtros", ".material", ".porque", ".referencias h2", ".lista-ref li"
];
const revelaveis = [];
grupos.forEach((sel) => {
  document.querySelectorAll(sel).forEach((el) => {
    const irmaos = [...el.parentElement.children].filter((x) => x.matches(sel));
    el.style.setProperty("--i", irmaos.indexOf(el));
    el.classList.add("revela");
    revelaveis.push(el);
  });
});

if (semMovimento || !("IntersectionObserver" in window)) {
  revelaveis.forEach((el) => el.classList.add("visivel"));
} else {
  const obsRevela = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visivel");
          obsRevela.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revelaveis.forEach((el) => obsRevela.observe(el));
}

/* Ao filtrar a biblioteca, os cartões que aparecem não devem ficar invisíveis */
document.querySelectorAll(".filtro").forEach((b) =>
  b.addEventListener("click", () => materiais.forEach((m) => m.classList.add("visivel")))
);

/* ===== Barra de leitura, topo compacto e leve paralaxe na prancha ===== */
const topo = document.querySelector(".topo");
const prancha = document.querySelector(".hero-figura");
let agendado = false;
let pranchaPronta = false;

// quando a entrada termina, a paralaxe assume o controle da posição
prancha.addEventListener("animationend", (e) => {
  if (e.animationName !== "pousa") return;
  prancha.style.animation = "none";
  prancha.style.opacity = "1";
  pranchaPronta = true;
  aoRolar();
});

function aoRolar() {
  agendado = false;
  const y = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  topo.style.setProperty("--rolagem", total > 0 ? Math.min(y / total, 1) : 0);
  topo.classList.toggle("rolado", y > 30);
  if (pranchaPronta && !semMovimento && y < window.innerHeight * 1.2) {
    prancha.style.transform = `translateY(${y * -0.08}px) rotate(${1.2 - y * 0.002}deg)`;
  }
}
window.addEventListener("scroll", () => {
  if (!agendado) { agendado = true; requestAnimationFrame(aoRolar); }
}, { passive: true });
aoRolar();
