
export class HeaderComponent extends HTMLElement {
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
            <header class="header">
                <div class="left-section">
                    <div class="logo">
                        <img src="../src/assets/images/logo.png" alt="Logo" class="logo-image" />
                        <span class="site-name">Tamazine</span>
                    </div>
                </div>
                <div class="center-section">
                    <div class="search-bar">
                        <img src="/src/assets/icons/SearchIcon.svg" alt="searchicon">
                        <input type="text" placeholder="Buscar..." />
                    </div>
                </div>
                <div class="right-section">
                    <div class="user-info">
                        <img src="https://picsum.photos/200" alt="Usuario" class="user-image" />
                        <span class="username">???</span>
                    </div>
                </div>
                
            </header>
        `;
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/header/header.component.css");
        shadow.appendChild(link);
    }
}
