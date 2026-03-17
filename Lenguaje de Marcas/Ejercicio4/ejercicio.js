btnFiltrar = document.getElementById("filtrar");
btnFav = document.getElementById("favoritos");
select = document.getElementById("categoria");
contenedorProductos = document.getElementById("productos");
contador = document.getElementById("contador");

totalFavoritos = 0;
mostrarFavs = false;

fetch("ejercicio.xml")
    .then((response) => response.text())
    .then((data) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/xml");
        const productos = xml.getElementsByTagName("producto");

        for (let producto of productos) {
            const nombre = producto.getElementsByTagName("nombre")[0].textContent;
            const categoria = producto.getElementsByTagName("categoria")[0].textContent;

            contenedorProductos.innerHTML +=`
                    <div data-product
                        data-category="${categoria}"
                        data-fa-"false">
            
                    <p>${nombre}</p>
                    <button class="fav">Añadir a favoritos</button>
                    </div>
            `;
        }
    })

    function favoritos(){
    const favoritos = document.querySelectorAll(".fav");
    favoritos.forEach((boton) => {
        boton.addEventListener("click", marcarFavorito);
    });
}

function marcarFavorito(evento){

    const producto = evento.target.parentElement;

    if(producto.dateset.fav === "true"){
        producto.dataset.fav = "false";
        totalFavoritos--;
        evento.target.textContent = "Añadir a favoritos";
    } else {
        producto.dataset.fav = "true";
        totalFavoritos++;
        evento.target.textContent = "Quitar de favoritos";
    }

    actualizarContador();
}

function actualizarContador(){
    contador.innerText=`Favoritos:  ${totalFavoritos}`
}

function filtrarProductos(){

    const categoria = selec.value;
    const productos = document.querySelectorAll("div[data-product]");

    productos.forEach((producto) => {

    if(categoria === "Todos" || producto.dataset.category === categoria ){ 
        producto.style.display = "block";
    }else{
        producto.style.display = "none";
    }
});

}

function verFavoritos(){
    const productos = document.querySelectorAll("div[data-product]");
    mostrarFavs = localStorage.getItem("favoritos");

    productos.forEach((producto) => {
        if(producto.dataset.fav === "true") {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }
    });

    if(mostrarFavs){
        btnFav.textContent = "Ver todos";
    } else {
        btnFav.textContent = "Ver favoritos";
    }
}

btnFilter.addEventListener("click", filterProduct);
btnFav.addEventListener("click", verFavoritos);