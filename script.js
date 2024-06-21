
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

function ajustarPantalla(resultado,signo) {
    resultadoPantalla.style.display = "inline-flex"
    resultadoTitulo.textContent = resultado
    if (resultado == "EMPATE"){
        //console.log("es empate")
        resultadoDinero.textContent = ""
    } else{
        resultadoDinero.textContent = signo + apuestaInicial + "€"
    }
}

function vitoria() {
    ajustarPantalla("¡GANASTE!","+")

    dinero = dinero + (2*apuestaInicial)
    dineroContador.textContent = "Fondos: " + dinero + "€";
}

function derrota() {
    ajustarPantalla("PERDISTE","-")
}

function empate() {
    ajustarPantalla("EMPATE")
    
    dinero = parseInt(dinero) + parseInt(apuestaInicial)
    dineroContador.textContent = "Fondos: " + dinero + "€";
}

function resolucion(){
    if (manoCrupier == tuMano){
        empate()
    } else if(manoCrupier > tuMano && manoCrupier <= 21){
        derrota()
    } else {
        vitoria()
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

    carta1 = 2
    carta2 = 2
    
    tuMano = carta1 + carta2
    
    comprobarAs(carta1,carta2,cartaNueva,tuMano)

    tuMano = carta1 + carta2
    contadorJugador.textContent = tuMano

    if (carta1 == carta2) {
        botonDividir.addEventListener("click",dividir)
        botonDividir.style.opacity = "1"
        botonDividir.style.cursor = "pointer"
    }

    
    cartaCrupier1 =  generarNumeroCarta()
    cartaCrupier2 =  generarNumeroCarta()

    comprobarAs(cartaCrupier1,cartaCrupier2,cartaCrupierNueva)

    manoCrupier = cartaCrupier1 + cartaCrupier2
    contadorCrupier.textContent = cartaCrupier1 + "+?"
    contadorCrupier.style.opacity = "1"
    contadorJugador.style.opacity = "1"
    contador2Jugador.style.opacity = "1"

    //console.log(carta1, carta2, cartaCrupier1, cartaCrupier2)
    //console.log("Tu mano: " + tuMano)
    //console.log("Mano crupier: " + manoCrupier)

    let z = Math.floor(Math.random() * 16)
    let y = Math.floor(Math.random() * 16)
    let x = Math.floor(Math.random() * 16)
    let a = Math.floor(Math.random() *4)
    let b = Math.floor(Math.random() *4)
    let c = Math.floor(Math.random() *4)
 

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

    carta2CrupierImagen.setAttribute("src","baraja-img/caratula.png")
    

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

    if (tuMano>21) {
        acabarPartda = true
        return derrota()
    }
}

function plantarse(){
    if (carta2CrupierImagen.getAttribute("src")== "baraja-img/caratula.png") {
        generarImagenCarta(cartaCrupier2, carta2CrupierImagen)
    }
    
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
        setTimeout(plantarse,1500)
    } else{
        contadorCrupier.textContent = manoCrupier
        return resolucion()
    } 
}

function doblar() {
    dinero =  dinero-apuestaInicial
    dineroContador.textContent = "Fondos: " + dinero + "€";
    apuestaInicial = apuestaInicial * 2

    pedirCarta()
    
    if (acabarPartda != true) {
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