import { SessionStorageService } from "../../utils/sessionStorageService.service.js";
import { ComunidadUsuarioService } from "../../services/comunidadusuario.service.js";
import { ComunidadUsuario } from "../../models/comunidadUsuario.js";

export class UnirseComponent extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.idComunidad = this.getAttribute('idComunidad');
        this.session = SessionStorageService.getItem('session');
        this.#addStyles(shadow);
        this.#render(shadow);
        this.#addEventListeners(shadow);
    }

    #addEventListeners(shadow) {
        const buttonUnirse = shadow.querySelector('.buttonUnirse');
        if (this.session) {
            ComunidadUsuarioService.buscarUsuarioEnComunidad(this.idComunidad, this.session.usuario._id).then(usuarioEnComunidad => {
                if (!usuarioEnComunidad) {
                    buttonUnirse.style.display = 'block'; 
                }
            });
        }
        addEventListener('cerrar-sesion', () => {
            buttonUnirse.style.display = 'none';
        });
        buttonUnirse.addEventListener('click', () => {
            if(this.session){
                const comunidadUsuario = new ComunidadUsuario(this.session.usuario._id,this.idComunidad,'');
                ComunidadUsuarioService.agregarUsuarioComunidad(comunidadUsuario, this.session.token).then((dataComunidadUsuario) => {
                    buttonUnirse.style.display = 'none';
                    document.dispatchEvent(new CustomEvent('unirse-comunidad', { bubbles: true, composed: true }));
                });
            }
        });
        addEventListener('unirse-comunidad', () => {
            if (this.session) {
                ComunidadUsuarioService.buscarUsuarioEnComunidad(this.idComunidad, this.session.usuario._id).then(usuarioEnComunidad => {
                    if (!usuarioEnComunidad) {
                        buttonUnirse.style.display = 'block'; 
                    }else{
                        buttonUnirse.style.display = 'none';
                    }
                });
            }
        });
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/unirse/unirse.component.css");
        shadow.appendChild(link);
    }

    #render(shadow) {
        shadow.innerHTML += `<button class="buttonUnirse">Unirse</button>`;
    }

}