document.addEventListener("DOMContentLoaded", () => {
  const tabuleiro = document.getElementById("tabuleiro");
  const botaoComecar = document.getElementById("comecar");
  const telaInicial = document.getElementById("tela-inicial");

  const cartas = [
    "imagens/javascript.png",
    "imagens/html5.png",
    "imagens/css3.png",
  ];

  const cartasEmbaralhadas = [...cartas, ...cartas].sort(
    () => Math.random() - 0.5
  );
  let cartasViradas = [];
  let comecaJogo = false;

  cartasEmbaralhadas.forEach((camImagem) => {
    const carta = document.createElement("div");
    carta.className = "carta";

    //Cria o elemento img dinamicamente no HTML
    const img = document.createElement("img");
    img.src = camImagem;
    img.alt = "logo";

    //adiciona a imagem à carta e a carta ao tabuleiro
    carta.appendChild(img);
    tabuleiro.appendChild(carta);

    carta.addEventListener("click", () => {
      //REGRA: só permite virar 2 cartas por vez
      if (!comecaJogo) return;
      if (cartasViradas.length < 2 && !carta.classList.contains("virada")) {
        carta.classList.add("virada");
        cartasViradas.push(carta);

        //Verificação de igualdade de duas cartas viradas
        if (cartasViradas.length == 2) {
          const [carta1, carta2] = cartasViradas;

          //comparação entre os caminhos das cartas
          if (
            carta1.querySelector("img").src === carta2.querySelector("img").src
          ) {
            cartasViradas = [];
            verificarFimJogo(comecaJogo);
          } else {
            setTimeout(() => {
              carta1.classList.remove("virada");
              carta2.classList.remove("virada");
              cartasViradas = [];
            }, 500);
          }
        }
      }
    });
  });

  botaoComecar.addEventListener("click", () => {
    telaInicial.style.display = "none";
    tabuleiro.style.display = "grid";
    setTimeout(() => {
      const todasAsCartas = document.querySelectorAll(".carta");
      todasAsCartas.forEach((carta) => carta.classList.add("virada"));

      setTimeout(() => {
        todasAsCartas.forEach((carta) => carta.classList.remove("virada"));
        comecaJogo = true;
      }, 1000);
    }, 100);
  });
});

function dispararConfetes() {
  const duration = 2000;
  const end = Date.now() + duration;

  //efeito dos canhões de confeti
  confetti({
    particleCount: 100,
    angle: 65,
    spread: 55,
    origin: { x: 0 },
    decay: 0.94,
    gravity: 0.6
  });
  
  confetti({
    particleCount: 100,
    angle: 115,
    spread: 55,
    origin: { x: 1 },
    decay: 0.94,
    gravity: 0.6
  });

  // efeito de queda dos confetis
  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 50,
      origin: { x: 0 },
      decay: 0.92,
      gravity: 0.5,
      scalar: 1.3
    });
    
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 50,
      origin: { x: 1 },
      decay: 0.92,
      gravity: 0.5,
      scalar: 1.3
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  
  setTimeout(frame, 500);
}

function verificarFimJogo(comecaJogo) {
  const cartasNaoViradas = document.querySelectorAll(".carta:not(.virada)");
  const finalJogo = document.getElementById('final-jogo');
  if (cartasNaoViradas.length === 0 && comecaJogo) {
    setTimeout(() => {
      dispararConfetes();
      finalJogo.style.display = "flex";
    }, 500);
  }
}

document.getElementById("recomecar-jogo").addEventListener("click", function() {
  location.reload(); // Recarrega a página completamente
});