// ===== DADOS DOS DEVOCIONAIS =====
const devocionais = [
  {
    id: 1,
    data: "01/02/2026",
    versiculo: "O Senhor é o meu pastor; nada me faltará.",
    referencia: "Salmos 23:1",
    reflexao: "Deus cuida de nós mesmo quando não entendemos o caminho.",
    oracao: "Senhor, confio em Ti. Amém."
  },
  {
    id: 2,
    data: "02/02/2026",
    versiculo: "Não temas, porque eu sou contigo.",
    referencia: "Isaías 41:10",
    reflexao: "Deus está presente em todo tempo, inclusive nos dias difíceis.",
    oracao: "Pai, ajuda-me a confiar. Amém."
  },
  {
    id: 3,
    data: "03/02/2026",
    versiculo: "Vinde a mim todos os que estais cansados.",
    referencia: "Mateus 11:28",
    reflexao: "Jesus é descanso para a alma cansada.",
    oracao: "Jesus, descanso em Ti. Amém."
  }
];

// ===== DEVOCIONAL ATUAL =====
const idSelecionado = localStorage.getItem("devocionalSelecionado");

let devocionalAtual;

if (idSelecionado) {
  devocionalAtual = devocionais.find(d => d.id === Number(idSelecionado));
} else {
  devocionalAtual = devocionais[devocionais.length - 1];
}

if (document.getElementById("versiculo")) {
  document.getElementById("data").innerText = devocionalAtual.data;
  document.getElementById("versiculo").innerText = `"${devocionalAtual.versiculo}"`;
  document.getElementById("referencia").innerText = devocionalAtual.referencia;
  document.getElementById("textoReflexao").innerText = devocionalAtual.reflexao;
  document.getElementById("textoOracao").innerText = devocionalAtual.oracao;
}

// ===== SAUDAÇÃO AUTOMÁTICA =====
const saudacao = document.getElementById("saudacao");

if (saudacao) {
  const hora = new Date().getHours();
  if (hora < 12) {
    saudacao.innerText = "Bom dia ☀️ Comece o seu dia com Deus";
  } else if (hora < 18) {
    saudacao.innerText = "Boa tarde 🌤️ Separe um tempo com Deus";
  } else {
    saudacao.innerText = "Boa noite 🌙 Termine o dia com Deus";
  }
}

// ===== FAVORITOS =====
function getFavoritos() {
  return JSON.parse(localStorage.getItem("favoritos")) || [];
}

function jaFavoritado(id) {
  const favoritos = getFavoritos();
  return favoritos.some(d => d.id === id);
}

function salvarFavorito(devocional) {
  const favoritos = getFavoritos();

  if (jaFavoritado(devocional.id)) {
    return;
  }

  favoritos.push(devocional);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  atualizarBotaoFavorito();
}

const btnFav = document.getElementById("favoritar");

function atualizarBotaoFavorito() {
  if (!btnFav) return;

  if (jaFavoritado(hoje.id)) {
    btnFav.innerText = "❤️ Favoritado";
    btnFav.classList.add("favoritado");
  } else {
    btnFav.innerText = "❤️ Favoritar";
    btnFav.classList.remove("favoritado");
  }
}

if (btnFav) {
  atualizarBotaoFavorito();

  btnFav.addEventListener("click", () => {
    salvarFavorito(hoje);
  });
}