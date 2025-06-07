document.addEventListener('DOMContentLoaded', () => {
    const tabuleiro = document.getElementById('tabuleiro');
    const cartas = [
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg'
];

    const cartasEmbaralhadas = [...cartas, ...cartas].sort(() => Math.random() - 0.5);

    let cartasViradas = [];

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
                        }, 1000);
                    }
                }
           }
        });
    });
});

