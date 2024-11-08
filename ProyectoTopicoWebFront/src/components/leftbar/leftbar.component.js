
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
            <div class="item">
                <span>${genero}</span>
            </div>
        `).join('');
    }


    //CAMBIAR ESTO CUANDO YA MANEJEMOS LAS RUTAS
    #attachEvents(shadow) {
        const popularItem = shadow.querySelector("#popularItem");
        const popularIcon = shadow.querySelector("#popularIcon");

        const homeItem = shadow.querySelector("#homeItem");
        homeItem.classList.add('active')
        const homeIcon = shadow.querySelector("#homeIcon");
        homeIcon.src = "/src/assets/icons/HomeIconSelected.svg";

        this.#addClickEvent(popularItem, popularIcon, "/src/assets/icons/PopularIconSelected.svg");
        this.#addClickEvent(homeItem, homeIcon, "/src/assets/icons/HomeIconSelected.svg");
    }

    //CAMBIAR ESTO CUANDO YA MANEJEMOS LAS RUTAS
    #addClickEvent(item, icon, selectedIconSrc) {
        item.addEventListener("click", () => {
            this.#resetItems();
            item.classList.add("active");
            icon.src = selectedIconSrc;
        });
    }

    //CAMBIAR ESTO CUANDO YA MANEJEMOS LAS RUTAS
    #resetItems() {
        const allItems = this.shadowRoot.querySelectorAll(".item");
        allItems.forEach(item => {
            item.classList.remove("active");
        });

        this.shadowRoot.querySelector("#homeIcon").src = "/src/assets/icons/HomeIcon.svg";
        this.shadowRoot.querySelector("#popularIcon").src = "/src/assets/icons/PopularIcon.svg";
    }
}

