
import { PostService } from "../../services/post.service.js";

export class PostsComponent extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.idComunidad = this.getAttribute('idComunidad');
        this.orderBy = this.getAttribute('orderBy');
        this.#addStyles(shadow);
        this.#addEventListener(shadow);
        this.#cargarPosts().then(posts => {
            this.postsCargados = posts;
            this.#render(shadow);
        });
    }

    #addEventListener(shadow){
        addEventListener('post-creado', (event) => {
            const postCreado = event.detail;
            this.#renderEvento(shadow, postCreado.respuesta);
        });

    }

    #cargarPosts() {
        return new Promise((resolve, reject) => {
            if (this.idComunidad) {
                PostService.obtenerResenasComunidad(this.idComunidad,10,0,"fecha_creacion","desc").then(posts => {
                    resolve(posts.length === 0 ? [] : posts);
                }).catch(error => {
                    reject([]);
                });
            } else if(this.orderBy && this.orderBy === 'popular'){
                PostService.obtenerResenasMasLikes().then(posts => {
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
                ${this.postsCargados.map(post => this.#renderPost(post)).join('')}
            </div>
        `;
    }

    #renderEvento(shadow, post) {
        shadow.innerHTML += `
            <div class="posts">
                ${this.#renderPost(post)}
            </div>
        `;
    }

    


    #renderPost(post){
        return `
            <app-post 
                id="${post._id}"
                idComunidad="${post.comunidad}"
                idUsuario="${post.usuario}"
                idPelicula="${post.pelicula}"
                cantidadLikes="${post.cantidad_likes}"
                calificacion="${post.calificacion}"
                contenido="${post.contenido}"
                comentarios='${JSON.stringify(post.comentarios)}'
            >
            </app-post>
        `;
    }



}