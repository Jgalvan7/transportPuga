import { insert, list, borrarDoc } from "../firebase/firestore.js";

export class Valoraciones {
    constructor({
        cliente,
        empresa,
        valoracion,
        comentario
    }) {
        this.cliente = cliente;
        this.empresa = empresa;
        this.valoracion = valoracion;
        this.comentario = comentario;
        this.fecha = new Date();
    }

    async publicar() {
        //alert("llega");
        const item = {
            Cliente: this.cliente,
            Empresa: this.empresa,
            Valoracion: Number(this.valoracion),
            Comentario: this.comentario,
            Fecha: this.fecha
        }
        //console.log(item);
        const saveValoracion = await insert("Comentarios", item);
        if(saveValoracion._key.path.segments[1]) {
            //alert("Su comentario ha quedado registrado satisfactoriamente, gracias por su valoración.");
            const formulario = document.getElementById("formValoracion");
            formulario.classList.add("thxText");
            formulario.innerText = "";

            const texto = document.createElement("p");
            texto.innerText = "Su comentario ha quedado registrado satisfactoriamente, gracias por su valoración.";

            const btnCerrar = document.createElement("button");
            btnCerrar.innerText = "Cerrar ventana";
            btnCerrar.addEventListener("click", () => {
                formulario.classList.remove("thxText");
                const modal = document.getElementById("modal");
                modal.classList.add("hidden");
                modal.classList.remove("modalValoracion");
            })
            formulario.append(texto,btnCerrar);
            //location.reload();
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