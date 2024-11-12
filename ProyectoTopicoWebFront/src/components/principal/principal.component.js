

export class PrincipalComponent extends HTMLElement {

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
        shadow.innerHTML += `
            <div class="home">
                <app-posts></app-posts>
            </div>
        `;
    }

}