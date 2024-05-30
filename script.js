const baraja = {
    2: ["2_of_clubs.png","2_of_diamonds.png","2_of_hearts.png","2_of_spades.png"],
    3: ["3_of_clubs.png","3_of_diamonds.png","3_of_hearts.png","3_of_spades.png"],
    4: ["4_of_clubs.png","4_of_diamonds.png","4_of_hearts.png","4_of_spades.png"],
    5: ["5_of_clubs.png","5_of_diamonds.png","5_of_hearts.png","5_of_spades.png"],
    6: ["6_of_clubs.png","6_of_diamonds.png","6_of_hearts.png","6_of_spades.png"],
    7: ["7_of_clubs.png","7_of_diamonds.png","7_of_hearts.png","7_of_spades.png"],
    8: ["8_of_clubs.png","8_of_diamonds.png","8_of_hearts.png","8_of_spades.png"],
    9: ["9_of_clubs.png","9_of_diamonds.png","9_of_hearts.png","9_of_spades.png"],
    10: ["10_of_clubs.png","10_of_diamonds.png","10_of_hearts.png","10_of_spades.png","jack_of_clubs2.png",
        "jack_of_diamonds2.png","jack_of_hearts2.png","jack_of_spades2.png","king_of_clubs2.png",
        "king_of_diamonds2.png","king_of_hearts2.png","king_of_spades2.png","queen_of_clubs2.png",
        "queen_of_diamonds2.png","queen_of_hearts2.png","queen_of_spades2.png"],
    11: ["ace_of_clubs.png","ace_of_diamonds.png","ace_of_hearts.png","ace_of_spades.png"],
    1: ["ace_of_clubs.png","ace_of_diamonds.png","ace_of_hearts.png","ace_of_spades.png"]
}

const menuInicial = document.getElementById("menu-inicial")
const menuJugar = document.getElementById("menu-jugar")
const carta1Imagen = document.getElementById("carta-1")
const carta2Imagen = document.getElementById("carta-2")
const carta1CrupierImagen = document.getElementById("carta-crupier-1")
const carta2CrupierImagen = document.getElementById("carta-crupier-2")

const botonApostar = document.getElementById("apostar-boton")
const botonPedir = document.getElementById("pedir-boton")
const botonPlantarse = document.getElementById("plantarse-boton")

botonApostar.addEventListener("click",comprobarApuesta)
botonPedir.addEventListener("click",pedirCarta)
botonPlantarse.addEventListener("click",plantarse)

let dinero = 100
let dineroContador = document.getElementById("dinero-usuario");
dineroContador.textContent = "Fondos: " + dinero + "€";

let tuMano, carta1, carta2, manoCrupier, cartaCrupier1, cartaCrupier2, apuestaInicial
let cartaNueva = 0
let cartaCrupierNueva = 0


function generarNumeroCarta() {
    const random = Math.random();

    if (random < 0.2) {
        return 10;
    } else {
        return Math.floor(Math.random() * 9) + 1;
    }
}

function vitoria() {
    alert("ganaste")
    console.clear()
    dinero = dinero + (2*apuestaInicial)
    dineroContador.textContent = "Fondos: " + dinero + "€";

    menuInicial.style.display = "inline-flex";
    menuJugar.style.display = "none" 
}

function derrota() {
    alert("perdiste")
    console.clear()

    menuInicial.style.display = "inline-flex";
    menuJugar.style.display = "none" 
}

function empate() {
    alert("empate")
    console.clear()
    dinero = parseInt(dinero) + parseInt(apuestaInicial)
    dineroContador.textContent = "Fondos: " + dinero + "€";

    menuInicial.style.display = "inline-flex";
    menuJugar.style.display = "none" 
}

function comprobarApuesta() {
    apuestaInicial = document.getElementById("apuesta").value

    if(dinero-apuestaInicial < 0 || apuestaInicial <= 0){
        alert("No puedes aportar")
    } else  {
        dinero =  dinero-apuestaInicial
        dineroContador.textContent = "Fondos: " + dinero + "€";
        apostar()
    }
}

function comprobarCarta(carta,valor) {
    if (carta === carta1) {
        carta1 = valor;
    } else if (carta === carta2) {
        carta2 = valor;
    } else if (carta === cartaNueva) {
        cartaNueva = valor;
    } else if (carta === cartaCrupier1) {
        cartaCrupier1 = valor;
    } else if (carta === cartaCrupier2) {
        cartaCrupier2 = valor;
    } else if (carta === cartaCrupierNueva) {
        cartaCrupierNueva = valor;
    }
}

