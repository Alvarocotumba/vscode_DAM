document.addEventListener('DOMContentLoaded', function() {
    cargarDatosXML();
    configurarEventListeners();
});

function configurarEventListeners() {
    document.getElementById('boton-buscar').addEventListener('click', buscarTarjetas);
    
    document.getElementById('campo-busqueda').addEventListener('input', buscarTarjetas);
    
    document.getElementById('tema-select').addEventListener('change', cambiarTema);
    
    document.getElementById('boton-anadir').addEventListener('click', function() {
        document.getElementById('modal-anadir').classList.add('activo');
    });

    document.getElementById('cerrar-modal').addEventListener('click', function() {
        document.getElementById('modal-anadir').classList.remove('activo');
        document.getElementById('nuevo-titulo').value = '';
        document.getElementById('nueva-descripcion').value = '';
        document.getElementById('nueva-imagen').value = '';
    });

    document.getElementById('cerrar-tema').addEventListener('click', function() {
        document.getElementById('modal-tema').classList.remove('activo');
    });

    document.getElementById('guardar-planta').addEventListener('click', anadirNuevaTarjeta);
    
    document.getElementById('aplicar-tema').addEventListener('click', aplicarTemaPersonalizado);

    window.addEventListener('click', function(evento) {
        if (evento.target.classList.contains('modal')) {
            evento.target.classList.remove('activo');
        }
    });
}

function cargarDatosXML() {
    fetch('data/datos.xml')
        .then(respuesta => respuesta.text())
        .then(textoXML => {
            let parser = new DOMParser();
            let documentoXML = parser.parseFromString(textoXML, 'text/xml');
            let plantas = documentoXML.getElementsByTagName('planta');
            
            let tarjetas = [];
            
            for (let i = 0; i < plantas.length; i++) {
                let titulo = plantas[i].getElementsByTagName('titulo')[0].textContent;
                let texto = plantas[i].getElementsByTagName('texto')[0].textContent;
                let imagen = plantas[i].getElementsByTagName('imagen')[0].textContent;
                
                tarjetas.push({ titulo: titulo, texto: texto, imagen: imagen });
            }
            
            renderizarTarjetas(tarjetas);
        })
        .catch(error => {
            console.log('Error cargando XML, usando datos de respaldo');
            let tarjetasRespaldo = [
                { titulo: 'Guisante 1', texto: 'Guisante 1 es Álvaro - Planta básica', imagen: 'img/guisante1.jpg' },
                { titulo: 'Guisante 2', texto: 'Guisante 2 es Álvaro - Versión mejorada', imagen: 'img/guisante2.jpg' },
                { titulo: 'Guisante 3', texto: 'Guisante 3 es Álvaro - Dispara más rápido', imagen: 'img/guisante3.jpg' },
                { titulo: 'Guisante 4', texto: 'Guisante 4 es Álvaro - Planta de ataque', imagen: 'img/guisante4.jpg' },
                { titulo: 'Guisante 5', texto: 'Guisante 5 es Álvaro - Variante especial', imagen: 'img/guisante5.jpg' },
                { titulo: 'Guisante 6', texto: 'Guisante 6 es Álvaro - Defiende el jardín', imagen: 'img/guisante6.jpg' },
                { titulo: 'Guisante 7', texto: 'Guisante 7 es Álvaro - Planta avanzada', imagen: 'img/guisante7.jpg' },
                { titulo: 'Guisante 8', texto: 'Guisante 8 es Álvaro - Planta fuerte', imagen: 'img/guisante8.jpg' },
                { titulo: 'Guisante 9', texto: 'Guisante 9 es Álvaro - Última planta', imagen: 'img/guisante9.jpg' }
            ];
            renderizarTarjetas(tarjetasRespaldo);
        });
}

