import { ComunidadUsuarioService } from "../../services/comunidadusuario.service.js";
import { SessionStorageService } from "../../utils/sessionStorageService.service.js";

export class CardCommunityComponent extends HTMLElement {
    constructor() {
        super();

    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.id = this.getAttribute('id');
        this.nombre = this.getAttribute('nombre');
        this.descripcion = this.getAttribute('descripcion');
        this.imagen = this.getAttribute('imagen');
        this.session = SessionStorageService.getItem('session');
        this.mostrarUnirse = false;
        this.#addStyles(shadow);
        this.#render(shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="infocommunity">
                <div class="container">
                    <div class="community">
                        <div class="communityInfo">
                            <img src=${this.imagen} alt="imagen-comunidad">
                            <div class="details">
                                <span class="groupName">${this.nombre} </span>
                                <span class="groupName">${this.descripcion} </span>
                            </div>
                        </div>
                        <div class="buttons">
                            <app-unirse idComunidad="${this.id}"></app-unirse>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/cardcommunity/cardcommunity.component.css");
        shadow.appendChild(link);
    }

}