
<h1 align="center">
  <br>
  <a><img src="https://www.universidadviu.com/sites/universidadviu.com/themes/custom/universidadviu_com/logo.svg" alt="Markdownify" width="200"></a>
  <br>
  Desarrollo de aplicaciones Web II: (Front-end) y Multimedia
  <br>
</h1>

<h4 align="center">Actividad 1.</h4>

<p align="center">
  <a href="#desarrollo">Desarrollo</a> •
  <a href="#conclusiones">Conclusiones</a> •
  <a href="#integrantes">Integrantes</a>
</p>

<p align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/radiolabruja-7a765.appspot.com/o/solitario.gif?alt=media&token=b294ba5b-b2a6-425d-9138-57f126a8a2ba" alt="animated" />
</p>

## Desarrollo.

Hemos utilizado como base el archivo solitario.html proporcionado para la práctica.
La mayor parte de la actividad se encuentra localizado en el archivo solitario.js, el cual contiene código en javascript.

Por ejemplo, el código implementado para iniciar el juego lo hemos implementado de la siguiente manera en la función comenzarJuego()

```javascript
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
```
En esta función hemos utilizado dos [bucles for](https://www.w3schools.com/js/js_loop_for.asp) para organizar los "palos" y los "números" incluyendo la ruta en donde se encuentran las imágenes del juego. Es importante mencionar que para el correcto funcionamiento del juego se tiene que poner la ruta correcta de las imágenes, que puede variar dependiendo de donde se las ubique, en algunas pruebas que realizamos, al descargar el fichero de un repositorio git, tuvimos algunos problemas ya que no detectaba correctamente la carpeta anterior a /imagenes/baraja; para evitar este problema incorporamos el nombre de la carpeta padre.

Otra parte interesante de la práctica fue la forma en la que cargamos las imágenes, las cuales tienen un patrón en común: el nombre inicia por el número que representa la carta, seguido de un guión intermedio, luego el 'palo' al que pertenecen para finalmente incluir el tipo de archivo, en este caso .png
```javascript
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
```

El proceso de barajar las cartas se realiza en la función barajar(mazo), la cual utiliza la librería [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) de javascript. A través del método estático [floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) podemos redondear hacia abajo y devuelver el número entero más grande menor o igual a un número dado.
```javascript
function barajar(mazo) {

	for (let i = mazo.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
}
```
En el método cargarTapeteInicial(mazo), el cuál representa el tapete inicial del juego, añadimos como hijos todas las imágenes que se van a utilizar en el juego y añadimos las propiedades referentes a posición, [draggable](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable), coordenadas, etc.

El evento [ondragstart](https://www.w3schools.com/jsref/event_ondragstart.asp) que pertenece a cada carta, nos permite capturar el evento cuando el usuario empeza a arrastrar una carta.
```javascript
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
}
```

Una vez el usuario deja de arrastrar un carta, utilizamos la función manejarSoltado para controlar el comportamiento.

Dentro de esta función realizamos varias acciones como:
* Controlar la acción a relizar si la carta de suelta sobre otra carta
* Controlar el número de la carta que se suelta para ver en que mazo se coloca.
* Si la carta no puede ser ubicada en ningún mazo, se la tiene que colocar en el mazo de sobrantes.
* En caso de no añadirse a ningún mazo, comprobar las cartas restantantes.
```javascript
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
		comprobarCartasRestantantes()
	}
    
}
```

Para comprobar las cartas restantes utilizamos la función comprobarCartasRestantes(), en la cual comprobamos las cartas principales y las cartas sobrantes, en caso que sobren cartas el juego continua y se actualizan los contadores; pero en el caso que no existan cartas sobrantes el juego se finaliza lanzando una alerta a través de la librería [SweetAlert](https://sweetalert.js.org)
```javascript
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
```
En la alerta lanzada, el usuario tiene la opción de reiniciar el juego, opción que llama a la función reset() la cual se encarga de reiniciar el tapete inicial y los tapetes receptores, además de los contadores y llama a la función comenzarJuego(), explicada anteriormente.
```javascript
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
```

En cuanto a la hoja de estilos solitario.css, hemos incorporado el código necesario para colores, alineaciones, imágenes y los características gráficas de cada tapete.
```css
/* container para centrar el botón Reiniciar*/
.flex-container {
	display: flex;
	justify-content: center;
	align-items: center;
  }
```

### Librerías externas.
* [SweetAlert](https://sweetalert.js.org)
    -  
    Hace que los mensajes emergentes sean fáciles y con un diseño más atractivo.


## Conclusiones.

En esta práctica hemos aplicado los conocimientos adquiridos durante las clases de javascript en la asignatura de Front End.

Hemos demostrando competencia en el desarrollo web frontend, implementando la lógica central del juego, el movimiento de tarjetas y la interfaz de usuario interactiva utilizando HTML, CSS y JavaScript, utilizando programación orientada a objetos para representar cartas, mazos y el estado del juego. 
También hemos manejado eventos para las interacciones del usuario, lo que permite un juego fluido, incluyendo un sistema de puntuación y tiempo de juego.

El proyecto refleja una sólida comprensión de los fundamentos del desarrollo web, la programación JavaScript y el diseño de interfaz de usuario en el contexto de un juego de cartas clásico.




## Integrantes.

- [Pablo Robles](mailto:pablorobles860@gmail.com)
- [Angel Gamero](mailto:angelcgamero@gmail.com)
- [Juan S. Landy](mailto:jlandyr@student.universidadviu.com)

