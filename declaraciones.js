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

const contenedorCartas = document.getElementById("cartas-jugador")
const carta1Imagen = document.getElementById("carta-1")
const carta2Imagen = document.getElementById("carta-2")
const cartaNuevaImagen = document.getElementById("carta-nueva")

const contenedorCartasCrupier = document.getElementById("cartas-crupier")
const carta1CrupierImagen = document.getElementById("carta-crupier-1")
const carta2CrupierImagen = document.getElementById("carta-crupier-2")
const cartaCrupierNuevaImagen = document.getElementById("carta-crupier-nueva")

const botonApostar = document.getElementById("apostar-boton")
const botonPedir = document.getElementById("pedir-boton")
const botonPlantarse = document.getElementById("plantarse-boton")
const resultadoPantalla = document.getElementById("pantalla-resultado")
const resultadoTitulo = document.getElementById("titulo-resultado")
const resultadoDinero = document.getElementById("dinero-resultado")
const botonJugarResultado = document.getElementById("resultado-jugar-boton")



botonJugarResultado.addEventListener("click",volverMenu)
botonApostar.addEventListener("click",comprobarApuesta)
botonPedir.addEventListener("click",pedirCarta)
botonPlantarse.addEventListener("click",plantarse)

let dinero = 100
let dineroContador = document.getElementById("dinero-usuario");
dineroContador.textContent = "Fondos: " + dinero + "€";

let tuMano, carta1, carta2, manoCrupier, cartaCrupier1, cartaCrupier2, apuestaInicial
let cartaNueva = 0
let cartaCrupierNueva = 0