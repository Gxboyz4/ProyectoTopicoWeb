export class Header extends HTMLElement {
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
          <div class="header">
    <div class="left-section">
        <div class="logo">
            <img src="../src/assets/images/logo.png" alt="Logo" class="logo-image" />
            <span class="site-name">Tamazine</span>
        </div>
        <div class="search-bar">
            <input type="text" placeholder="Escribe algo..." />
        </div>
    </div>
    <div class="user-info">
        <img src="../src/assets/profileimages/user.png" alt="Usuario" class="user-image" />
        <span class="username">???</span>
    </div>
</div>
`
;
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/header/header.component.css");
        shadow.appendChild(link);
    }
}
