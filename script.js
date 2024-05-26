const menuInicial = document.getElementById("menu-inicial")
const menuJugar = document.getElementById("menu-jugar")

let dinero = 100
let dineroContador = document.getElementById("dinero-usuario");
dineroContador.textContent = "Fondos: " + dinero + "€";

let tuMano 
let carta1 
let carta2 
let cartaNueva 
let manoCrupier
let cartaCrupier1
let cartaCrupier2
let cartaCrupierNueva
let apuestaInicial

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
    dinero = dinero + (2*apuestaInicial)
    dineroContador.textContent = "Fondos: " + dinero + "€";

    menuInicial.style.display = "inline-flex";
    menuJugar.style.display = "none" 
}

function derrota() {
    alert("perdiste")

    menuInicial.style.display = "inline-flex";
    menuJugar.style.display = "none" 
}

function empate() {
    alert("empate")
    dinero = dinero + apuestaInicial
    dineroContador.textContent = "Fondos: " + dinero + "€";

    menuInicial.style.display = "inline-flex";
    menuJugar.style.display = "none" 
}

function comprobarApuesta() {
    apuestaInicial = document.getElementById("apuesta").value

    if(dinero-apuestaInicial<0){
        alert("No puedes aportar")
    } else  {
        dinero =  dinero-apuestaInicial
        dineroContador.textContent = "Fondos: " + dinero + "€";
        apostar()
    }
}

function apostar() {
    carta1 = generarNumeroCarta()
    carta2 = generarNumeroCarta()

    if (carta1==1){
        if (11+carta2>21){
            carta1 = 1
        } else{
            carta1 = 11
        }   
    }

    if (carta2==1){
        if (11+carta1>21){
            carta2 = 1
        } else{
            carta2 = 11
        }   
    }

    tuMano =  carta1 + carta2

    cartaCrupier1 =  generarNumeroCarta()
    cartaCrupier2 =  generarNumeroCarta()

    if (cartaCrupier1==1){
        if (11+cartaCrupier2>21){
            cartaCrupier1 = 1
        } else{
            cartaCrupier1 = 11
        }   
    }

    if (cartaCrupier2==1){
        if (11+cartaCrupier1>21){
            cartaCrupier2 = 1
        } else{
            cartaCrupier2 = 11
        }   
    }

    manoCrupier = cartaCrupier1 + cartaCrupier2

    console.log(carta1, carta2, cartaCrupier1,cartaCrupier2)
    console.log("Tu mano: " + tuMano)
    console.log("Mano crupier: " + manoCrupier)

    menuInicial.style.display = "none";
    menuJugar.style.display = " inline-flex"  
}

function pedirCarta() {
    cartaNueva = generarNumeroCarta()

     if (cartaNueva==1){
        if (11+carta1+carta2>21){
            cartaNueva = 1
        } else{
            cartaNueva = 11
        }   
    }

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

    if (cartaCrupierNueva==1){
        if (11+cartaCrupier1+cartaCrupier2>21){
            cartaCrupierNueva = 1
        } else{
            cartaCrupierNueva = 11
        }   
    }

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