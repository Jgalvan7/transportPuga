import { Valoraciones } from "./class/valoraciones.js";
import { Contactos } from "./class/contacto.js";

const modal = document.getElementById("modal");
const abrirModal = document.getElementById("btnContacto");
abrirModal.addEventListener("click", (e) => {
    modal.classList.add("modalContacto")
    modal.classList.remove("hidden");
});
const cerrarModal = document.getElementById("cerrarModal");
cerrarModal.addEventListener("click", (e) => {
    modal.classList.add("hidden");
    modal.classList.remove("modalContacto");
});

// PETICION DE CONTACTO
// buscamos el id del botón que envia el comentario y le añadimos una escucha para cuando se hace click
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

// VISUALIZAR COMENTARIOS
// buscamos el contenedor donde se cargaran los comentarios
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
