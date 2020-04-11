let deck = [];

const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0,
    puntosComputadora = 0;


// Referencias del HTML

const btnPedir = document.querySelector('#btnPedir');

const puntosJugadores = document.querySelectorAll('small');

// Esta función crea una baraja
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let especial of especiales) {
      deck.push(especial + tipo);
    }
  }

  // console.log(deck);

  deck = _.shuffle(deck);

  console.log(deck);
  return deck;
};

crearDeck();

// Esta función me permite tomar una carta

const pedirCarta = () => {
  if (deck.length === 0) {
    throw "Ya no hay mas cartas en el deck";
  }

  const cartaAleatorio = deck.pop();
  // console.log(cartaAleatorio);
  return cartaAleatorio;
};

// pedirCarta();

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return (isNaN(valor)) ?
         ( valor === 'A') ? 11: 10
         : valor * 1;

  // let puntos = 0;

  // if (isNaN(valor)) {
  //   puntos = valor === "A" ? 11 : 10;
  // } else {
  //   puntos = valor * 1;
  // }

  // console.log(puntos);
};

const valor = valorCarta(pedirCarta());
// console.log({valor});


// Eventos

btnPedir.addEventListener('click', () => {

  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  puntosJugadores[0].innerText = puntosJugador;

  console.log(puntosJugador);

});