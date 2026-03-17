// Variables globales
let currentCards = [];
let cardContainer = document.getElementById('card-container');

// Cargar datos del XML al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    loadXMLData();
    setupEventListeners();
    setupModals();
});

// Configurar todos los event listeners
function setupEventListeners() {
    // Botón de búsqueda
    document.getElementById('search-btn').addEventListener('click', searchCards);
    
    // Búsqueda con Enter
    document.getElementById('search-input').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchCards();
        }
    });
    
    // Selector de tema
    document.getElementById('theme-select').addEventListener('change', changeTheme);
    
    // Botón añadir planta
    document.getElementById('add-plant-btn').addEventListener('click', function() {
        document.getElementById('add-modal').classList.add('show');
    });
    
    // Cerrar modales
    document.getElementById('close-modal').addEventListener('click', function() {
        document.getElementById('add-modal').classList.remove('show');
        document.getElementById('add-plant-form').reset();
    });
    
    document.getElementById('close-theme-modal').addEventListener('click', function() {
        document.getElementById('custom-theme-modal').classList.remove('show');
    });
    
    // Formulario añadir planta
    document.getElementById('add-plant-form').addEventListener('submit', addNewCard);
    
    // Formulario tema personalizado
    document.getElementById('custom-theme-form').addEventListener('submit', applyCustomTheme);
}

// Configurar modales
function setupModals() {
    // Cerrar modales haciendo clic fuera
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
            document.getElementById('add-plant-form').reset();
        }
    });
}

// Cargar datos desde XML
function loadXMLData() {
    fetch('data/data.xml')
        .then(response => response.text())
        .then(xmlText => {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            let plantas = xmlDoc.getElementsByTagName('planta');
            
            currentCards = [];
            
            for (let planta of plantas) {
                let titulo = planta.getElementsByTagName('titulo')[0].textContent;
                let texto = planta.getElementsByTagName('texto')[0].textContent;
                let imagen = planta.getElementsByTagName('imagen')[0].textContent;
                
                currentCards.push({ titulo, texto, imagen });
            }
            
            renderCards(currentCards);
        })
        .catch(error => {
            console.error('Error cargando XML:', error);
            cardContainer.innerHTML = '<p style="color: red;">Error cargando las plantas. Usando datos de ejemplo.</p>';
            // Datos de ejemplo por si falla el XML
            loadSampleData();
        });
}

// Datos de ejemplo por si falla el XML
function loadSampleData() {
    currentCards = [];
    for (let i = 1; i <= 9; i++) {
        currentCards.push({
            titulo: `Guisante ${i}`,
            texto: `Descripción de la planta Guisante ${i}`,
            imagen: `guisante${i}.png`
        });
    }
    renderCards(currentCards);
}

// Renderizar tarjetas en el main
function renderCards(cards) {
    cardContainer.innerHTML = '<div class="card-container"></div>';
    let container = cardContainer.querySelector('.card-container');
    
    cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.dataset.titulo = card.titulo.toLowerCase();
        
        // Imagen (simulada con emoji por ahora)
        let imagenNum = card.titulo.replace('Guisante ', '');
        let emoji = getPlantEmoji(imagenNum);
        
        cardElement.innerHTML = `
            <div class="card-image">${emoji}</div>
            <h3>${card.titulo}</h3>
            <p>${card.texto}</p>
        `;
        
        container.appendChild(cardElement);
    });
}

// Obtener emoji según el número de guisante
function getPlantEmoji(num) {
    const emojis = ['🌱', '🌿', '☘️', '🍀', '🌳', '🌲', '🌵', '🌻', '🌺'];
    let index = parseInt(num) - 1;
    if (index >= 0 && index < emojis.length) {
        return emojis[index];
    }
    return '🌱';
}

// Función de búsqueda
function searchCards() {
    let searchText = document.getElementById('search-input').value.toLowerCase();
    let cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        let titulo = card.dataset.titulo;
        if (titulo.includes(searchText) || searchText === '') {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Cambiar tema
function changeTheme() {
    let theme = document.getElementById('theme-select').value;
    let body = document.body;
    
    // Resetear estilos personalizados
    body.style = '';
    document.getElementById('main-header').style = '';
    document.getElementById('card-container').style = '';
    document.getElementById('main-footer').style = '';
    
    switch(theme) {
        case 'light':
            body.classList.remove('dark-mode');
            break;
        case 'dark':
            body.classList.add('dark-mode');
            break;
        case 'custom':
            body.classList.remove('dark-mode');
            document.getElementById('custom-theme-modal').classList.add('show');
            break;
    }
}

// Aplicar tema personalizado
function applyCustomTheme(e) {
    e.preventDefault();
    
    let headerColor = document.getElementById('header-color').value;
    let mainColor = document.getElementById('main-color').value;
    let footerColor = document.getElementById('footer-color').value;
    
    document.getElementById('main-header').style.backgroundColor = headerColor;
    document.getElementById('main-header').style.borderColor = '#000';
    
    document.getElementById('card-container').style.backgroundColor = mainColor;
    document.getElementById('card-container').style.borderColor = '#000';
    
    document.getElementById('main-footer').style.backgroundColor = footerColor;
    document.getElementById('main-footer').style.borderColor = '#000';
    
    document.getElementById('custom-theme-modal').classList.remove('show');
}

// Añadir nueva tarjeta
function addNewCard(e) {
    e.preventDefault();
    
    let titulo = document.getElementById('plant-title').value;
    let texto = document.getElementById('plant-desc').value;
    let imagenFile = document.getElementById('plant-image').files[0];
    
    if (imagenFile) {
        let reader = new FileReader();
        
        reader.onload = function(element) {
            // Crear nueva tarjeta
            let container = document.querySelector('.card-container');
            let cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.dataset.titulo = titulo.toLowerCase();
            
            // Usar emoji por ahora (en proyecto real sería la imagen)
            let emoji = '🌱';
            
            cardElement.innerHTML = `
                <div class="card-image">${emoji}</div>
                <h3>${titulo}</h3>
                <p>${texto}</p>
            `;
            
            container.appendChild(cardElement);
            
            // Actualizar array de tarjetas
            currentCards.push({ titulo, texto, imagen: imagenFile.name });
            
            // Cerrar modal y resetear formulario
            document.getElementById('add-modal').classList.remove('show');
            document.getElementById('add-plant-form').reset();
        };
        
        reader.readAsDataURL(imagenFile);
    }
}

// Inicializar todo cuando carga la página
console.log('Script cargado correctamente');