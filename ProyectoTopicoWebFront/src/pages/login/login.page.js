export class LoginPage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#addStyles(shadow);
        this.#render(shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="login-page">
                <app-logincomp></app-logincomp>
            </div>
        `;
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/pages/login/login.page.css");
        
        shadow.appendChild(link);
    }
}

