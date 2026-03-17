const botones = document.querySelectorAll("button")

botones.forEach((button)=>{

    button.addEventListener("click", function(){
    const texto = button.textContent;

    alert(`Has pulsado ${texto}`);
    });

})