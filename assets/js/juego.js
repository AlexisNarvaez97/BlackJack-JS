// Patron Modulo.
const miModulo = (() => {
  "use strict";

  let deck = [];

  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  // let puntosJugador = 0,
  //   puntosComputadora = 0;

  let pointsPlayers = [];

  // Referencias del HTML

  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevo = document.querySelector("#btnNuevo");

  const divCartas = document.querySelectorAll(".divCartas"),
    puntosJugadores = document.querySelectorAll("small");

  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();

    pointsPlayers = [];

    for (let i = 0; i < numJugadores; i++) {
      pointsPlayers.push(0);
    }

    puntosJugadores.forEach(elem => elem.innerText = 0);
    divCartas.forEach(elem => elem.innerHTML = '');

    btnPedir.disabled = false;
    btnDetener.disabled = false;

    console.log({ pointsPlayers });
  };

  // Esta función crea una baraja
  const crearDeck = () => {
    deck = [];
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

    return _.shuffle(deck);
  };

  // Esta función me permite tomar una carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "Ya no hay mas cartas en el deck";
    }
    return deck.pop();
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  // Turno: 0 = primer jugador, el ultimo será la computadora
  const acumularPuntos = (carta, turno) => {
    pointsPlayers[turno] = pointsPlayers[turno] + valorCarta(carta);
    puntosJugadores[turno].innerText = pointsPlayers[turno];
    return pointsPlayers[turno];
  };

  const crearCartaImg = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartas[turno].append(imgCarta);
  }

  const determinarGanador = () => {

    const [ puntosMinimos, puntosComputadora ] = pointsPlayers;

    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert("Nadie gana :(");
      } else if (puntosMinimos > 21) {
        alert("Computadora gana");
      } else if (puntosComputadora > 21) {
        alert("Jugador 1 Gana");
      } else {
        alert("Computadora Gana");
      }
    }, 500);
  }

  // Turno de la computadora, cuando el jugador pierde o llega a 21
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, pointsPlayers.length - 1);
      crearCartaImg(carta, pointsPlayers.length - 1);
      // const imgCarta = document.createElement("img");
      // imgCarta.src = `assets/cartas/${carta}.png`;
      // imgCarta.classList.add("carta");
      // divCartasComputadora.append(imgCarta);
      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();

  };

  // Eventos

  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    crearCartaImg(carta, 0);

    if (puntosJugador > 21) {
      console.warn("Lo siento mucho perdiste");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      console.warn("21, Genial");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }

    // console.log(puntosJugador);
  });

  btnDetener.addEventListener("click", () => {

    const puntosJugador = pointsPlayers[0];
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    // console.log(puntosJugador);
    turnoComputadora(puntosJugador);
  });

  // btnNuevo.addEventListener("click", () => {
  //   inicializarJuego();
  // });


  return {
    nuevoJuego: inicializarJuego
  };


})();
