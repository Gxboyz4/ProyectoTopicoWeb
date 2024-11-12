
import { UsuarioService } from "../../services/usuario.service.js";
import { Comentario } from "../../models/comentario.js";
export class CommentComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        const comentario = this.#createComment();
        this.usuario = UsuarioService.getUsuarioById(comentario.idUsuario);
        console.log('el usuario es', this.usuario);
        this.#addStyles(shadow, comentario);
        this.#render(shadow, comentario);
    }

    #createComment(){
        const id = this.getAttribute('id'); 
        const idUsuario = this.getAttribute('idUsuario');
        const contenido = this.getAttribute('contenido');
        const fechaCreacion = this.getAttribute('fechaCreacion');
        return new Comentario(id, idUsuario, contenido, fechaCreacion);
    }

    #render(shadow, comentario) {
        console.log(comentario.contenido);
        shadow.innerHTML += `
            <div class="comments">
                <div class="comment">
                    <img src="${this.usuario.avatar}" alt="" />
                    <div class="info">
                        <span>${this.usuario.nombre}</span>
                        <p>${comentario.contenido}</p>
                    </div>
                    <span class="date">${comentario.fechaCreacion}</span>
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
}
