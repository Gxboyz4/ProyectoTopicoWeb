export class ComunidadTopics extends HTMLElement {
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
        link.setAttribute("href", "../src/pages/communitytopics/communitytopicis.page.css");
        shadow.appendChild(link);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="layout">
                <div class="content" style="display: flex;">
                    <div style="flex: 11; display: flex;" class="main-content">
                    
                        <div style="flex: 6;" class="app-comunidad">
                        <h2>Comunidad de ...(proximamente)</h2>
                        <app-cardcommunity id=1></app-cardcommunity>
                        <app-cardcommunity id=2></app-cardcommunity>
                        <app-cardcommunity id=3></app-cardcommunity>
                        <app-cardcommunity id=4></app-cardcommunity>
                         
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