

export class ComunidadPage extends HTMLElement {
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
                <app-header></app-header>
                <div class="content" style="display: flex;">
                     <div style="flex: 11; display: flex;" class="main-content">
                        <div style="flex: 2;" class="app-leftbar">
                            <app-leftbar></app-leftbar>
                        </div>
                        <div style="flex: 6;" class="app-comunidad">
                        <app-comunity></app-comunity>
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