
import { generosData } from '../../data/generosData.js';
export class LeftbarComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#addStyles(shadow);
        this.#render(shadow);
        this.#attachEvents(shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
        <div class="leftBar">
            <div class="container">
                <div class="menu">
                    <div class="item" id="homeItem">
                        <img id="homeIcon" src="/src/assets/icons/HomeIcon.svg" alt="homeicon" />
                        <span>Principal</span>
                    </div>
                    <div class="item" id="popularItem">
                        <img id="popularIcon" src="/src/assets/icons/PopularIcon.svg" alt="popularicon" />
                        <span>Popular</span>
                    </div>
                </div>
                <hr />
                <div class="menu">
                    <span>Temas</span>
                    ${this.#renderGeneros()}
                    
                </div>
                <hr />
                <div class="menu">
                    <span>Otros</span>
                    <div class="item">
                        <img src="https://picsum.photos/200" alt="" />
                        <span>Ayuda</span>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/leftbar/leftbar.component.css");
        shadow.appendChild(link);
    }

    #renderGeneros() {
        return generosData.map(genero => `
            <div class="item genero-item" data-genero="${genero}">
                <span>${genero}</span>
            </div>
        `).join('');
    }


    //CAMBIAR ESTO CUANDO YA MANEJEMOS LAS RUTAS
    #attachEvents(shadow) {

        const generoItems = shadow.querySelectorAll(".genero-item");
        generoItems.forEach(item => {
            item.addEventListener("click", () => {
                const genero = item.getAttribute("data-genero");
                item.classList.add("active");
                this.#navigateToGenero(genero);
            });
        });

        const homeItem = shadow.querySelector("#homeItem");
        homeItem.addEventListener("click", () => {
            homeItem.classList.add("active");
            page("/");
        });

        const popularItem = shadow.querySelector("#popularItem");
        popularItem.addEventListener("click", () => {
            popularItem.classList.add("active");
            page("/popular");
        });
    }


    #navigateToGenero(genero) {
        const generoRuta = `/genero/${encodeURIComponent(genero.toLowerCase())}`;
        page(generoRuta);
    }

}

