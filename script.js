document.addEventListener('DOMContentLoaded', () => {
    const tabuleiro = document.getElementById('tabuleiro');
    const cartas = [
    'imagens/javascript.png',
    'imagens/html5.png',
    'imagens/css3.png'
];

    const cartasEmbaralhadas = [...cartas, ...cartas].sort(() => Math.random() - 0.5);

    let cartasViradas = [];
    let comecaJogo = false;

    cartasEmbaralhadas.forEach((camImagem) => {
        const carta = document.createElement('div');
        carta.className = 'carta';
        
        //Cria o elemento img dinamicamente no HTML
        const img = document.createElement('img');
        img.src = camImagem;
        img.alt = 'logo';

        //adiciona a imagem à carta e a carta ao tabuleiro
        carta.appendChild(img);
        tabuleiro.appendChild(carta);

        carta.addEventListener('click', () => {
           //REGRA: só permite virar 2 cartas por vez
           if (!comecaJogo) return;
           if(cartasViradas.length < 2 && !carta.classList.contains('virada')){
                carta.classList.add('virada');
                cartasViradas.push(carta);

                //Verificação de igualdade de duas cartas viradas
                if(cartasViradas.length == 2){
                    const [carta1, carta2] = cartasViradas;

                    //comparação entre os caminhos das cartas
                    if(carta1.querySelector('img').src === carta2.querySelector('img').src){
                        cartasViradas = []
                    } else {
                        setTimeout(() => {
                            carta1.classList.remove('virada');
                            carta2.classList.remove('virada');
                            cartasViradas = [];
                        }, 500);
                    }
                }
           }
        });
    });
    setTimeout(() => {
        const todasAsCartas = document.querySelectorAll('.carta');
        todasAsCartas.forEach(carta => carta.classList.add('virada'));

        setTimeout(() => {
            todasAsCartas.forEach(carta => carta.classList.remove('virada'));
            comecaJogo = true;
        }, 2000);
    }, 100);
});

