    const contenedor = document.querySelector(".contenedor");
const btnDireccion = document.getElementById("direction");
const btnJustify = document.getElementById("justify");
const btnAlign = document.getElementById("align");

const direcciones = ["row", "row-reverse", "column", "column-reverse"];

const justificaciones = ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"];

const alineaciones = ["center", "stretch", "flex-start", "flex-end", "baseline"];

function getNextValue(lista, actual){

    for(let i = 0; i<lista.length; i++){

        if(lista[i] == actual){

             if(i < lista.length -1){
                return lista[i+1];
            }else{
                return lista[0];
            }
        }
    }
}

btnDireccion.addEventListener("click", function() {

    const actual = contenedor.style.flexDirection || "row";
    const siguiente = getNextValue(direcciones, actual);

    contenedor.style.flexDirection = siguiente;
    btnDireccion.textContent = `Direccion: ${siguiente}`;
});

btnJustify.addEventListener("click", function(){

    const actual = contenedor.style.justifyContent || "flex-start";
    const siguiente = getNextValue(justificaciones, actual);

    contenedor.style.justifyContent = siguiente;
    btnJustify.textContent = `Justify: ${siguiente}`;
});

btnAlign.addEventListener("click", function(){

    const actual = contenedor.style.alignItems || "center";
    const siguiente = getNextValue(aciones, actual);

    contenedor.style.alignItems = siguiente;
    btnAlign.textContent = `Align: ${siguiente}`;
});