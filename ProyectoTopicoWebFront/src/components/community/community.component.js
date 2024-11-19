import { Crypto } from "../../utils/Crypto.js";

export class ComunityComponent extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#addStyles(shadow);
        this.#render(shadow);
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/principal/principal.component.css");
        shadow.appendChild(link);
    }

    #render(shadow) {
        setTimeout(() => {
            const urlParams = new URLSearchParams(window.location.search);
            this.comunidad = Crypto.decryptData(urlParams.get('comunidad'));
            shadow.innerHTML += `
            <div class="home">
                <app-cardcommunity nombre=${this.comunidad.nombre} descripcion=${this.comunidad.descripcion} imagen=${this.comunidad.imagen}"></app-cardcommunity>
                <app-postform idComunidad=${this.comunidad._id}></app-postform>
                <app-posts idComunidad=${this.comunidad._id}></app-posts>
            </div>
        `;}, 5); 
    }

}