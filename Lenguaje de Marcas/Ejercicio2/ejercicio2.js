const usuarios = document.querySelectorAll("div[data-user]");
const mensaje = document.getElementById("mensaje");

function status(user) {
    const currentStatus = user.dataset.status;

if(currentStatus === "activo") {
    user.dataset.status = "inactivo";
    showMessage("Usuario desactivado")
} else {
    user.dataset.status = "activo"
    showMessage("Usuario activado")
}
}

function showMessage(texto) {
mensaje.innerHTML = texto;

setTimeout(() => {
    mensaje.innerHTML = " ";
}, 2000);
    
}

function role(user){
    const currentRole = user.dataset.role;

    if(currentRole === "admin") {
        user.dataset.role = "usuario";
        showMessage("Rol cambiado a usuario");
    } else {
        user.dataset.role = "admin";
        showMessage("Rol cambiado a admin");
    }
}

    usuarios.forEach((user) => {

    const botones = user.querySelectorAll("button");

    botones.forEach((button) => {

        button.addEventListener("click", function() {
            const action = button.dataset.action;

            if(action === "toggle") {
                status(user);
            }

            if(action === "role") {
                role(user);
            }
        });
    });
});