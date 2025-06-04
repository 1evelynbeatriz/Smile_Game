// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos IDs e adiciona eventos de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que adiciona uma imagem genérica a um elemento
function adicionarImagem(id, src, elementoPai) {
  const img = new Image(100);
  img.id = id;
  img.src = src;
  elementoPai.appendChild(img);
}

// Função que remove uma imagem por ID, se existir
function removerImagemPorId(id) {
  const img = document.getElementById(id);
  if (img) {
    img.remove();
  }
}

// Função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// Função para reiniciar o jogo
function jogarNovamente() {
  jogar = true;
  const divis = document.getElementsByTagName("div");

  for (let i = 0; i < divis.length; i++) {
    if (["0", "1", "2", "3", "4"].includes(divis[i].id)) {
      divis[i].className = "inicial";
    }
  }

  removerImagemPorId("imagem");
  removerImagemPorId("imagem2");
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

// Função executada quando o jogador acertou
function acertou(obj) {
  obj.className = "acertou";
  adicionarImagem("imagem", "https://i.scdn.co/image/ab67616100005174cde5a0d57c1b79de5fce6bee", obj);
}

// Função executada quando o jogador errou
function errou(obj) {
  obj.className = "errou";
  adicionarImagem("imagem2", "https://compras.wiki.ufsc.br/images/thumb/5/56/Erro.png/600px-Erro.png?20180222192440", obj);
}

// Função que sorteia um número aleatório e verifica o acerto
function verifica(obj) {
  if (!jogar) {
    alert('Clique em "Jogar novamente"');
    return;
  }

  jogar = false;
  tentativas++;

  if (tentativas === 5) {
    btnJogarNovamente.className = 'invisivel';
    btnReiniciar.className = 'visivel';

    if (acertos === 5) {
      for (let i = 0; i <= 4; i++) {
        let carta = document.getElementById(i);
        carta.classList.add('vitoria');
      }
    }

    if (acertos === 0) {
      for (let i = 0; i <= 4; i++) {
        let carta = document.getElementById(i);
        carta.classList.add('treme');
      }
    }
  }

  const sorteado = Math.floor(Math.random() * 5);

  if (obj.id == sorteado) {
    acertou(obj);
    acertos++;
  } else {
    errou(obj);
    const objSorteado = document.getElementById(sorteado);
    acertou(objSorteado);
  }

  atualizaPlacar(acertos, tentativas);
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
