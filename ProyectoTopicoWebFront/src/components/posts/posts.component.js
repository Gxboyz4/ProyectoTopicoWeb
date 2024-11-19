
import { PostService } from "../../services/post.service.js";

export class PostsComponent extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#addStyles(shadow);
        this.#cargarPosts().then(posts => {
            this.postsCargados = posts;
            this.#render(shadow);
        });
    }

    #cargarPosts() {
        return new Promise((resolve, reject) => {
            const idComunidad = this.getAttribute('idComunidad');
            if (idComunidad) {
                /*
                PostService.obtenerResenasComunidad(idComunidad).then(posts => {
                    resolve(posts.length === 0 ? [] : posts);
                }).catch(error => {
                    reject([]);
                });
                */
                PostService.obtenerPostsFiltro().then(posts => {
                    resolve(posts.length === 0 ? [] : posts);
                }).catch(error => {
                    reject([]);
                });
            } else {
                PostService.obtenerPostsFiltro().then(posts => {
                    resolve(posts.length === 0 ? [] : posts);
                }).catch(error => {
                    reject([]);
                });
            }
        });
    }
    
    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/posts/posts.component.css");
        shadow.appendChild(link);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="posts">
                ${this.postsCargados ? this.postsCargados.map(post => this.#renderPost(post)).join('') : ``}
            </div>
        `;
    }
    
    #renderPost(post){
        return `
            <app-post 
                id="${post.id}"
                idComunidad="${post.idComunidad}"
                idUsuario="${post.idUsuario}"
                idPelicula="${post.idPelicula}"
                cantidadLikes="${post.cantidadLikes}"
                calificacion="${post.calificacion}"
                contenido="${post.contenido}"
                comentarios='${JSON.stringify(post.comentarios)}'
            >
            </app-post>
        `;
    }



}