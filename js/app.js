import { Valoraciones } from "./class/valoraciones.js";
import { Contactos } from "./class/contacto.js";

function modal() {
    try {
        const modal = document.getElementById("modal");
        const abrirModal = document.getElementById("btnContacto");
        abrirModal.addEventListener("click", (e) => {
            addRemoveClass(modal, "hidden");
            addRemoveClass(modal, "modalContacto");
        });
        const cerrarModal = document.getElementById("cerrarModal");
        cerrarModal.addEventListener("click", (e) => {
            addRemoveClass(modal, "hidden");
            addRemoveClass(modal, "modalContacto");
        });
    } catch {

    }
}
modal();

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
        contacto();
        comentarios();
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

// PETICION DE CONTACTO
// buscamos el id del botón que envia el comentario y le añadimos una escucha para cuando se hace click
function contacto(){
    try {
        const sendContacto = document.getElementById("sendContacto");
        sendContacto.addEventListener("click", (e) => {
            e.preventDefault();
            // buscamos el formulario y capturamos los valores de los campos
            const formulario = document.getElementById("formContacto");
            const client = formulario.cliente.value;
            const empresa = formulario.empresa.value;
            const telefono = formulario.telefono.value;
            const email = formulario.email.value;
            const comentario = formulario.comentario.value;
            if(client != "" && empresa != "" && telefono != "" && email != "") {
                // creamos una instancia del objeto Coments con los valores del formulario
                const Contacto = new Contactos ({
                    cliente: client,
                    empresa: empresa,
                    telefono: telefono,
                    email: email,
                    comentario: comentario
                });
                // llamamos al metodo publicar del objeto Coments
                Contacto.publicar();
                // limpiamos el formulario
                formulario.reset();
            } else {
                alert("Por favor rellena los campos obligatorios marcados con un *.")
            }
        });
    } catch {

    }
}

// VISUALIZAR COMENTARIOS
// buscamos el contenedor donde se cargaran los comentarios
function comentarios() {
    try {
        const valoracionClient = document.getElementById("comentBox")
        // creamos una instancia del objeto Coments para poder llamar a su metodo listar
        const listValoraciones = new Valoraciones({});
        listValoraciones.listar()
            // si la promesa es resuelta nos devolvera un Array con los comentarios.
            .then((response) => {
                // guardamos la respuesta en una constante
                const valoracion = response;
                // recorremos el array
                valoracion.forEach(coment => {
                    // creamos un contenedor por cada comentario y le asignamos el id del comentario al id del contenedor
                    const caja = document.createElement("div");
                    caja.className = "valueCard";
                    caja.id = coment.id;
                    // creamos las etiquetas y les asignamos los valores que queremos que se muestren
                    const cliente = document.createElement("h3");
                    cliente.innerText = coment.data().Cliente;
                    const puntos = document.createElement("p");
                    puntos.innerText = "Valoración: " + coment.data().Valoracion;
                    const texto = document.createElement("p");
                    texto.innerText = coment.data().Comentario;
                    // asignamos las etiquetas al contenedor del comentario y este al contenedor donde cre visualizaran todo los comentarios
                    caja.append(texto,cliente,puntos);
                    valoracionClient.append(caja);
                });
            })
            .catch();
    } catch {

    }
}

function addRemoveClass(etiqueta, clase) {
    etiqueta.classList.contains(clase) ? etiqueta.classList.remove(clase) : etiqueta.classList.add(clase);
}
