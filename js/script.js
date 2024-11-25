let input = document.getElementById("userInput");
const resultado = document.getElementById("result")

let miJugada; // creo mis variables sin definir fuera para que funcione la globalidad
let jugadaPc;

// Primero tengo que marcar como reaccionaria el input con los valores
function cargarJugada (evento) {
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

    compararJugadas() // llamo la segunda funcion dentro de la primera para que esten vinculadas

    };
    function compararJugadas() {
        if (jugadaPc === miJugada){
            resultado.innerHTML = `
            <p>¡Has salvado el mundo!</p>
            <p> Ganaste! Elegiste ${miJugada} y la Pc eligió ${jugadaPc}</p>
            `

        }
        else {
            resultado.innerHTML = `
            <p>La bomba ha estallado</p>
            <p>Perdiste! Elegiste ${miJugada} y la Pc eligió ${jugadaPc}</p>
            `
        }
} 

// le doy dos eventos para que funcione con la bajada del enter y cuando salgo de ahí
input.addEventListener("keydown", cargarJugada);
input.addEventListener("blur", cargarJugada); // Blur es cuando el usuario interactua en algo diferente a lo seleccionado que en este caso es el input

