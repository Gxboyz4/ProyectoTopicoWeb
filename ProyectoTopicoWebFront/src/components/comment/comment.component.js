
import { Comentario } from "../../models/comentario.js";
export class CommentComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        const comentario = this.#createComment();
        this.#addStyles(shadow, comentario);
        this.#render(shadow, comentario);

    }

    #createComment(){
        const id = this.getAttribute('id'); 
        const idUsuario = this.getAttribute('idUsuario');
        const contenido = this.getAttribute('contenido');
        const fechaCreacion = this.getAttribute('fechaCreacion');
        const nombreUsuario = this.getAttribute('nombreUsuario');
        const avatarUsuario = this.getAttribute('avatarUsuario');
        console.log("Información del comentario: "+ id, idUsuario, contenido, fechaCreacion, nombreUsuario, avatarUsuario);
        return new Comentario(id, idUsuario, contenido, fechaCreacion, nombreUsuario, avatarUsuario);
        
    }

    #render(shadow, comentario) {
        const tiempoTranscurrido = this.#calcularTiempoTranscurrido(comentario.fechaCreacion);
        shadow.innerHTML += `
            <div class="comments">
                <div class="comment">
                    <img src="../src/assets/profileimages/${comentario.avatarUsuario}.png" alt="" />
                    <div class="info">
                        <span>${comentario.nombreUsuario}</span>
                        <p>${comentario.contenido}</p>
                    </div>
                    <span class="date">${tiempoTranscurrido}</span>
                </div>
            </div>
        `;
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/comment/comment.component.css");
        shadow.appendChild(link);
    }

    #calcularTiempoTranscurrido(fechaCreacion) {
        if (isNaN(Date.parse(fechaCreacion))) {
            return fechaCreacion;
        }
        const fechaComentario = new Date(fechaCreacion);
        const ahora = new Date();
        const diferencia = ahora - fechaComentario; 
    
        const segundos = Math.floor(diferencia / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);
    
        if (segundos < 60) {
            return `hace ${segundos} segundos`;
        } else if (minutos < 60) {
            return `hace ${minutos} minutos`;
        } else if (horas < 24) {
            return `hace ${horas} horas`;
        } else if (dias < 30) {
            return `hace ${dias} días`;
        } else {
            const meses = Math.floor(dias / 30);
            if (meses < 12) {
                return `hace ${meses} meses`;
            } else {
                const años = Math.floor(meses / 12);
                return `hace ${años} años`;
            }
        }
    }
}
