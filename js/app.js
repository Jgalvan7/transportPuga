import { Valoraciones } from "./class/valoraciones.js";

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

// CREAR VALORACION
// buscamos el id del botón que envia el comentario y le añadimos una escucha para cuando se hace click
/* const sendValoracion = document.getElementById("sendValoracion");
sendValoracion.addEventListener("click", (e) => {
    e.preventDefault();
    // buscamos el formulario y capturamos los valores de los campos
    const formulario = document.getElementById("formValoracion");
    const client = formulario.cliente.value;
    const empresa = formulario.empresa.value;
    const valor = formulario.valoracion.value;
    const comentario = formulario.comentario.value;

    // creamos una instancia del objeto Coments con los valores del formulario
    const Valoracion = new Valoraciones ({
        cliente: client,
        empresa: empresa,
        valoracion: valor,
        comentario: comentario
    });
    // llamamos al metodo publicar del objeto Coments
    Valoracion.publicar();
    // limpiamos el formulario
    formulario.reset();
}); */

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
