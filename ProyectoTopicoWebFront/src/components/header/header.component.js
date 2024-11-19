import { SessionStorageService } from "../../utils/sessionStorageService.service.js";

export class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.session = SessionStorageService.getItem('session');
        this.#addStyles(shadow);
        this.#render(shadow);
        this.#renderSession(shadow);
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
                    <div class="crear-comunidad">
                        <img src="/src/assets/icons/CrearIcon.svg" alt="communityicon">
                        <span>Crear comunidad</span>
                    </div>

                    <div class="login"></div>
                    
                    <div class="user-info">
                        <div class="dropdown-menu">
                            <a href="/settings">Configuración</a>
                            <a href="/login">Salir</a>
                        </div>
                    </div>
                </div>
            </header>

            <app-modalcommunity></app-modalcommunity>
        `;
    }

    #addStyles(shadow) {
        // Estilo por defecto mientras se carga el CSS
        const style = document.createElement("style");
        style.textContent = `
            .header {
                display: none; /* Ocultar la cabecera hasta que se cargue el CSS */
            }
        `;
        shadow.appendChild(style);
    
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/header/header.component.css");
        
        link.onload = () => {
            shadow.querySelector('.header').style.display = 'block'; // Mostrar la cabecera cuando se cargue el CSS
        };
        
        shadow.appendChild(link);
    }

    #renderSession(shadow){
        const login = shadow.querySelector('.login');
        login.innerHTML = `<span>${this.session ? "Cerrar sesión" : "Iniciar sesión"}</span>`;
        const userInfo = shadow.querySelector('.user-info');

        if (this.session) {
            userInfo.innerHTML = `
            <img src="../src/assets/profileimages/${this.session.usuario.avatar}.png" alt="Usuario" class="user-image" />
            <span class="username">${this.session.usuario.nombre}</span>
            ` + userInfo.innerHTML;
        } else {
            userInfo.innerHTML = `
            <div class="dropdown-menu">
                <a href="/settings">Configuración</a>
                <a href="/login">Salir</a>
            </div>
            `;
        }
    }

    #addEventListeners(shadow) {
        const userInfo = shadow.querySelector('.user-info');
        const dropdownMenu = shadow.querySelector('.dropdown-menu');
        const settingsLink = shadow.querySelector('a[href="/settings"]');
        const loginLink = shadow.querySelector('a[href="/login"]');
        
        const crearComunidad = shadow.querySelector('.crear-comunidad');
        const login = shadow.querySelector('.login');

        crearComunidad.addEventListener('click', () => {
            const modal = shadow.querySelector('app-modalcommunity');
            modal.dispatchEvent(new CustomEvent('open-modal'));
        });

        login.addEventListener('click', () => {
            if(this.session){
                SessionStorageService.setItem('session', null);
                this.session = null;
                this.#renderSession(shadow);
                document.dispatchEvent(new CustomEvent('cerrar-sesion', { bubbles: true, composed: true }));
            }else{
                page('/login');
            }
        });

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