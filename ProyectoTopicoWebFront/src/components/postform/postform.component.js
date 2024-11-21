
import { PeliculaService } from '../../services/pelicula.service.js';
import { PostService } from '../../services/post.service.js';
import { SessionStorageService } from '../../utils/sessionStorageService.service.js';
import Validador from "../../utils/validador.js";

export class PostformComponent extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.idComunidad = this.getAttribute('idComunidad');
        this.#addStyles(shadow);
        this.#render(shadow);
        this.#addEventListeners(shadow);

        //Modal para mensajes 
        this.modal = document.createElement('modal-message');
        document.body.appendChild(this.modal);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="postform">
                <div class="container">
                    <div class="post">
                        <h3 class="titulo">Comparte tu crítica</h3>
                        <div class="critica">
                            <textarea id="critica" placeholder="Escribe tu crítica aquí"></textarea>
                        </div>
                        <div class="pelicula">
                            <input type="text" id="pelicula" placeholder="Añadir película">
                        </div>
                        <div class="publicar">
                            <img src="src/assets/icons/EstrellaIcon.svg" alt="icono-calificacion">
                            <div class="details">
                                <label for="calificacion">Califica la película</label>
                                <input type="number" id="calificacion" name="calificacion" min="0" max="10" placeholder="0-10" onkeydown="return false;">
                                
                                <button id="post-button">Publicar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/postform/postform.component.css");
        shadow.appendChild(link);
    }

    #addEventListeners(shadow) {
        const postButton = shadow.querySelector("#post-button");
        postButton.addEventListener("click", async () => {
            //event.preventDefault();
            this.#registrarPost();
        });
        const formContainer = shadow.querySelector(".postform");
        formContainer.style.display = SessionStorageService.getItem('session') ? "block" : "none";
        addEventListener('cerrar-sesion', () => {
            formContainer.style.display = "none";
        });
    }

    #registrarPost() {
        const critica = this.shadowRoot.querySelector("#critica").value;
        const pelicula = this.shadowRoot.querySelector("#pelicula").value;
        const calificacion = this.shadowRoot.querySelector("#calificacion").value;
        const idUsuario = SessionStorageService.getItem('session').usuario._id;
        if (Validador.validarDatosPost(critica, calificacion, pelicula)) {
            PeliculaService.getIdPeliculaPorNombre(pelicula).then((idPelicula) => {
                if (idPelicula) {
                    const post = {
                        usuario: idUsuario,
                        pelicula: idPelicula,
                        cantidad_likes: parseInt(0),
                        calificacion: calificacion,
                        contenido: critica,
                        comunidad: this.idComunidad,
                        comentarios: []
                    };
                    console.log(post);
                    PostService.crearPost(post, SessionStorageService.getItem('session').token)
                        .then((respuesta) => {
                            if (respuesta) {
                                console.log('Reseña creada exitosamente:', respuesta);
                                this.modal.title = '¡Éxito!';
                                this.modal.message = 'Reseña creada exitosamente!';
                                this.modal.open();
                            } else {
                                this.modal.title = 'Error';
                                this.modal.message = 'Error al crear la reseña. Inténtalo más tarde';
                                this.modal.open();
                            }
                        })
                        .catch((error) => {
                            this.modal.title = 'Error';
                            this.modal.message = 'Error en la creación de la reseña. Inténtalo más tarde';
                            this.modal.open();
                        });
                } else {
                    this.modal.title = 'Error';
                    this.modal.message = 'No se pudo encontrar la película';
                    this.modal.open();
                }
            }).catch((error) => {
                this.modal.title = 'Error';
                this.modal.message = 'Hubo un problema al obtener la información de la película';
                this.modal.open();
            });
        } else {
            this.modal.title = 'Error';
            this.modal.message = 'Ingresa todos los datos.';
            this.modal.open();
        }
    }

}