function renderizarTarjetas(listaTarjetas) {
    let contenedor = document.getElementById('contenedor-tarjetas');
    contenedor.innerHTML = '';
    
    for (let i = 0; i < listaTarjetas.length; i++) {
        let tarjeta = listaTarjetas[i];
        
        let divTarjeta = document.createElement('div');
        divTarjeta.className = 'tarjeta';
        divTarjeta.dataset.titulo = tarjeta.titulo.toLowerCase();
        
        let divImagen = document.createElement('div');
        divImagen.className = 'imagen-tarjeta';
        
        let img = document.createElement('img');
        img.src = tarjeta.imagen;
        img.alt = tarjeta.titulo;
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/250x150?text=Sin+imagen';
        };
        
        divImagen.appendChild(img);
        
        let h3 = document.createElement('h3');
        h3.textContent = tarjeta.titulo;
        
        let p = document.createElement('p');
        p.textContent = tarjeta.texto;
        
        divTarjeta.appendChild(divImagen);
        divTarjeta.appendChild(h3);
        divTarjeta.appendChild(p);
        
        contenedor.appendChild(divTarjeta);
    }
}

function buscarTarjetas() {
    let texto = document.getElementById('campo-busqueda').value.toLowerCase();
    let tarjetas = document.querySelectorAll('.tarjeta');
    
    for (let i = 0; i < tarjetas.length; i++) {
        let titulo = tarjetas[i].dataset.titulo;
        if (titulo.includes(texto) || texto === '') {
            tarjetas[i].classList.remove('oculta');
        } else {
            tarjetas[i].classList.add('oculta');
        }
    }
}

function cambiarTema() {
    let tema = document.getElementById('tema-select').value;
    let body = document.body;
    
    body.classList.remove('modo-oscuro');
    
    if (tema === 'oscuro') {
        body.classList.add('modo-oscuro');
    } else if (tema === 'personalizado') {
        document.getElementById('modal-tema').classList.add('activo');
    }
}

function aplicarTemaPersonalizado() {
    let colorHeader = document.getElementById('color-header').value;
    let colorMain = document.getElementById('color-main').value;
    let colorFooter = document.getElementById('color-footer').value;
    
    document.querySelector('.cabecera').style.backgroundColor = colorHeader;
    document.querySelector('.zona-tarjetas').style.backgroundColor = colorMain;
    document.querySelector('.pie-pagina').style.backgroundColor = colorFooter;
    
    document.getElementById('modal-tema').classList.remove('activo');
}

function anadirNuevaTarjeta() {
    let titulo = document.getElementById('nuevo-titulo').value;
    let texto = document.getElementById('nueva-descripcion').value;
    let archivoImagen = document.getElementById('nueva-imagen').files[0];
    
    if (!titulo || !texto || !archivoImagen) {
        alert('Completa todos los campos');
        return;
    }
    
    let lector = new FileReader();
    
    lector.onload = function(evento) {
        let contenedor = document.getElementById('contenedor-tarjetas');
        
        let divTarjeta = document.createElement('div');
        divTarjeta.className = 'tarjeta';
        divTarjeta.dataset.titulo = titulo.toLowerCase();
        
        let divImagen = document.createElement('div');
        divImagen.className = 'imagen-tarjeta';
        
        let img = document.createElement('img');
        img.src = evento.target.result;
        img.alt = titulo;
        
        divImagen.appendChild(img);
        
        let h3 = document.createElement('h3');
        h3.textContent = titulo;
        
        let p = document.createElement('p');
        p.textContent = texto;
        
        divTarjeta.appendChild(divImagen);
        divTarjeta.appendChild(h3);
        divTarjeta.appendChild(p);
        
        contenedor.appendChild(divTarjeta);
        
        document.getElementById('modal-anadir').classList.remove('activo');
        document.getElementById('nuevo-titulo').value = '';
        document.getElementById('nueva-descripcion').value = '';
        document.getElementById('nueva-imagen').value = '';
    };
    
    lector.readAsDataURL(archivoImagen);
}