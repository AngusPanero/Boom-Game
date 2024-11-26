let input = document.getElementById("userInput");
const resultado = document.getElementById("result")
const mostrarContador = document.getElementById("countdown");
const reseteo = document.getElementById("restart");

let miJugada; // creo mis variables sin definir fuera para que funcione la globalidad
let jugadaPc;

let puntosUsuario = parseInt(localStorage.getItem("puntosUs"), 10) || 0; // El 10 especifica que va a guardar numeros decimales y el cero es mi valor
let puntosPc = parseInt(localStorage.getItem("puntosPc"), 10) || 0;

// Primero tengo que marcar como reaccionaria el input con los valores
function cargarJugada (evento) {

    resultado.innerHTML = ""; // dejo libre mi resultado inner porque abajo me dejaba siempre la jugada anterior, aca es como que la reseteo

    if (evento.type === "keydown" && evento.key !== "Enter"){ // !== dice que si no es estricatamente igual no funciona
            return;
    }
    miJugada = parseInt(input.value); // dentro le doy valor a la variable que necesito que aca es el valor del input con parseInt pq al ingresar en el input se me tomca como string

    if ( miJugada < 1 || miJugada > 3 || isNaN(miJugada)){
        !alert("No se Aceptan Letras o Números menores a 1 o Mayores a 3")
        return
    }
    console.log(`El Número introducido por el usuario es  ${input.value}`)

    jugadaPc = Math.floor(Math.random() * 3 + 1) // aca el valor es el random de 1 a 3
    console.log(`La Jugada de la Pc es ${jugadaPc}`);


    temporizador(); // llamo la segunda funcion dentro de la primera para que esten vinculadas con delay de 5sec
    };

    function temporizador () {
        let contador = 5; // lo arranco en 5 (simulando segundos)
        mostrarContador.innerHTML = `<p>💣 ¡Cuidado! La bomba puede estallar, Tiempo restante: ${contador} 💣</p>`;
    
        const intervalo = setInterval(() => {
            contador--; // Reduzco el contador en 1
            mostrarContador.innerHTML = `<p>💣 ¡Cuidado! La bomba puede estallar, Tiempo restante: ${contador} 💣</p>`;
    
            if (contador <= 0) {
                clearInterval(intervalo); // Detén el intervalo cuando llegue a 0
                mostrarContador.innerHTML = ""; // dejo vacio el string para la proxima vuelta
                compararJugadas(); // Llamo la función de comparación que esta abajo
            }
        }, 1000); // aca la inicializo cada un segunto en el setInterval
    }

    function compararJugadas() {
        if (jugadaPc === miJugada){
            document.body.classList.remove("estallo", "suspenso"); // remuevo mis class de body para css
            document.body.classList.add("aSalvo");
            puntosUsuario++
            localStorage.setItem("puntosUs", puntosUsuario)

            console.log("Puntos Usuario:", puntosUsuario);

            resultado.innerHTML = `
            <p class="aSalvo">🌎 ¡Has salvado el mundo! 🌎</p>
            <p> Ganaste! Elegiste ${miJugada} y la Pc eligió ${jugadaPc}</p>
            `

        }
        else {
            document.body.classList.remove("aSalvo", "suspenso");
            document.body.classList.add("estallo");
            puntosPc++
            localStorage.setItem("puntosPc", puntosPc)

            console.log("Puntos PC:", puntosPc);

            resultado.innerHTML = `
            <p class="estallo">💣 ¡La bomba ha estallado! 💣</p>
            <p>Perdiste! Elegiste ${miJugada} y la Pc eligió ${jugadaPc}</p>
            `
        }  
        actualizarPuntos();
} 

function actualizarPuntos () {
    hermanoRes.innerHTML = `Tienes ${puntosUsuario} Puntos, La Pc Tiene ${puntosPc} Puntos`
}

reseteo.addEventListener("click", () => {
    puntosUsuario = 0;
    puntosPc = 0;
    localStorage.setItem("puntosUs", puntosUsuario);
    localStorage.setItem("puntosPc", puntosPc);
    actualizarPuntos();
    resultado.innerHTML = `<p>Contadores Reiniciados.</p>`;
    console.log("Puntos reiniciados: Usuario = 0, PC = 0");
});

document.addEventListener("DOMContentLoaded", () => {
    hermanoRes = document.createElement("div") // Creo Nuevo Div
    hermanoRes.classList.add("hermanoRes");
    resultado.insertAdjacentElement("afterend", hermanoRes); // lo hago Hermano con la clave afterend
    actualizarPuntos();
})

// le doy dos eventos para que funcione con la bajada del enter y cuando salgo de ahí
input.addEventListener("keydown", cargarJugada);
input.addEventListener("blur", cargarJugada); // Blur es cuando interactuo en algo diferente a lo seleccionado que en este caso es el input


