
import { UsuarioService } from '../../services/usuario.service.js';
import { ComunidadService } from '../../services/comunidad.service.js';
import { ComentarioService } from '../../services/comentario.service.js';
import { Post } from '../../models/post.js';
import { PeliculaService } from '../../services/pelicula.service.js';
import { SessionStorageService } from "../../utils/sessionStorageService.service.js";
import { PostService } from '../../services/post.service.js';

export class PostComponent extends HTMLElement {
    constructor() {
        super();

    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.session = SessionStorageService.getItem('session');
        this.post = this.#crearObjetoPost();
        this.comentarioAbierto = false;
        this.menuAbierto = false;
        this.#verificarLike(this.post).then(usuarioLikeo => {
            this.usuarioLikeo = usuarioLikeo;
            console.log(this.usuarioLikeo, 'usuario likeo ' + this.post.id);
        });
        PeliculaService.getPeliculaPorId(this.post.idPelicula)
            .then(pelicula => {
                this.pelicula = pelicula;
                UsuarioService.obtenerUsuarioPorId(this.post.idUsuario).then(usuario => {
                    this.usuario = usuario;
                    ComunidadService.obtenerComunidadPorId(this.post.idComunidad).then(comunidad => {
                        this.comunidad = comunidad;
                        this.#addStyles(shadow);
                        this.#render(shadow);
                        this.#attachEvents(shadow, this.post.comentarios);
                    });
                });
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

    #render(shadow) {
        shadow.innerHTML += `
            <div class="post">
                <div class="container">
                    <div class="user">
                        <div class="userInfo">
                            <img src="../src/assets/profileimages/${this.usuario.avatar}.png" alt="imagen-usuario">
                            <div class="details">
                                <span class="groupName">${this.comunidad.nombre} ° </span>
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
                        <h3>${this.post.calificacion} / 10 | ${this.pelicula.Title}</h3>
                        <p class="description">${this.post.contenido}</p>
                        <img src=${this.pelicula.Poster} alt="imgpublicacion">
                    </div>
                    
                    <div class="info">
                        <div class="likeItem">
                            <img src="src/assets/icons/LikeIcon.svg" alt="Not liked">
                            <span class="likeCount">${this.post.cantidadLikes} Me gusta</span>
                        </div>
                        <div class="commentItem">
                            <img src="src/assets/icons/CommentIcon.svg" alt="Comentario">
                            ${this.post.comentarios.length} Comentarios 
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
        const groupName = shadow.querySelector('.groupName');
        groupName.addEventListener('click', (event) => {
            event.preventDefault();
            page(`/comunidad`);

            //page(`/comunidades/${this.comunidad.id}`);
        });
    }

    #toggleLike(shadow) {
        if (this.usuarioLikeo) {
            this.#quitarLike();
        } else {
            this.#darLike();
        }
        shadow.querySelector('.likeCount').textContent = `${this.post.cantidadLikes} Me gusta`;
        this.#colorearLike(shadow);
    }

    #colorearLike(shadow) {
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

    async #verificarLike(post) {
        if (!this.session) return false;
        try {
            const likes = await UsuarioService.getLikes(this.session.usuario._id, this.session.token);
            console.log("LE HA DADO LIKE A " + likes);
            return likes.includes(post.id);
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    

    #darLike() {
        if (!this.session) return;
        PostService.likeResena(this.post.id, this.session.usuario._id, this.session.token).then(() => {
            this.usuarioLikeo = true;
            this.post.cantidadLikes++;
        });
    }

    #quitarLike() {
        if (!this.session) return;
        PostService.dislikeResena(this.post.id, this.session.usuario._id, this.session.token).then(() => {
            this.usuarioLikeo = false;
            this.post.cantidadLikes--;
        });
    }
}