// FUNCIONALIDAD BOTONES DE CONTACTO
function bntContacto() {
    const botones = document.querySelector("main");
    botones.addEventListener("click", (e) => {
        let boton = e.target.id;
        boton.includes("btnContacto") ? location.href="contacto.html" : "";
    })
}
bntContacto();


const menuBnt = document.getElementById("menuBurger");
menuBnt.addEventListener("click", (e) => {
    e.preventDefault();
    const menuItem = document.getElementById("menuItem");
    addRemoveClass(menuItem, "hidden");
    addRemoveClass(menuItem, "container__menu--mobile");
})
const infoSeccion = document.getElementById("seccionMenu");
const url = "/html/";
switch (window.location.pathname) {
    case url+"index.html":
        infoSeccion.innerText = "HOME";
        break;
    case url+"servicios.html":
        infoSeccion.innerText = "SERVICIOS";
        break;
    case url+"flota.html":
        infoSeccion.innerText = "FLOTA ";
        break;
    case url+"nosotros.html":
        infoSeccion.innerText = "NOSOTROS";
        break;
    case url+"contacto.html":
        infoSeccion.innerText = "CONTACTO";
        break;
    case url+"preguntas.html":
        infoSeccion.innerText = "PREGUNTAS";
        break;
}

function addRemoveClass(etiqueta, clase) {
    etiqueta.classList.contains(clase) ? etiqueta.classList.remove(clase) : etiqueta.classList.add(clase);
}
