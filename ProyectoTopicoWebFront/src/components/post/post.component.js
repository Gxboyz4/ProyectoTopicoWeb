import { Crypto } from '../../utils/Crypto.js';
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
        this.numeroComentarios = this.post.comentarios.length;
        
        this.modalConfirmation = document.createElement('modal-confirmation');
        document.body.appendChild(this.modalConfirmation);

        //Modal para mensajes
        this.modal = document.createElement('modal-message');
        document.body.appendChild(this.modal);

        this.#verificarLike(this.post).then(usuarioLikeo => {
            this.usuarioLikeo = usuarioLikeo;
            //console.log(this.usuarioLikeo, 'usuario likeo ' + this.post.id);
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
                        this.#colorearLike(shadow);
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
        //console.log('comentariosd del post', comentarios);
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
                            <app-unirse idComunidad="${this.post.idComunidad}"></app-unirse>
                            <span class="menuIconContainer">
                                <img class="menuIcon" src="src/assets/icons/MoreIcon.svg" alt="Menu">
                                <button class="buttonDelete">Eliminar</button>
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
                    <div class="commentsSpace"></div>
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
        const botonEliminar = shadow.querySelector('.buttonDelete');
        botonEliminar.addEventListener('click', () => {
            
            if(this.session.usuario._id === this.post.idUsuario){
                
                this.#toggleMenu(shadow);
                this.modalConfirmation.setAttribute('post-id', this.post.id); 
                this.modalConfirmation.open();
                
            }
        });

        addEventListener('eliminar-post', (event) => {
            if(event.detail === this.post.id){
                this.remove();
            }
            
        });
        groupName.addEventListener('click', (event) => {
            event.preventDefault();
            ComunidadService.obtenerComunidadPorId(this.post.idComunidad).then(comunidad => {
                if (comunidad) {
                  page(`/comunidad?comunidad=${Crypto.encryptData(comunidad)}`);
                } else {
                  console.log('No se ha encontrado la comunidad');
                }
              });

            //page(`/comunidades/${this.comunidad.id}`);
        });
        addEventListener('cerrar-sesion', () => {
            console.log("Se clickeo en cerrar sesión");
            const writeCommentSection = shadow.querySelector('.write');
            this.session = null;
            if (writeCommentSection) {
            writeCommentSection.remove();
            }
            this.#verificarLike(this.post).then(usuarioLikeo => {
                this.usuarioLikeo = usuarioLikeo;
                this.#colorearLike(shadow);
            });
        });
       
    }

    #toggleLike(shadow) {
        if (this.usuarioLikeo) {
            this.#quitarLike(shadow);
        } else {
            this.#darLike(shadow);
        }
        shadow.querySelector('.likeCount').textContent = `${this.post.cantidadLikes} Me gusta`;
        this.#colorearLike(shadow);
    }

    #colorearLike(shadow) {
        shadow.querySelector('.likeItem').style.color = this.usuarioLikeo ? 'blue' : 'inherit';
    }

    async #verificarLike(post) {
        if (!this.session) return false;
        try {
            const likes = await UsuarioService.getLikes(this.session.usuario._id, this.session.token);
            //console.log("LE HA DADO LIKE A " + likes);
            return likes.includes(post.id);
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    
    async #darLike(shadow) {
        if (!this.session) return;
        try {
            await PostService.likeResena(this.post.id, this.session.usuario._id, this.session.token);
            //console.log("de dislike a like " + this.usuarioLikeo + " --> " + !this.usuarioLikeo);
            this.usuarioLikeo = true;
            this.post.cantidadLikes++;
            shadow.querySelector('.likeCount').textContent = `${this.post.cantidadLikes} Me gusta`;
            shadow.querySelector('.likeItem').style.color = 'blue';
        } catch (error) {
            console.error(error);
        }
    }

    async #quitarLike(shadow) {
        if (!this.session) return;
        try {
            await PostService.dislikeResena(this.post.id, this.session.usuario._id, this.session.token);
            //console.log("de like a dislike " + this.usuarioLikeo + " --> " + !this.usuarioLikeo);
            this.usuarioLikeo = false;
            this.post.cantidadLikes--;
            shadow.querySelector('.likeCount').textContent = `${this.post.cantidadLikes} Me gusta`;
            shadow.querySelector('.likeItem').style.color = 'inherit';
        } catch (error) {
            console.error(error);
        }
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
        let comentariosHTML = await Promise.all(
            comentarios.map(async (comentario) => {
                try {
                    const usuario = await UsuarioService.obtenerUsuarioPorId(comentario.usuario);
                    return `
                        <app-comment 
                            id=${comentario._id}
                            idUsuario=${comentario.usuario}
                            contenido="${comentario.comentario}"
                            fechaCreacion=${comentario.fecha_hora}
                            nombreUsuario=${usuario.nombre}
                            avatarUsuario=${usuario.avatar}
                        ></app-comment>
                    `;
                } catch (error) {
                    return '<p>No se pudo cargar este comentario</p>';
                }
            })
        ).catch(error => {
            console.error('Error cargando comentarios:', error);
            return [];
        });
    
        if (!Array.isArray(comentariosHTML)) comentariosHTML = [];
    
        if (this.session) {
            comentariosContainer.innerHTML = `
                <div class="write">
                    <img class="sessionUserComment" src="../src/assets/profileimages/${this.usuario.avatar}.png" alt="" />
                    <input id="comentario" type="text" placeholder="Escribe un comentario..." />
                    <button id="commentButton">Comentar</button>
                </div>
                ${comentariosHTML.join('')}
            `;
            shadow.querySelector('#commentButton').addEventListener('click', () => {
                const contenido = shadow.querySelector('#comentario').value.trim();
                if (contenido) {
                    this.#crearComentario(shadow, contenido);
                } else {
                    this.modal.title = 'Error';
                    this.modal.message = 'No puedes enviar un comentario vacío';
                    this.modal.open();
                }
            });
        } else {
            comentariosContainer.innerHTML = `${comentariosHTML.join('')}`;
        }
    }

    #crearComentario(shadow, contenido) {
        if (!this.session) return;
    
        ComentarioService.crearComentario(contenido, this.session.token, this.post.id, this.session.usuario._id)
            .then(comentario => {
                const comentarioTexto = comentario.comentario || contenido; 
                const fechaCreacion = 'Ahora';
                UsuarioService.obtenerUsuarioPorId(this.session.usuario._id)
                    .then(usuario => {
                        const comentarioHTML = `
                            <app-comment 
                                id=${comentario._id}
                                idUsuario=${comentario.usuario}
                                contenido="${comentarioTexto}"
                                fechaCreacion=${fechaCreacion}
                                nombreUsuario=${usuario.nombre}
                                avatarUsuario=${usuario.avatar}
                            ></app-comment>
                        `;
                        console.log('comentario a pushear', comentario);
                        this.post.comentarios.push(comentario);
                        this.#actualizarContadorComentarios(shadow);
                        shadow.querySelector('.commentsSpace').insertAdjacentHTML('beforeend', comentarioHTML);
                        shadow.querySelector('#comentario').value = '';
                    })
                    .catch(error => {
                        console.error('Error al obtener el usuario:', error);
                    });
            })
            .catch(error => {
                console.error('Error al crear el comentario:', error);
            });
    }

    #actualizarContadorComentarios(shadow) {
        this.numeroComentarios++;
        shadow.querySelector('.commentItem').innerHTML = `
            <img src="src/assets/icons/CommentIcon.svg" alt="Comentario">
            ${this.numeroComentarios} Comentarios
        `;
    }
 
}