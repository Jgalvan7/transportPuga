import { insert, list, borrarDoc } from "../firebase/firestore.js";

export class Contactos {
    constructor({
        cliente,
        empresa,
        telefono,
        email,
        comentario
    }) {
        this.cliente = cliente;
        this.empresa = empresa;
        this.telefono = telefono;
        this.email = email;
        this.comentario = comentario;
        this.fecha = new Date();
        this.new = true;
    }

    async publicar() {
        const item = {
            Cliente: this.cliente,
            Empresa: this.empresa,
            Telefono: Number(this.telefono),
            Email: this.email,
            Comentario: this.comentario,
            Fecha: this.fecha,
            New: this.new,
        }
        const saveContacto = await insert("peticionContacto", item);
        if(saveContacto._key.path.segments[1]) {
            const formulario = document.getElementById("formContacto");
            formulario.classList.add("thxText");
            formulario.innerText = "";

            const texto = document.createElement("p");
            texto.innerText = "Su solicitud ha sido enviada correctamente, nos pondremos en contacto con usted lo antes posible. Gracias por su confianza e interés.";

            const btnCerrar = document.createElement("button");
            btnCerrar.className = "container__bnt";
            btnCerrar.innerText = "Cerrar";
            btnCerrar.addEventListener("click", () => {
                formulario.classList.remove("thxText");
                const modal = document.getElementById("modal");
                modal.classList.add("hidden");
                modal.classList.remove("modalContacto");
            })
            formulario.append(texto,btnCerrar);
        }
    }

    async listar() {
        const listaValoraciones = await list("Comentarios");
        return listaValoraciones;
    }

    async borrar(id) {
        const borrarDocumento = await borrarDoc("Comentarios",id);
        return borrarDocumento;
    }
}