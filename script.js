const preguntas = [
    { pregunta: "¿Qué representa el símbolo 'H'?", opciones: ["Helio", "Hidrógeno", "Hafnio", "Hierro"], respuestaCorrecta: 1 },
    { pregunta: "¿Qué representa el símbolo 'O'?", opciones: ["Oxígeno", "Oro", "Óxido", "Osmio"], respuestaCorrecta: 0 },
    { pregunta: "¿Qué representa el símbolo 'Na'?", opciones: ["Níquel", "Nitrógeno", "Neón", "Sodio"], respuestaCorrecta: 3 },
    { pregunta: "¿Qué representa el símbolo 'C'?", opciones: ["Cobre", "Carbono", "Cloro", "Calcio"], respuestaCorrecta: 1 },
    { pregunta: "¿Qué representa el símbolo 'Fe'?", opciones: ["Flúor", "Fósforo", "Hierro", "Francio"], respuestaCorrecta: 2 }
];

let preguntaActual = 0;
let puntaje = 0;
let respuestaSeleccionada = null;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

window.onload = () => {
    shuffle(preguntas);
    mostrarPregunta();
};

function mostrarPregunta() {
    const preguntaElemento = document.getElementById('pregunta');
    const opcionesElemento = document.getElementById('opciones');

    preguntaElemento.textContent = preguntas[preguntaActual].pregunta;
    opcionesElemento.innerHTML = '';
    respuestaSeleccionada = null;

    preguntas[preguntaActual].opciones.forEach((opcion, index) => {
        const boton = document.createElement('button');
        boton.textContent = opcion;
        boton.className = 'opcion';
        boton.onclick = () => {
            respuestaSeleccionada = index;
            document.querySelectorAll('.opcion').forEach(btn => btn.classList.remove('seleccionada'));
            boton.classList.add('seleccionada');
        };
        opcionesElemento.appendChild(boton);
    });
}

function reproducirSonido(ruta) {
    const audio = new Audio(ruta);
    audio.play().catch(error => console.error("Error al reproducir el sonido:", error));
}

function siguientePregunta() {
    reproducirSonido('arrastrar.mp3');

    if (respuestaSeleccionada === null) {
        alert("Selecciona una respuesta antes de continuar.");
        return;
    }

    if (respuestaSeleccionada === preguntas[preguntaActual].respuestaCorrecta) {
        puntaje++;
    }

    preguntaActual++;
    if (preguntaActual < preguntas.length) {
        mostrarPregunta();
    } else {
        finalizarJuego();
    }

    document.getElementById('score').textContent = `Puntaje: ${puntaje}`;
}

function finalizarJuego() {
    const mensaje = puntaje >= 3
        ? `¡Buen trabajo! Tu puntaje es ${puntaje}/${preguntas.length}.`
        : `Sigue practicando. Tu puntaje es ${puntaje}/${preguntas.length}.`;

    alert(mensaje);
}

function reiniciarJuego() {
    reproducirSonido('seleccion.mp3');

    setTimeout(() => {
        preguntaActual = 0;
        puntaje = 0;
        shuffle(preguntas);
        mostrarPregunta();
        document.getElementById('score').textContent = `Puntaje: ${puntaje}`;
    }, 100); 
}

function salir() {
    reproducirSonido('sonido.mp3'); 

    setTimeout(() => {
        if (confirm("¿Estás seguro de que deseas salir?")) {
            window.location.href = "index.html";
        }
    }, 100);
}
