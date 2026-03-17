const btnCargar = document.getElementById("cargar");
const input = document.getElementById("buscar");
const select = document.getElementById("select");
const resultado = document.getElementById("resultado");

let listaTareas = [];

function mostrarTareas(tareas) {
    if (tareas.length === 0) {
        resultado.innerHTML = '<p>No hay tareas para mostrar</p>';
        return;
    }
    
    resultado.innerHTML = `<h2>Número de tareas: ${tareas.length}</h2>`;
    
    tareas.forEach((tarea) => {
        resultado.innerHTML += `
        <div data-task 
             data-status="${tarea.estado}" 
             data-priority="${tarea.prioridad}">
            <p><strong>${tarea.nombre}</strong></p>
            <button data-id="${tarea.id}">
                Marcar como hecha
            </button>
        </div>
        `;
    });
    
    // Añadir event listeners a los botones
    const botones = document.querySelectorAll("button[data-id]");
    botones.forEach((boton) => {
        // Eliminar listeners previos para evitar duplicados
        boton.replaceWith(boton.cloneNode(true));
    });
    
    // Añadir nuevos listeners
    document.querySelectorAll("button[data-id]").forEach((boton) => {
        boton.addEventListener("click", function(evento) {
            const id = parseInt(evento.target.dataset.id);
            const tarea = listaTareas.find((t) => t.id === id);
            
            if (tarea) {
                tarea.estado = "hecha";
                filtrar(); // Actualizar la vista
            }
        });
    });
}

function filtrar() {
    const texto = input.value.toLowerCase().trim();
    const prioridad = select.value.toLowerCase();
    
    const tareasFiltradas = listaTareas.filter((tarea) => {
        const coincideTexto = tarea.nombre.toLowerCase().includes(texto);
        const coincidePrioridad = prioridad === "todas" || tarea.prioridad === prioridad;
        
        return coincideTexto && coincidePrioridad;
    });
    
    mostrarTareas(tareasFiltradas);
}

// Evento para cargar tareas
btnCargar.addEventListener("click", function() {
    listaTareas = [
        {id: 1, nombre: "Estudiar HTML", prioridad: "alta", estado: "pendiente"},
        {id: 2, nombre: "Practicar CSS", prioridad: "media", estado: "pendiente"},
        {id: 3, nombre: "Apuntes", prioridad: "media", estado: "pendiente"},
        {id: 4, nombre: "Realizar ejercicios", prioridad: "baja", estado: "pendiente"},
    ];
    
    mostrarTareas(listaTareas);
});

// Eventos para filtrar
input.addEventListener("input", filtrar);
select.addEventListener("change", filtrar);