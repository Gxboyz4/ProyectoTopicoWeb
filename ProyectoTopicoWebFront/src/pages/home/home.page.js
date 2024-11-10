export class HomePage extends HTMLElement {
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
        link.setAttribute("href", "../src/pages/home/home.page.css");
        shadow.appendChild(link);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="layout">
                <div class="content" style="display: flex;">
                    <div style="flex: 9; display: flex;" class="main-content">
                        <div style="flex: 6;" class="app-principal">
                            <app-principal></app-principal>
                        </div>
                        <div style="flex: 3;" class="app-rightbar">
                            <app-rightbar></app-rightbar>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

}