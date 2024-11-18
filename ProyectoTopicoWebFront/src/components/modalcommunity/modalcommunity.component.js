import Validador from '../../utils/validador.js';
import { ComunidadService } from '../../services/comunidad.service.js';
import { ComunidadUsuarioService } from '../../services/comunidadusuario.service.js';
import { subirImagen } from '../../services/firebase.service.js';
import { SessionStorageService } from '../../utils/sessionStorageService.service.js';
import { Comunidad } from '../../models/comunidad.js';
import { ComunidadUsuario } from '../../models/comunidadUsuario.js';

export class ModalCommunityComponent extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.session = SessionStorageService.getItem('session');
        this.#addStyles(shadow);
        this.#render(shadow);
        this.#addEventListeners();
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="modal" id="modalCrearComunidad">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Crear Comunidad</h2>
                    <form id="create-community-form">
                        <div class="form-group">
                            <label for="name">Nombre</label>
                            <input type="text" id="name" class="input-field" placeholder="Nombre de la comunidad" required />
                        </div>
                        <div class="form-group">
                            <label for="description">Descripción</label>
                            <textarea id="description" class="input-field" placeholder="Descripción de la comunidad" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="tags">Etiquetas</label>
                            <input type="text" id="tags" class="input-field" placeholder="Etiquetas separadas por coma" />
                        </div>
                        <div class="form-group">
                            <label for="image">Imagen</label>
                            <input type="file" id="image" class="input-field" accept="image/*" />
                        </div>
                        <button type="submit" class="submit-button">Crear</button>
                    </form>
                </div>
            </div>
        `;
    }

    #addEventListeners() {
        const modal = this.shadowRoot.querySelector('.modal');
        const closeModal = this.shadowRoot.querySelector('.close-modal');
        const form = this.shadowRoot.querySelector('#create-community-form');

        this.addEventListener('open-modal', () => {
            modal.style.display = 'flex';
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.#crearComunidad();
        });
    }

    #crearComunidad(){
        const modal = this.shadowRoot.querySelector('.modal');
        if (this.session) {
            const name = this.shadowRoot.querySelector('#name').value;
            const description = this.shadowRoot.querySelector('#description').value;
            const tagsData = this.shadowRoot.querySelector('#tags').value;
            const tags = tagsData.split(',').map(tag => tag.trim());
            const image = this.shadowRoot.querySelector('#image').files[0];

            const comunidad = new Comunidad(name, description, tags, image);
            if (Validador.validarComunidad(comunidad)) {
                subirImagen(image)
                    .then(url => {
                        comunidad.imagen = url;
                        return ComunidadService.crearComunidad(comunidad, this.session.token);
                    })
                    .then(comunidad => {
                        const comunidadUsuario = new ComunidadUsuario(this.session.usuario._id, comunidad._id, "");
                        return ComunidadUsuarioService.agregarAdminAComunidad(comunidadUsuario, this.session.token);
                    })
                    .then(comunidadUsuarioData => {
                        if (comunidadUsuarioData) {
                            //Mandar evento para que se actualicen las comunidades del usuario
                            alert('Comunidad creada correctamente');
                        } else {
                            alert('Ha ocurrido un error al crear la comunidad');
                        }
                        this.shadowRoot.querySelector('#name').value = '';
                        this.shadowRoot.querySelector('#description').value = '';
                        this.shadowRoot.querySelector('#tags').value = '';
                        this.shadowRoot.querySelector('#image').value = '';
                        modal.style.display = 'none';
                    })
                    .catch(error => {
                        console.log(error);
                        alert('Ha ocurrido un error al crear la comunidad');
                        modal.style.display = 'none';
                    });
            } else {
                alert('Ingrese todos los campos');
            }
        } else {
            alert('Inicie sesión para crear una comunidad');
        }
    }

    #addStyles(shadow) {
        const style = document.createElement("style");
        style.textContent = `
            .modal {
                display: none; 
            }
        `;
        shadow.appendChild(style);

        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/modalcommunity/modalcommunity.component.css");
        shadow.appendChild(link);
    }

}