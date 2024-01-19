
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

Hemos utilizado como base el archivo html proporcionado para la práctica.
La mayor parte de 'core' de la actividad se encuentra localizado en el archivo solitario.js, el cual contiene código en javascript.

Por ejemplo, el código implementado para iniciar el contador lo hemos implementado de la siguiente manera:

```javascript
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
```
El en cuál podemos observar la inicialización de segundos, minutos y horas utilizando la librería [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) de Javascript.

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
* SweetAlert
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

