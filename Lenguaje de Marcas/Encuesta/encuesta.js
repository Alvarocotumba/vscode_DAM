let estadoEncuesta = {
    votos: {
        futbol: 0,
        baloncesto: 0,
        tenis: 0,
        natacion: 0,
        atletismo: 0,
        ciclismo: 0
    },
    totalVotos: 0,
    ganador: "-",
    cerrada: false
};

let elementosVotos = {};
let totalContadorElement;
let ganadorElement;
let botonesVotar;
let reiniciarBtn;
let cerrarBtn;

document.addEventListener('DOMContentLoaded', function() {
    inicializarElementos();
    configurarEventos();
    actualizarInterfaz();
});

function inicializarElementos() {
    elementosVotos = {
        futbol: document.querySelector('.deporte[data-deporte="futbol"] .contador'),
        baloncesto: document.querySelector('.deporte[data-deporte="baloncesto"] .contador'),
        tenis: document.querySelector('.deporte[data-deporte="tenis"] .contador'),
        natacion: document.querySelector('.deporte[data-deporte="natacion"] .contador'),
        atletismo: document.querySelector('.deporte[data-deporte="atletismo"] .contador'),
        ciclismo: document.querySelector('.deporte[data-deporte="ciclismo"] .contador')
    };
    
    totalContadorElement = document.getElementById('total-contador');
    ganadorElement = document.getElementById('ganador-actual');
    botonesVotar = document.querySelectorAll('.btn-votar');
    reiniciarBtn = document.getElementById('reiniciar');
    cerrarBtn = document.getElementById('cerrar');
}

function configurarEventos() {
    botonesVotar.forEach(boton => {
        boton.addEventListener('click', function() {
            const deporteDiv = this.closest('.deporte');
            const deporteId = deporteDiv.getAttribute('data-deporte');
            votar(deporteId);
        });
    });
    
    reiniciarBtn.addEventListener('click', reiniciarEncuesta);
    cerrarBtn.addEventListener('click', cerrarEncuesta);
}

function votar(deporteId) {
    if (estadoEncuesta.cerrada) {
        alert('La encuesta está cerrada. No se pueden registrar más votos.');
        return;
    }
    
    estadoEncuesta.votos[deporteId]++;
    estadoEncuesta.totalVotos++;
    
    actualizarInterfaz();
    
    calcularGanador();
}

function actualizarInterfaz() {
    for (const deporteId in estadoEncuesta.votos) {
        if (elementosVotos[deporteId]) {
            elementosVotos[deporteId].textContent = estadoEncuesta.votos[deporteId];
        }
    }
    
    totalContadorElement.textContent = estadoEncuesta.totalVotos;
}

function calcularGanador() {
    let maxVotos = 0;
    let deporteGanador = "-";
    let empate = false;
    
    for (const deporteId in estadoEncuesta.votos) {
        if (estadoEncuesta.votos[deporteId] > maxVotos) {
            maxVotos = estadoEncuesta.votos[deporteId];
            deporteGanador = deporteId;
            empate = false;
        } else if (estadoEncuesta.votos[deporteId] === maxVotos && maxVotos > 0) {
            empate = true;
        }
    }
    
    if (empate && maxVotos > 0) {
        estadoEncuesta.ganador = "Empate";
    } else if (deporteGanador !== "-") {
        estadoEncuesta.ganador = formatearNombreDeporte(deporteGanador);
    } else {
        estadoEncuesta.ganador = "-";
    }
    
    ganadorElement.textContent = estadoEncuesta.ganador;
}

function formatearNombreDeporte(id) {
    const nombres = {
        futbol: "Fútbol",
        baloncesto: "Baloncesto",
        tenis: "Tenis",
        natacion: "Natación",
        atletismo: "Atletismo",
        ciclismo: "Ciclismo"
    };
    
    return nombres[id] || id;
}

function reiniciarEncuesta() {
    if (!confirm('¿Está seguro de que desea reiniciar la encuesta? Se perderán todos los votos.')) {
        return;
    }
    
    for (const deporteId in estadoEncuesta.votos) {
        estadoEncuesta.votos[deporteId] = 0;
    }
    
    estadoEncuesta.totalVotos = 0;
    estadoEncuesta.ganador = "-";
    estadoEncuesta.cerrada = false;
    
    actualizarInterfaz();
    ganadorElement.textContent = "-";
    
    botonesVotar.forEach(boton => {
        boton.disabled = false;
        boton.textContent = "VOTAR";
    });
}

function cerrarEncuesta() {
    estadoEncuesta.cerrada = true;
    
    botonesVotar.forEach(boton => {
        boton.disabled = true;
        boton.textContent = "ENCUESTA CERRADA";
    });
    
    alert('La encuesta ha sido cerrada. No se permiten más votos.');
}