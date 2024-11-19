
import { SessionStorageService } from "../../utils/sessionStorageService.service.js";

export class CardCommunityComponent extends HTMLElement {
    constructor() {
        super();
        
    }
    
    async connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.comunidad = SessionStorageService.getItem('comunidadSeleccionada');
        console.log("comunidad seleccionada: "+ this.comunidad.nombre);
        //const id = this.getAttribute('id');
        //this.comunidad = await ComunidadService.obtenerComunidadPorId(id);
        //console.log(this.comunidad);
        this.#addStyles(shadow);
        this.#render(shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="infocommunity">
                <div class="container">
                    <div class="community">
                        <div class="communityInfo">
                            <img src=${this.comunidad.imagen} alt="imagen-comunidad">
                            <div class="details">
                                <span class="groupName">${this.comunidad.nombre} </span>
                                <span class="groupName">${this.comunidad.descripcion} </span>
                            </div>
                        </div>
                        <div class="buttons">
                            <button class="buttonUnirse">Unirse</button>
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