function comprobarAs(primera,segunda,nueva) {
    if (primera==1 && segunda==1){
        if (primera == carta1){
            return carta1 = 11
        }else {
            return cartaCrupier1 = 11
        }
    }
    if (primera==1){
        if (11+segunda>21){
            comprobarCarta(primera,1)
        }else {
             comprobarCarta(primera,11)
        }   
    }
    if (segunda==1){
        if (11+primera>21){
            comprobarCarta(segunda,1)
        }else {
            comprobarCarta(segunda,11)
            }   
        }
    if (nueva==1){
        if (11+primera+segunda>21){
             comprobarCarta(nueva,1)
        }else {
            comprobarCarta(nueva,11)
        }   
    }
    }

function apostar() {
    carta1 = generarNumeroCarta()
    carta2 = generarNumeroCarta()

    comprobarAs(carta1,carta2,cartaNueva)

    tuMano = carta1 + carta2

    cartaCrupier1 =  generarNumeroCarta()
    cartaCrupier2 =  generarNumeroCarta()

    comprobarAs(cartaCrupier1,cartaCrupier2,cartaCrupierNueva)

    manoCrupier = cartaCrupier1 + cartaCrupier2

    console.log(carta1, carta2, cartaCrupier1, cartaCrupier2)
    console.log("Tu mano: " + tuMano)
    console.log("Mano crupier: " + manoCrupier)

    let z = Math.floor(Math.random() * 16)
    let y = Math.floor(Math.random() * 16)
    let x = Math.floor(Math.random() * 16)
    let w = Math.floor(Math.random() * 16)
    let a = Math.floor(Math.random() *4)
    let b = Math.floor(Math.random() *4)
    let c = Math.floor(Math.random() *4)
    let d = Math.floor(Math.random() *4)

    if (carta1==10){
        carta1Imagen.setAttribute("src","baraja-img/" + baraja[carta1][z])
    } else{
        carta1Imagen.setAttribute("src","baraja-img/" + baraja[carta1][a])
    } 
    if (carta2==10){
        carta2Imagen.setAttribute("src","baraja-img/" + baraja[carta2][y])
    } else {
        carta2Imagen.setAttribute("src","baraja-img/" + baraja[carta2][b])
    }
    
    if (cartaCrupier1==10){
        carta1CrupierImagen.setAttribute("src","baraja-img/" + baraja[cartaCrupier1][x])
    } else{
        carta1CrupierImagen.setAttribute("src","baraja-img/" + baraja[cartaCrupier1][c])
    } 
    if (cartaCrupier2==10){
        carta2CrupierImagen.setAttribute("src","baraja-img/" + baraja[cartaCrupier2][w])
    } else {
        carta2CrupierImagen.setAttribute("src","baraja-img/" + baraja[cartaCrupier2][d])
    }


    menuInicial.style.display = "none";
    menuJugar.style.display = " inline-flex" 
    
    if (tuMano == 21 && manoCrupier == 21) {
        empate()
    } else if (tuMano == 21) {
        vitoria()
    } else if (manoCrupier == 21){
        derrota()
    }
}

function pedirCarta() {
    cartaNueva = generarNumeroCarta()

    comprobarAs(carta1,carta2,cartaNueva)

    console.log(cartaNueva)
    tuMano = tuMano + cartaNueva
    console.log("Tu mano: " + tuMano)

    if (tuMano>21) {
        derrota()

        menuInicial.style.display = "inline-flex";
        menuJugar.style.display = "none" 
    } else if (tuMano == 21) {
        vitoria()
    }
}

function plantarse(){
    cartaCrupierNueva = generarNumeroCarta()

   comprobarAs(cartaCrupier1,cartaCrupier2,cartaCrupierNueva)

    if (manoCrupier > tuMano){
        derrota()
    } else if (manoCrupier == tuMano && manoCrupier > 16) {
        empate()
    }

    console.log("Carta nueva del crupier: " + cartaCrupierNueva)
    manoCrupier = manoCrupier + cartaCrupierNueva
    console.log("Mano crupier: " + manoCrupier)

    if (manoCrupier > 21) {
        vitoria()
    } else if (manoCrupier == tuMano) {
        empate()
    } else if (manoCrupier == 21 || manoCrupier > tuMano) {
        derrota()
    } else {
        setTimeout(plantarse,1500)
    }
}

//realizar pantalla perder,  ganar  y empate, mejorar  comprobacion de apuesta, visializacion de cartas y mejora hud (ya es jugable en la consola)
//por fin consegui crear la funcion d comprobar as, no estoy seguro si ahorra lineas pero las demas funciones quedan mas claras ahora