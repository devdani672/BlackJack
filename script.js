
function empezarPartida(){
    const formulario = document.getElementById("formulario");
    const perfil = document.getElementById("perfil");
    const nombre = document.getElementById("nombre-usuario")
    let nombreJugador = document.getElementById("nombre").value
    
    nombre.textContent = nombreJugador
    formulario.style.display = "none"
    menuInicial.style.opacity = "1";
    perfil.style.opacity = "1"

}

function generarNumeroCarta() {
    const random = Math.random();

    if (random < 0.2) {
        return 10;
    } else {
        return Math.floor(Math.random() * 9) + 1;
    }
}

function volverMenu() {
    menuInicial.style.display = "inline-flex";
    menuJugar.style.display = "none" 
    resultadoPantalla.style.display = "none"
    carta1Imagen.style.display = "none"
    carta2Imagen.style.display = "none"
    carta1CrupierImagen.style.display = "none"
    carta2CrupierImagen.style.display = "none"
    contadorJugador.textContent = ""
    contador2Jugador.textContent = ""
    contadorCrupier.textContent = ""
    contadorJugador.style.opacity = "0"
    contador2Jugador.style.opacity = "0"
    contadorCrupier.style.opacity = "0"
    botonDividir.style.pointerEvents = ""
    botonDoblar.style.pointerEvents = ""
    botonPedir.style.pointerEvents = ""
    botonPedir.style.opacity = "1"
    botonPlantarse.style.pointerEvents = ""
    botonPlantarse.style.opacity = "1"
    contenedorMano2.style.display = "none"
    mano1CartasJugador.appendChild(carta2Imagen)

    let basuras = document.querySelectorAll(".carta-nueva")
    for (let i = 0; i < basuras.length; i++) {
        let basura = document.querySelector(".carta-nueva")
        basura.remove()
    }
    
    let basurasCrupier = document.querySelectorAll(".carta-crupier-nueva")
    for (let i = 0; i < basurasCrupier.length; i++) {
        let basura = document.querySelector(".carta-crupier-nueva")
        basura.remove()
    }
 
}

function ajustarPantalla(resultado,texto) {
    resultadoPantalla.style.display = "inline-flex"
    resultadoTitulo.textContent = resultado
    if (resultado == "EMPATE"){
        //console.log("es empate")
        resultadoDinero.textContent = ""
    } else{
        resultadoDinero.textContent = texto + apuestaInicial + "€"
    }
}

function victoria() {
    ajustarPantalla("¡GANASTE!","Ganancia neta: +")

    dinero = dinero + (2*apuestaInicial)
    dineroContador.textContent = "Fondos: " + dinero + "€";
}

function derrota() {
    ajustarPantalla("PERDISTE","Perdida neta: -")
}

function empate() {
    ajustarPantalla("EMPATE")
    
    dinero = parseInt(dinero) + parseInt(apuestaInicial)
    dineroContador.textContent = "Fondos: " + dinero + "€";
}

