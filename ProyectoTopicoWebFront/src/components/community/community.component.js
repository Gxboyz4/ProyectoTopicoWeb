
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
        const urlParams = new URLSearchParams(window.location.search);
        const comunidadId = urlParams.get('id');
        shadow.innerHTML += `
            <div class="home">
                <app-cardcommunity id="${comunidadId}"></app-cardcommunity>
                <app-postform></app-postform>
                <app-posts></app-posts>
            </div>
        `;
    }

}