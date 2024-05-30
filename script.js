import { baraja } from './scriptCartas.js'

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

   

    cartaCrupier1 =  generarNumeroCarta()
    cartaCrupier2 =  generarNumeroCarta()

    comprobarAs(cartaCrupier1,cartaCrupier2,cartaCrupierNueva)

    manoCrupier = cartaCrupier1 + cartaCrupier2

    console.log(carta1, carta2, cartaCrupier1, cartaCrupier2)
    console.log("Tu mano: " + tuMano)
    console.log("Mano crupier: " + manoCrupier)

    let z = Math.floor(Math.random() * 16)
    let y = Math.floor(Math.random() * 16)
    let a = Math.floor(Math.random() *4)
    let b = Math.floor(Math.random() *4)
    let c = Math.floor(Math.random() *4)
    let d = Math.floor(Math.random() *4)

    console.log("A vale " +a)
    console.log("B vale " +b)
    console.log("C vale " +c)
    console.log("D vale " +d)
    console.log("Z vale " +z)
    console.log("Y vale " +y)

    if (carta1==10){
        carta1Imagen.setAttribute("src","baraja-img/" + baraja[carta1][z])
    } else if (carta2==10){
        carta2Imagen.setAttribute("src","baraja-img/" + baraja[carta2][z])
    } else{
        carta1Imagen.setAttribute("src","baraja-img/" + baraja[carta1][a])
        carta2Imagen.setAttribute("src","baraja-img/" + baraja[carta2][b])
    }
    
    if (cartaCrupier1==10){
        carta1CrupierImagen.setAttribute("src","baraja-img/" + baraja[cartaCrupier1][y])
    } else if (cartaCrupier2==10){
        carta2CrupierImagen.setAttribute("src","baraja-img/" + baraja[cartaCrupier2][y])
    } else{
        carta1CrupierImagen.setAttribute("src","baraja-img/" + baraja[cartaCrupier1][c])
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