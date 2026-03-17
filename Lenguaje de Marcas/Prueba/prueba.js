const nombre = document.getElementById("nombre");
const botonSaludar = document.getElementById("saludar");
const botonColor = document.getElementById("cambiarcolor"); 
const resultado = document.getElementById("resultado");
const contenedor = document.getElementById("contenedor");

let colorActivo = false;

botonSaludar.addEventListener("click", function(){
    const nombreValor = nombre.value.trim(); // Cambié a 'nombreValor' para evitar conflicto
    
    if(nombreValor === ""){
        resultado.innerText = "Por favor, introduce un nombre";
    } else {
        resultado.innerText = `Hola ${nombreValor}, Bienvenido`;
    }
});

// AGREGAR ESTA PARTE PARA EL BOTÓN CAMBIAR COLOR:
botonColor.addEventListener("click", function() {
    if(colorActivo) {
        contenedor.style.backgroundColor = "white";
        resultado.innerText = "Color original restaurado";
        colorActivo = false;
    } else {
        contenedor.style.backgroundColor = "lightyellow";
        resultado.innerText = "Color de fondo cambiado";
        colorActivo = true;
    }
});