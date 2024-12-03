

import { SessionStorageService } from "../../utils/sessionStorageService.service.js";
import { PostService } from "../../services/post.service.js";
export class ModalConfirmation extends HTMLElement {
    constructor() {
        super();
        this.postId = null; 
    }

    static get observedAttributes() {
        return ['post-id']; 
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'post-id') {
            this.postId = newValue; 
        }
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.session = SessionStorageService.getItem('session');
        this.#addStyles(shadow);
        this.#render(shadow);
        this.#addEventListeners();
    }

    #render(shadow) {
        shadow.innerHTML += `
            <dialog id="confirmation">
                <h2>Confirmación</h2>
                <p>¿Estás seguro que deseas eliminar la reseña?</p>
                <button id="confirm" >Confirmar</button>
                <button id="cancel" >Cancelar</button>
                <button id="close-dialog" aria-label="close" class="x">❌</button>
            </dialog>
        `;
    }

    open() {
        this.shadowRoot.querySelector('#confirmation').showModal();
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/modalconfirmation/modalconfirmation.component.css");
        shadow.appendChild(link);
    }

    #addEventListeners() {
        const closeButton = this.shadowRoot.querySelector('#close-dialog');
        closeButton.addEventListener('click', () => {
            this.shadowRoot.querySelector('#confirmation').close();
        });
        const cancelButton = this.shadowRoot.querySelector('#cancel');
        cancelButton.addEventListener('click', ()=>{
            this.shadowRoot.querySelector('#confirmation').close();
        });
        const confirmButton = this.shadowRoot.querySelector('#confirm');
        confirmButton.addEventListener('click', async ()=>{
            await this.#deletePost();
            this.shadowRoot.querySelector('#confirmation').close();
            document.dispatchEvent(new CustomEvent('eliminar-post', { bubbles: true, composed: true, detail: this.postId  }));
        });
    }

    async #deletePost() {
        const token = this.session.token;
        if (!this.postId) {
            console.error('No se recibió el ID del post');
            return;
        }
        try {
            await PostService.eliminarResena(this.postId, token);
        } catch (error) {
            console.error('Error al eliminar el post:', error);
        }
    }
}