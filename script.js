const menuInicial = document.getElementById("menu-inicial")
const menuJugar = document.getElementById("menu-jugar")

let dinero = 100
let dineroContador = document.getElementById("dinero-usuario");
dineroContador.textContent = "Fondos: " + dinero + "€";

let tuMano 
let carta1 
let carta2 
let cartaNueva = 0
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

function comprobarAs(primera,segunda,nueva) {
    if (primera==1 && segunda==1){
        if (primera == carta1){
            return carta1 = 1
        } else {
            return cartaCrupier1 = 1
        }
    }
    if (primera==1){
        if (11+segunda>21){
            if (primera == carta1){
                carta1 = 1
            } else {
                cartaCrupier1 = 1
            }
        } else{
            if (primera == carta1){
                carta1 = 11
            } else {
                cartaCrupier1 = 11
            }
        }   
    }
    if (segunda==1){
        if (11+primera>21){
            if (segunda == carta2){
                carta2 = 1
            } else {
                cartaCrupier2 = 1
            }
        } else{
            if (segunda == carta2){
                carta2 = 11
            } else {
                cartaCrupier2 = 11
            }
        }   
    }
    if (nueva==1){
        if (11+primera+segunda>21){
            if (nueva == cartaNueva){
                cartaNueva = 1
            } else {
                cartaCrupierNueva = 1
            }
        } else{
            if (nueva == cartaNueva){
                cartaNueva = 11
            } else {
                cartaCrupierNueva = 11
            }
        }   
    }
}

function apostar() {
    carta1 = generarNumeroCarta()
    carta2 = generarNumeroCarta()

    comprobarAs(carta1,carta2,cartaNueva)

    tuMano =  carta1 + carta2

    cartaCrupier1 =  generarNumeroCarta()
    cartaCrupier2 =  generarNumeroCarta()

    comprobarAs(cartaCrupier1,cartaCrupier2,cartaCrupierNueva)

    manoCrupier = cartaCrupier1 + cartaCrupier2

    console.log(carta1, carta2, cartaCrupier1,cartaCrupier2)
    console.log("Tu mano: " + tuMano)
    console.log("Mano crupier: " + manoCrupier)

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