function resolucion(){
    if (contenedorMano2.style.display == "flex") { // si se ha divido

        const manoCrupierIgualTuMano = manoCrupier == tuMano; // empata la mano 1 con la mano del crupier
        const tuMano2Perdida = tuMano2 > 21; // la mano 2 se pasa de 21
        const crupierMejorTuMano2 = manoCrupier > tuMano2 && manoCrupier <= 21; // la mano del crupier se acerca más a 21 que la mano 1

        const manoCrupierIgualTuMano2 = manoCrupier == tuMano2; // empata la mano 2 con la mano del crupier
        const tuManoPerdida = tuMano > 21; // la manno 1 se pasa de 21
        const crupierMejorTuMano = manoCrupier > tuMano && manoCrupier <= 21; // la mano del crupier se acerca más a 21 que la mano 1

        const perderMano1AmbasManeras = tuManoPerdida || crupierMejorTuMano; // las dos maneras de perder la mano 1 agrupadas
        const perderMano2AmbasManeras = tuMano2Perdida || crupierMejorTuMano2; // las dos maneras de perder la mano 2 agrupadas

        const tuManoMejorCrupier = tuMano > manoCrupier && tuMano <= 21;
        const tuMano2MejorCrupier = tuMano2 > manoCrupier && tuMano2 <= 21;
        const crupierPerdida = manoCrupier > 21;

        const ganarMano1AmbasManeras = crupierPerdida || tuManoMejorCrupier;
        const ganarMano2AmbasManeras = crupierPerdida || tuMano2MejorCrupier;

        if(perderMano1AmbasManeras && perderMano2AmbasManeras){ //pierden las 2 manos
            derrota()
        } else if ((manoCrupierIgualTuMano && perderMano2AmbasManeras) || (manoCrupierIgualTuMano2 && perderMano1AmbasManeras)) { //pierde una gana otra
            apuestaInicial = apuestaInicial / 2
            derrota()
        } else if ((manoCrupierIgualTuMano && manoCrupierIgualTuMano2) || (ganarMano1AmbasManeras && perderMano2AmbasManeras) ||
                   (ganarMano2AmbasManeras && perderMano1AmbasManeras)){ // o empatan las dos o gana una y pierde otra
            empate()
        } else if ((manoCrupierIgualTuMano && ganarMano2AmbasManeras) || (manoCrupierIgualTuMano2 && ganarMano1AmbasManeras)){ // gana una empata otra
            apuestaInicial = apuestaInicial / 2
            victoria()
            dinero = dinero + apuestaInicial
            dineroContador.textContent = "Fondos: " + dinero + "€"
        } else { // gana las dos
            victoria()
        }
    } else {
        if (manoCrupier == tuMano){ // si no se ha dividido
            empate()
        } else if(manoCrupier > tuMano && manoCrupier <= 21){
            derrota()
        } else {
           victoria()
        }
    }
       
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

function comprobarAs(primera,segunda,nueva,mano) {
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
        if (11+mano>21){
            comprobarCarta(nueva,1)
        }else {
            comprobarCarta(nueva,11)
        }   
    }
}

function generarImagenCarta(valorCarta, carta) {
    let z = Math.floor(Math.random() * 16)
    let a = Math.floor(Math.random() *4)

    if (valorCarta==10){
        carta.src = "baraja-img/" + baraja[valorCarta][z]
    } else{
        carta.src = "baraja-img/" + baraja[valorCarta][a]
    } 

}

function apostar() {
    botonDoblar.addEventListener("click",doblar)
    botonDoblar.style.opacity = "1"
    botonDoblar.style.cursor = "pointer"
    carta1Imagen.style.display = "inline"
    carta2Imagen.style.display = "inline"
    carta1CrupierImagen.style.display = "inline"
    carta2CrupierImagen.style.display = "inline"

    // GENERAR CARTAS JUGADOR Y MANO JUGADOR
    carta1 = generarNumeroCarta()
    carta2 = generarNumeroCarta()
    tuMano = carta1 + carta2
    
    comprobarAs(carta1,carta2,cartaNueva,tuMano)

    tuMano = carta1 + carta2
    contadorJugador.textContent = tuMano

    // HABILITAR DIVIDIR
    if (carta1 == carta2) {
        botonDividir.addEventListener("click",dividir)
        botonDividir.style.opacity = "1"
        botonDividir.style.cursor = "pointer"
    }

    // GENERAR CARTAS CRUPIER Y MANO CRUPIER
    cartaCrupier1 =  generarNumeroCarta()
    cartaCrupier2 =  generarNumeroCarta()

    comprobarAs(cartaCrupier1,cartaCrupier2,cartaCrupierNueva)

    // ACTIVAR LOS CONTADORES
    manoCrupier = cartaCrupier1 + cartaCrupier2
    contadorCrupier.textContent = cartaCrupier1 + "+?"
    contadorCrupier.style.opacity = "1"
    contadorJugador.style.opacity = "1"

    // GENERAR LAS IMÁGENES DE LAS CARTAS
    generarImagenCarta(carta1, carta1Imagen)
    generarImagenCarta(carta2, carta2Imagen)
    generarImagenCarta(cartaCrupier1, carta1CrupierImagen)

    carta2CrupierImagen.setAttribute("src","baraja-img/caratula.png")
    
    // CAMBIAR MENU
    menuInicial.style.display = "none";
    menuJugar.style.display = " inline-flex" 
}

