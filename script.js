
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
        console.log("es empate")
        resultadoDinero.remove()
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
    botonDoblar.addEventListener("click",doblar)
    botonDoblar.style.opacity = "1"
    botonDoblar.style.cursor = "pointer"
    carta1Imagen.style.display = "inline"
    carta2Imagen.style.display = "inline"
    carta1CrupierImagen.style.display = "inline"
    carta2CrupierImagen.style.display = "inline"

    carta1 = generarNumeroCarta()
    carta2 = generarNumeroCarta()

    comprobarAs(carta1,carta2,cartaNueva)

    tuMano = carta1 + carta2
    contadorJugador.textContent = tuMano

    if (carta1 == carta2) {
        botonDividir.addEventListener("click",dividir)
        botonDividir.style.opacity = "1"
        botonDividir.style.cursor = "pointer"
    }
    console.log("me ejecuto")
    cartaCrupier1 =  generarNumeroCarta()
    cartaCrupier2 =  generarNumeroCarta()

    comprobarAs(cartaCrupier1,cartaCrupier2,cartaCrupierNueva)

    manoCrupier = cartaCrupier1 + cartaCrupier2
    contadorCrupier.textContent = cartaCrupier1 + "+?"

    console.log(carta1, carta2, cartaCrupier1, cartaCrupier2)
    console.log("Tu mano: " + tuMano)
    console.log("Mano crupier: " + manoCrupier)

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

    comprobarAs(carta1,carta2,cartaNueva)

    tuMano = tuMano + cartaNueva
    contadorJugador.textContent = tuMano

    let z = Math.floor(Math.random() * 16)
    let a = Math.floor(Math.random() *4)
    
    console.log(cartaNueva)
    console.log("Tu mano: " +tuMano)
    let img = document.createElement("img")
    img.setAttribute("class","carta-nueva")
    contenedorCartas.appendChild(img)

    if (cartaNueva==10){
          img.src = "baraja-img/" + baraja[cartaNueva][z]
    } else{
          img.src = "baraja-img/" + baraja[cartaNueva][a]
    } 

    botonDoblar.removeEventListener("click",doblar)
    botonDoblar.style.opacity = "0.7"
    botonDoblar.style.cursor = "default"

    if (tuMano>21) {
        return derrota()
    }
}

function plantarse(){
    if (carta2CrupierImagen.getAttribute("src")== "baraja-img/caratula.png") {
        let w = Math.floor(Math.random() * 16)
        let d = Math.floor(Math.random() *4)
        if (cartaCrupier2==10){
            carta2CrupierImagen.setAttribute("src","baraja-img/" + baraja[cartaCrupier2][w])
        } else {
            carta2CrupierImagen.setAttribute("src","baraja-img/" + baraja[cartaCrupier2][d])
        }
    }
    
    if (manoCrupier < 17) {
        cartaCrupierNueva = generarNumeroCarta()

        comprobarAs(cartaCrupier1,cartaCrupier2,cartaCrupierNueva)

        manoCrupier = manoCrupier + cartaCrupierNueva
        contadorCrupier.textContent = manoCrupier

        console.log(cartaCrupierNueva)
        console.log("Mano crupier:" + manoCrupier)
        let z = Math.floor(Math.random() * 16)
        let a = Math.floor(Math.random() *4)

        let img = document.createElement("img")
        img.setAttribute("class","carta-crupier-nueva")
        contenedorCartasCrupier.appendChild(img)

        if (cartaCrupierNueva==10){
            img.src = "baraja-img/" + baraja[cartaCrupierNueva][z]
        } else{
            img.src = "baraja-img/" + baraja[cartaCrupierNueva][a]
        } 

        

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
    console.log("La apuesta ahora doblada es: " + apuestaInicial)

    pedirCarta()
    plantarse()
}

function dividir() {
    
}




// añadir doblar y dividir, mejorar HUD (ya es realmente jugable), crear patala de inicio con nombre y sistema d logros