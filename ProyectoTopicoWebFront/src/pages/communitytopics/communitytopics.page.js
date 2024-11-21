import { ComunidadService } from "../../services/comunidad.service.js";

export class CommunityTopics extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.genero = this.getAttribute("genero");
        this.#initialize(shadow);
    }

    
    async #initialize(shadow) {
        this.#addStyles(shadow);
        this.#renderLayout(shadow);
        await this.#loadComunidades(shadow);
    }

   
    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/pages/communitytopics/communitytopics.page.css");
        shadow.appendChild(link);
    }

  
    #renderLayout(shadow) {
        shadow.innerHTML += `
            <div class="layout">
                <app-header></app-header>
                <div class="content" style="display: flex;">
                    <div style="flex: 11; display: flex;" class="main-content">
                        <div style="flex: 2;" class="app-leftbar">
                            <app-leftbar></app-leftbar>
                        </div>
                        <div style="flex: 6;" class="app-comunidad">
                            <h2 class="tituloComunidad">Comunidades sobre ${this.genero}</h2>
                            <div class="comunidades-list"></div>
                        </div>
                        <div style="flex: 3;" class="app-rightbar">
                            <app-rightbar></app-rightbar>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

  
    async #loadComunidades(shadow) {
        try {
            const comunidades = await ComunidadService.getComunidadesPorEtiqueta(this.genero);
            console.log("Comunidades:", comunidades);
            this.#renderComunidades(shadow, comunidades);
        } catch (error) {
            console.error("Error al cargar comunidades:", error);
            this.#renderError(shadow);
        }
    }

   
    #renderComunidades(shadow, comunidades) {
        const comunidadesList = shadow.querySelector(".comunidades-list");

        if (comunidades && comunidades.length > 0) {
            comunidades.forEach((comunidad) => {
                const card = document.createElement("app-cardcommunity");
                card.setAttribute("id", comunidad._id); 
                card.setAttribute("nombre", comunidad.nombre);
                card.setAttribute("descripcion", comunidad.descripcion);
                card.setAttribute("imagen", comunidad.imagen);
                comunidadesList.appendChild(card);
            });
        } else {
            comunidadesList.innerHTML = `<p>No se encontraron comunidades para esta etiqueta.</p>`;
        }
    }

    #renderError(shadow) {
        const comunidadesList = shadow.querySelector(".comunidades-list");
        comunidadesList.innerHTML = `<p>Ocurrió un error al cargar las comunidades. Por favor, intenta de nuevo más tarde.</p>`;
    }
}