function pedirCarta() {
    cartaNueva = generarNumeroCarta()
    cartaNueva2 = generarNumeroCarta()

    comprobarAs(carta1,carta2,cartaNueva,tuMano)

    tuMano = tuMano + cartaNueva
    contadorJugador.textContent = tuMano

    tuMano2 = tuMano2 + cartaNueva2
    contador2Jugador.textContent = tuMano2

    // GENERAR LA CARTA NUEVA PARA LA MANO 1
    let imgCartaNueva = document.createElement("img")
    imgCartaNueva.setAttribute("class","carta-nueva")
    mano1CartasJugador.appendChild(imgCartaNueva)

    generarImagenCarta(cartaNueva, imgCartaNueva)

    // GENERAR LA CARTA NUEVA PARA LA MANO 2 (que solo se vera si se divide)
    let imgCartaNueva2 = document.createElement("img")
    imgCartaNueva2.setAttribute("class","carta-nueva")
    mano2CartasJugador.appendChild(imgCartaNueva2)

    generarImagenCarta(cartaNueva2, imgCartaNueva2)

    // DESATIVAR BOTON DOBLAR Y DIVIDIR
    botonDoblar.style.pointerEvents = "none"
    botonDoblar.style.opacity = "0.7"

    botonDividir.style.pointerEvents = "none"
    botonDividir.style.opacity = "0.7"

    if (contenedorMano2.style.display == "flex") {
        if (tuMano > 21 && tuMano2 > 21){
             derrota()
        }
    } else {
        if (tuMano>21) {
            acabarPartida = true
            return derrota()
    }
    }
}

function plantarse(){
    if (carta2CrupierImagen.getAttribute("src")== "baraja-img/caratula.png") {
        generarImagenCarta(cartaCrupier2, carta2CrupierImagen)
    }
    contadorCrupier.textContent = manoCrupier
    setTimeout(function(){
        if (manoCrupier < 17) {
            cartaCrupierNueva = generarNumeroCarta()
    
            comprobarAs(cartaCrupier1,cartaCrupier2,cartaCrupierNueva,manoCrupier)
    
            manoCrupier = manoCrupier + cartaCrupierNueva
            contadorCrupier.textContent = manoCrupier
    
            // GENERAR IMG CARTA NUEVA DEL CRUPIER
            let imgCartaNuevaCrupier = document.createElement("img")
            imgCartaNuevaCrupier.setAttribute("class","carta-crupier-nueva")
            contenedorCartasCrupier.appendChild(imgCartaNuevaCrupier)
    
            generarImagenCarta(cartaCrupierNueva, imgCartaNuevaCrupier)
    
            // DESACTIVAR LOS DEMAS BOTONES
            botonDoblar.style.pointerEvents = "none"
            botonDoblar.style.opacity = "0.7"
    
            botonDividir.style.pointerEvents = "none"
            botonDividir.style.opacity = "0.7"
            
            botonPedir.style.pointerEvents = "none"
            botonPedir.style.opacity = "0.7"
    
            botonPlantarse.style.pointerEvents = "none"
            botonPlantarse.style.opacity = "0.7"
    
             // REPETIR PROCESO
            setTimeout(plantarse,800)
        } else{
            return resolucion()
        } 

    },800)
    
    
}

function doblar() {
    dinero =  dinero-apuestaInicial
    dineroContador.textContent = "Fondos: " + dinero + "€";
    apuestaInicial = apuestaInicial * 2;

    pedirCarta()

    if (tuMano>21) {
         derrota()
    } else{
        plantarse()
    }
}

function dividir() {
    botonDividir.style.opacity = ".5"
    botonDividir.style.pointerEvents = "none"

    dinero =  dinero-apuestaInicial
    dineroContador.textContent = "Fondos: " + dinero + "€";
    apuestaInicial = apuestaInicial * 2

    tuMano = tuMano / 2
    tuMano2 = tuMano
    contadorJugador.textContent = tuMano2

    contenedorMano2.style.display = "flex"
    contador2Jugador.style.opacity = "1"
    contador2Jugador.textContent = tuMano2

    mano2CartasJugador.appendChild(carta2Imagen)
}




// añadir dividir, mejorar HUD (ya es realmente jugable), crear patala de inicio con nombre y sistema d logros