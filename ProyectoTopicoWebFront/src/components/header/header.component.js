import { SessionStorageService } from "../../utils/sessionStorageService.service.js";
import { ComunidadService } from "../../services/comunidad.service.js";
import { Crypto } from "../../utils/Crypto.js";

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
       
        //Modal para mensajes 
        this.modal = document.createElement('modal-message');
        document.body.appendChild(this.modal);
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
                        <input id='search-input' type="text" placeholder="Buscar comunidades..." />
                    </div>
                    <ul class="search-results" id="search-results"></ul>
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
            </div>
            `;
        }
    }

    #cargarComunidadesporBusqueda(busqueda){
        return new Promise((resolve, reject) => {
            ComunidadService.getComunidadesPorBusqueda(busqueda)
            .then(comunidades => {
                resolve(comunidades);
            }).catch(error => {
                reject([]);
            });
        });
    }

    #renderSearchResults(comunidades = [], shadow) {
            const searchResults = shadow.querySelector("#search-results");
            const limitedResults = comunidades.slice(0, 5);
    
        searchResults.innerHTML = limitedResults
            .map(comunidad => `<li data-id="${comunidad._id}">${comunidad.nombre}</li>`)
            .join("");
    
        const items = searchResults.querySelectorAll("li");
        items.forEach(item => {
            item.addEventListener("click", () => {
                ComunidadService.obtenerComunidadPorId(item.getAttribute('data-id'))
                    .then(comunidad => {
                        if (comunidad) {
                        console.log("entró...")
                        page(`/comunidad?comunidad=${Crypto.encryptData(comunidad)}`);
                        } else {
                        alert('No se ha encontrado la comunidad');
                        }
                  }).catch((error) => {
                    alert('No se ha encontrado la comunidad');
                  });
            });
        });
    }

    #addEventListeners(shadow) {
        const userInfo = shadow.querySelector('.user-info');
        const dropdownMenu = shadow.querySelector('.dropdown-menu');
        const settingsLink = shadow.querySelector('a[href="/settings"]');
        const loginLink = shadow.querySelector('a[href="/login"]');
        const searchInput = shadow.querySelector("#search-input");
        const searchResults = shadow.querySelector("#search-results");
        const crearComunidad = shadow.querySelector('.crear-comunidad');
        const login = shadow.querySelector('.login');
        const logo = shadow.querySelector('.logo');

        logo.addEventListener('click', () => {
            page('/');
        });

        crearComunidad.addEventListener('click', () => {
            const modal = shadow.querySelector('app-modalcommunity');
            if(this.session===null){
                this.modal.title = 'Inicia sesión';
                this.modal.message = 'Inicia sesión para crear una comunidad';
                this.modal.open();
            }else{
                modal.dispatchEvent(new CustomEvent('open-modal'));
            }
        });

        searchInput.addEventListener("input", (event) => {
            const query = event.target.value.trim().toLowerCase();
            if (query.length > 0) {
                this.#cargarComunidadesporBusqueda(query)
                .then(comunidades => {
                    if(comunidades.length === 0){
                        searchResults.innerHTML = "";
                        searchResults.style.display = "none";
                        return;
                    }
                    searchResults.innerHTML = "";
                    searchResults.style.display = "block";
                    this.#renderSearchResults(comunidades, shadow);
                })
                .catch(error => {
                    console.log(error);
                    searchResults.innerHTML = "";
                    searchResults.style.display = "none";
                });

            } else {
                searchResults.innerHTML = "";
                searchResults.style.display = "none";
            }
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