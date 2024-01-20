/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/

// Array de palos
let palos = ["viu", "cua", "hex", "cir"];
// Array de número de cartas
//let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// En las pruebas iniciales solo se trabajará con cuatro cartas por palo:
let numeros = [9, 10, 11, 12];

// paso (top y left) en pixeles de una carta a la siguiente en un mazo
let paso = 5;

// Tapetes				
let tapeteInicial   = document.getElementById("inicial");
let tapeteSobrantes = document.getElementById("sobrantes");
let tapeteReceptor1 = document.getElementById("receptor1");
let tapeteReceptor2 = document.getElementById("receptor2");
let tapeteReceptor3 = document.getElementById("receptor3");
let tapeteReceptor4 = document.getElementById("receptor4");

// Mazos
let mazoInicial   = [];
let mazoSobrantes = [];
let mazoReceptor1 = [];
let mazoReceptor2 = [];
let mazoReceptor3 = [];
let mazoReceptor4 = [];

// Contadores de cartas
let contInicial     = document.getElementById("contador_inicial");
let contSobrantes   = document.getElementById("contador_sobrantes");
let contReceptor1   = document.getElementById("contador_receptor1");
let contReceptor2   = document.getElementById("contador_receptor2");
let contReceptor3   = document.getElementById("contador_receptor3");
let contReceptor4   = document.getElementById("contador_receptor4");
let contMovimientos = document.getElementById("contador_movimientos");

//boton reiniciar
let btnReiniciar = document.getElementById("reset");

// Tiempo
let contTiempo  = document.getElementById("contador_tiempo"); // span cuenta tiempo
let segundos 	 = 0;    // cuenta de segundos
let temporizador = null; // manejador del temporizador

/***** FIN DECLARACIÓN DE VARIABLES GLOBALES *****/

 
// Rutina asociada a boton reset
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
document.addEventListener('DOMContentLoaded', function() {
    // Tu código aquí
    comenzarJuego()
	btnReiniciar.addEventListener("click", reset);

});

// El juego arranca ya al cargar la página: no se espera a reiniciar
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/

// Desarrollo del comienzo de juego
function comenzarJuego() {
    for(let palo of palos){
		for(let numero of numeros){
			let img_carta = document.createElement('img');
			let rutaImagen = "../actividad1-frontend-AW-viu/imagenes/baraja/" + numero + "-" + palo + ".png" 

			img_carta.setAttribute("data-palo", palo);
			img_carta.setAttribute("data-numero", numero);
			img_carta.src = rutaImagen
			mazoInicial.push(img_carta);
		}
	}
	// Barajar y dejar mazoInicial en tapete inicial
	barajar(mazoInicial)
	cargarTapeteInicial(mazoInicial)

	setContador(contReceptor1,0)
	setContador(contReceptor2,0)
	setContador(contReceptor3,0)
	setContador(contReceptor4,0)
	setContador(contSobrantes,0)
	setContador(contMovimientos,0)
	
	// Arrancar el conteo de tiempo
	arrancarTiempo()
} 


/**
	Se debe encargar de arrancar el temporizador: cada 1000 ms se
	debe ejecutar una función que a partir de la cuenta autoincrementada
	de los segundos (segundos totales) visualice el tiempo oportunamente con el 
	format hh:mm:ss en el contador adecuado.

	Para descomponer los segundos en horas, minutos y segundos pueden emplearse
	las siguientes igualdades:

	segundos = truncar (   segundos_totales % (60)                 )
	minutos  = truncar ( ( segundos_totales % (60*60) )     / 60   )
	horas    = truncar ( ( segundos_totales % (60*60*24)) ) / 3600 )

	donde % denota la operación módulo (resto de la división entre los operadores)

	Así, por ejemplo, si la cuenta de segundos totales es de 134 s, entonces será:
	   00:02:14

	Como existe la posibilidad de "resetear" el juego en cualquier momento, hay que 
	evitar que exista más de un temporizador simultáneo, por lo que debería guardarse
	el resultado de la llamada a setInterval en alguna variable para llamar oportunamente
	a clearInterval en su caso.   
*/

