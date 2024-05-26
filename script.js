
let dinero = 100
let dineroContador = document.getElementById("dinero-usuario");
dineroContador.textContent = "Fondos: " + dinero + "€";

let tuMano = 0
let carta1 = 0
let carta2 = 0
let cartaNueva = 0
let carta4 = 0

function generarNumeroCarta() {
    const random = Math.random();

    if (random < 0.2) {
        return 10;
    } else {
        return Math.floor(Math.random() * 9) + 1;
    }
}

function apostar() {
    const apuestaInicial = document.getElementById("apuesta").value
    const menuInicial = document.getElementById("menu-inicial")
    const menuJugar = document.getElementById("menu-jugar")
    
    if(dinero-apuestaInicial<0){
        alert("No puedes aportar")
    } else  {
        dinero =  dinero-apuestaInicial
        dineroContador.textContent = "Fondos: " + dinero + "€";
    }

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

    let cartaCrupier1 =  generarNumeroCarta()
    let cartaCrupier2 =  generarNumeroCarta()

    let manoCrupier = cartaCrupier1 + cartaCrupier2

    console.log(carta1, carta2, cartaCrupier1,cartaCrupier2)
    console.log("Tu mano: " + tuMano)
    console.log("Mano crupier: " + manoCrupier)

    menuInicial.style.display = "none";
    menuJugar.style.display = " inline-flex"  
}

function pedirCarta1() {
    const botonCarta = document.getElementById("pedir-boton")
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
        alert("perdiste cara d alpiste")
    }


//realizar pantalla perder, boton d plantarse y que juegue el crupier(mejorar las cartas del crupier), realizar comprobacion final y devolver al principio
}

