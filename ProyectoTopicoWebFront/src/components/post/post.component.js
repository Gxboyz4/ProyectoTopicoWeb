
import { UsuarioService } from '../../services/usuario.service.js';
import { ComunidadService } from '../../services/comunidad.service.js';
import { ComentarioService } from '../../services/comentario.service.js';
import { Post } from '../../models/post.js';
import { PeliculaService } from '../../services/pelicula.service.js';

export class PostComponent extends HTMLElement {
    constructor() {
        super();

        this.comentarioAbierto = false;
        this.menuAbierto = false;
        this.usuarioLikeo = false;
        this.contadorLikes = 0;

    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        const post = this.#crearObjetoPost();

        this.usuario = UsuarioService.getUsuarioById(post.idUsuario);

        this.comunidad = ComunidadService.getComunidadById(post.idComunidad);
        this.contadorLikes = post.cantidadLikes;
        PeliculaService.getPeliculaPorId(post.idPelicula)
        .then(pelicula => {
                this.pelicula = pelicula;
                this.#addStyles(shadow);
                this.#render(shadow, post);
                this.#attachEvents(shadow, post.comentarios);
            }
        );
    }

    #crearObjetoPost() {
        const id = this.getAttribute('id');
        const idComunidad = this.getAttribute('idComunidad');
        const idUsuario = this.getAttribute('idUsuario');
        const idPelicula = this.getAttribute('idPelicula');
        const cantidadLikes = parseInt(this.getAttribute('cantidadLikes'));
        const calificacion = this.getAttribute('calificacion');
        const contenido = this.getAttribute('contenido');
        const comentarios = this.hasAttribute('comentarios') ? JSON.parse(this.getAttribute('comentarios')) : [];
        return new Post(id, idComunidad, idUsuario, idPelicula, cantidadLikes, calificacion, contenido, comentarios);
    }

    #render(shadow, post) {
        shadow.innerHTML += `
            <div class="post">
                <div class="container">

                    <div class="user">
                        <div class="userInfo">
                            <img src="${this.usuario.avatar}" alt="imagen-usuario">
                            <div class="details">
                                <span class="groupName">${this.comunidad.nombre} ° ${post.fechaCreacion} </span>
                                <span class="userName">${this.usuario.nombre}</span>
                            </div>
                        </div>

                        <div class="buttons">
                            <button class="buttonUnirse">Unirse</button>
                            <span class="menuIconContainer">
                                <img class="menuIcon"src="src/assets/icons/MoreIcon.svg" alt="Menu">
                                <button class="buttonDelete">delete</button>
                            </span>
                        </div>
                    </div>

                    <div class="content">
                        <h3>${post.calificacion} / 10 | PELICULA</h3>
                        <p class="description">${post.contenido}</p>
                        <img src=${this.pelicula.Poster} alt="imgpublicacion">
                    </div>
                    
                    <div class="info">
                        <div class="likeItem">
                            <img src="src/assets/icons/LikeIcon.svg" alt="Not liked">
                            <span class="likeCount">${this.contadorLikes} Me gusta</span>
                        </div>
                        <div class="commentItem">
                            <img src="src/assets/icons/CommentIcon.svg" alt="Comentario">
                            ${post.comentarios.length} Comentarios 
                        </div>
                        
                    </div>
                    <div class="commentsSpace">
                        <!-- AQUI SE RENDERIZAN LOS COMENTARIOS -->
                    </div>
                </div>
            </div>
        `;

    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/post/post.component.css");
        shadow.appendChild(link);
    }

    #attachEvents(shadow, comentarios) {
        shadow.querySelector('.likeItem').addEventListener('click', () => this.#toggleLike(shadow));
        shadow.querySelector('.menuIcon').addEventListener('click', () => this.#toggleMenu(shadow));
        shadow.querySelector('.commentItem').addEventListener('click', () => this.#toggleComentarios(shadow, comentarios));
    }

    #toggleLike(shadow) {
        this.usuarioLikeo = !this.usuarioLikeo;
        this.contadorLikes += this.usuarioLikeo ? 1 : -1;
        shadow.querySelector('.likeCount').textContent = `${this.contadorLikes} Likes`;
        shadow.querySelector('.likeItem').style.color = this.usuarioLikeo ? 'blue' : 'inherit';
    }

    #toggleMenu(shadow) {
        this.menuAbierto = !this.menuAbierto;
        shadow.querySelector('.buttonDelete').style.display = this.menuAbierto ? 'block' : 'none';
    }

    #toggleComentarios(shadow, comentarios) {
        this.comentarioAbierto = !this.comentarioAbierto;
        shadow.querySelector('.commentsSpace').style.display = this.comentarioAbierto ? 'block' : 'none';

        this.#showComments(shadow, comentarios);
    }

    async #showComments(shadow, comentarios) {
        const comentariosContainer = shadow.querySelector('.commentsSpace');
        comentariosContainer.innerHTML = `
            <div class="write">
                <img src="path/to/PabloPelonImg" alt="" />
                <input type="text" placeholder="Escribe un comentario..." />
                <button>Comentar</button>
            </div>
            ${comentarios.map(comentario => this.#renderComment(comentario)).join('')}
        `;
    }

    #renderComment(comentario) {
        console.log('el comentario es ', comentario);
        return `
            <app-comment 
                id=${comentario.id}
                idUsuario=${comentario.idUsuario}
                contenido="${comentario.contenido}"
                fechaCreacion=${comentario.fechaCreacion}
            >
            </app-comment>
        `;

    }
}