function arrancarTiempo(){
	if (temporizador) clearInterval(temporizador);
    let hms = function (){
			let seg = Math.trunc( segundos % 60 );
			let min = Math.trunc( (segundos % 3600) / 60 );
			let hor = Math.trunc( (segundos % 86400) / 3600 );
			let tiempo = ( (hor<10)? "0"+hor : ""+hor ) 
						+ ":" + ( (min<10)? "0"+min : ""+min )  
						+ ":" + ( (seg<10)? "0"+seg : ""+seg );
			setContador(contTiempo, tiempo);
            segundos++;
		}
	segundos = 0;
    hms(); // Primera visualización 00:00:00
	temporizador = setInterval(hms, 1000);
    	
} 


/**
	Si mazo es un array de elementos <img>, en esta rutina debe ser
	reordenado aleatoriamente. Al ser un array un objeto, se pasa
	por referencia, de modo que si se altera el orden de dicho array
	dentro de la rutina, esto aparecerá reflejado fuera de la misma.
*/
function barajar(mazo) {

	for (let i = mazo.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
} // barajar



/**
 	En el elemento HTML que representa el tapete inicial (variable tapeteInicial)
	se deben añadir como hijos todos los elementos <img> del array mazo.
	Antes de añadirlos, se deberían fijar propiedades como la anchura, la posición,
	coordenadas top y left, algun atributo de tipo data-...
	Al final se debe ajustar el contador de cartas a la cantidad oportuna
*/
function cargarTapeteInicial(mazo) {
	mazo.forEach((carta, index) => {
		let scale = 0.7 + (index * 0.03); 
		let translateX = index * 10; 
		let translateY = index * 10; 
		let translateZ = -index * 5; 
		carta.style.transform = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) scale(${scale})`;
		carta.style.zIndex = index
		carta.draggable = true;; 
		carta.id = 'carta_' + index; 

		carta.ondragstart = function(event) {
			event.dataTransfer.setData("text/plain", event.target.id);
		};
		tapeteInicial.appendChild(carta);
	});
} // cargarTapeteInicial

let tapetes = document.querySelectorAll('.tapete, .receptor');

tapetes.forEach(tapete => {
	tapete.ondragover = function(event) {
		event.preventDefault(); 
	};

	tapete.ondrop = manejarSoltado;
});


/**
 	Esta función debe incrementar el número correspondiente al contenido textual
   	del elemento que actúa de contador
*/
function incContador(contador){
	valorInc = parseInt(contador.textContent) + 1 
	contador.textContent = valorInc.toString()
} 

/**
	Idem que anterior, pero decrementando 
*/
function decContador(contador){
	valorDec = parseInt(contador.textContent) - 1
	contador.textContent = valorDec.toString()
} 

/**
	Similar a las anteriores, pero ajustando la cuenta al
	valor especificado
*/
function setContador(contador, valor) {
	contador.textContent = valor.toString()
}	 // setContador

function manejarSoltado(event) {
    event.preventDefault(); 
	let tapete;
	console.log(event.target.tagName === 'IMG')
    if (event.target.tagName === 'IMG') {
        // Si se suelta sobre otra carta, utiliza el padre de esa carta (el tapete)
        tapete = event.target.parentNode;
		console.log(tapete)
    } else {
        // De lo contrario, asume que es el tapete
        tapete = event.target;
    }
    let data = event.dataTransfer.getData("text/plain");
    let cartaOriginal = document.getElementById(data);
    let cartaCopia = cartaOriginal.cloneNode(true);
    let cartasEnTapete = tapete.getElementsByTagName('img');

	if(sePuedeAñadir(cartasEnTapete.length,cartaOriginal,tapete)){
		let posicion = cartasEnTapete.length+1  // Índice de la carta actual en el tapete
		cartaCopia.style.transform = "none"
		cartaCopia.style.zIndex = posicion;
		cartaCopia.ondragstart = null;
		cartaCopia.draggable = false;
	
		let indice = mazoInicial.indexOf(cartaOriginal);
	
		if (indice > -1) {
			mazoInicial.splice(indice, 1); 
		}
		tapete.appendChild(cartaCopia);
	
		if (tapeteInicial.contains(cartaOriginal)) {
			tapeteInicial.removeChild(cartaOriginal);
		}
		switch(tapete.id){
			case "receptor1":
				mazoReceptor1.push(cartaCopia)
				incContador(contReceptor1);
				break;
			case "receptor2":
				mazoReceptor2.push(cartaCopia)
				incContador(contReceptor2);
				break;
			case "receptor3":
				mazoReceptor3.push(cartaCopia)
				incContador(contReceptor3);
				break;
			case "receptor4":
				mazoReceptor4.push(cartaCopia)
				incContador(contReceptor4);
				break;
			case "sobrantes":
				mazoSobrantes.push(cartaCopia)
				incContador(contSobrantes);
				break;
		}
		incContador(contMovimientos);
		comprobarCartasRestantes()
	}
    
}


function getColorCarta(palo){
	switch(palo){
		case 'cua':
		case 'viu':
			return 'naranja'
		case 'hex':
		case 'cir':
			return 'gris'
		default:
			return null;

	}
}

function comprobarCartasRestantes(){
	let nCartasPrincipal = mazoInicial.length;
	let nCartasSobrantes = mazoSobrantes.length;

	if(nCartasPrincipal === 0 && nCartasSobrantes !== 0){
		mazoInicial = mazoSobrantes;
		mazoSobrantes = []
		setContador(contSobrantes,0)
		setContador(mazoInicial,mazoInicial.length)
		barajar(mazoInicial)
		cargarTapeteInicial(mazoInicial)
	}else if (nCartasPrincipal === 0 && nCartasSobrantes === 0){
		Swal.fire({
			title: 'Juego finalizado',
			text: `Has completado la partida en ${contTiempo.textContent} y ${contMovimientos.textContent} movimientos`,
			showCancelButton: true,
			confirmButtonText: 'Reiniciar',
			cancelButtonText: 'Cancelar'
		  }).then((result) => {
			if (result.isConfirmed) {
			  reset()
			}
		  });		  
	}
}
function colorDiferente(actual, anterior){
	if(actual == null || anterior == null){
		return false
	}else{
		let paloActual = actual.getAttribute('data-palo');
		let paloAnterior = anterior.getAttribute('data-palo')
		let colorActual = getColorCarta(paloActual)
		let colorAnterior = getColorCarta(paloAnterior)
		if((colorActual == null || colorAnterior == null) || (colorActual == colorAnterior)){
			return false
		}
		return true

	}
}
function getCartaAnterior(tapete,nCartasTapete){

	if(nCartasTapete == 0){
		return null;
	}else{
		let cartasEnTapete = tapete.getElementsByTagName('img');
		let ultimaCarta = cartasEnTapete[nCartasTapete-1]
		return ultimaCarta
	}

}
function sePuedeAñadir(nCartasTapete,carta,tapete){
	let numeroCartaInt = parseInt(carta.getAttribute('data-numero'))

	let cartaAnterior = getCartaAnterior(tapete,nCartasTapete)

	if(tapete.id !== "inicial" && ((nCartasTapete == 0 && numeroCartaInt == 12 && tapete.id !== 'sobrantes') || (nCartasTapete != 0 && cartaAnterior != null && colorDiferente(carta,cartaAnterior)) ||
	 tapete.id === 'sobrantes') ){
		return true;
	}

	return false;

}

function reset(){
	mazoInicial = []
	mazoReceptor1 = []
	mazoReceptor2 = []
	mazoReceptor3 = []
	mazoReceptor4 = []
	mazoSobrantes = []

	while (tapeteInicial.firstChild) {
		tapeteInicial.removeChild(tapeteInicial.firstChild);
	}

	while (tapeteReceptor1.firstChild) {
		tapeteReceptor1.removeChild(tapeteReceptor1.firstChild);
	}

	while (tapeteReceptor2.firstChild) {
		tapeteReceptor2.removeChild(tapeteReceptor2.firstChild);
	}

	while (tapeteReceptor3.firstChild) {
		tapeteReceptor3.removeChild(tapeteReceptor3.firstChild);
	}

	while (tapeteReceptor4.firstChild) {
		tapeteReceptor4.removeChild(tapeteReceptor4.firstChild);
	}
	while (tapeteSobrantes.firstChild) {
		tapeteSobrantes.removeChild(tapeteSobrantes.firstChild);
	}
	comenzarJuego()
}
