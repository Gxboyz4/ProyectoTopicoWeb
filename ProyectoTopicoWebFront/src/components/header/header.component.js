export class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#addStyles(shadow);
        this.#render(shadow);
        this.#addEventListeners(shadow);
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
                        <div class="dropdown-menu">
                            <a href="/settings">Configuración</a>
                            <a href="/login">Salir</a>
                        </div>
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

    
    #addEventListeners(shadow) {
        const userInfo = shadow.querySelector('.user-info');
        const dropdownMenu = shadow.querySelector('.dropdown-menu');
        const settingsLink = shadow.querySelector('a[href="/settings"]');
        const loginLink = shadow.querySelector('a[href="/login"]');
    
        userInfo.addEventListener('click', (event) => {
            event.stopPropagation();
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
    
        document.addEventListener('click', (event) => {
            if (!shadow.contains(event.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    
        settingsLink.addEventListener('click', (event) => {
            event.preventDefault();  
            page('/settings');  
        });
    
        loginLink.addEventListener('click', (event) => {
            event.preventDefault();  
            page('/login');  
        });
    }
}