export class CommunityTopics extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.genero = this.getAttribute("genero");
        this.#addStyles(shadow);
        this.#render(shadow);
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/pages/communitytopics/communitytopics.page.css");
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
                        <h2>Comunidades sobre ${this.genero}</h2>
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