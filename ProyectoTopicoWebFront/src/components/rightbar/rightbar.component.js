
import { Comunidad } from "../../models/comunidad.js";
import { ComunidadService } from "../../services/comunidad.service.js";
import { ComunidadUsuarioService } from "../../services/comunidadusuario.service.js";
import { SessionStorageService } from "../../utils/sessionStorageService.service.js";
import { Crypto } from "../../utils/Crypto.js";

export class RightbarComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    this.session = SessionStorageService.getItem('session');
    this.#addStyles(shadow);
    this.#render(shadow);
  }

  #addStyles(shadow) {
    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "../src/components/rightbar/rightbar.component.css");
    shadow.appendChild(link);
  }

  #render(shadow) {
    this.#cargarComunidades().then(comunidades => {
    shadow.innerHTML += `
        <div class="rightBar">
            <div class="container">
              <div class="item">
                <span>Mis Comunidades</span>
                ${this.#renderComunidades(comunidades)}
              </div>
              <div class="item">
                <span>Actividad Reciente</span>
                <div class="comunidad">
                  <div class="comunidadInfo">
                    <img
                      src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt=""
                    />
                    <p>Nueva publicación en <span>TerrorGodel</span></p>
                  </div>
                  <span>1 min ago</span>
                </div>
                <div class="comunidad">
                  <div class="comunidadInfo">
                    <img
                      src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt=""
                    />
                    <p>
                      Nueva publicación en <span>Risa</span>
                    </p>
                  </div>
                  <span>9 min ago</span>
                </div>
                <div class="comunidad">
                  <div class="comunidadInfo">
                    <img
                      src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt=""
                    />
                    <p>Nueva publicación en <span>AcciónLovers</span></p>
                  </div>
                  <span>56 min ago</span>
                </div>

              </div>

            </div>
          </div>
        `;
        this.#addEventListeners(shadow);
      });
  }

  #cargarComunidades() {
    return new Promise((resolve, reject) => {
      if (this.session) {
        ComunidadUsuarioService.obtenerComunidadesDeUsuario(this.session.usuario._id, this.session.token)
          .then(comunidades => {
            resolve(comunidades);
          })
          .catch(error => {
            const comunidadesRecomendadas = ComunidadService.getComunidadesRecomendadas();
            if (comunidadesRecomendadas === null || comunidadesRecomendadas.length === 0) {
              reject([]);
            } else {
              resolve(comunidadesRecomendadas);
            }
          });
      } else {
        resolve([]);
      }
    });
  }
  
  #renderComunidades(comunidades) {
    if (!comunidades) return '<p>No hay ninguna comunidad</p>';
    return `
        ${comunidades ? comunidades.map(comunidad => `
            <div class="comunidad">
                <div class="comunidadInfo">
                    <img src="${comunidad.imagen}" alt="Imagen comunidad"/>
                    <span class="comunidad-nombre" data-id="${comunidad._id}">${comunidad.nombre}</span>
                </div>
            </div>` ).join('') : ''}
    `;
}

#addEventListeners(shadow) {
    const comunidadNombres = this.shadowRoot.querySelectorAll('.comunidad-nombre');
    comunidadNombres.forEach(nombre => {
        nombre.addEventListener('click', (event) => {
            const comunidadId = event.target.getAttribute('data-id');
            ComunidadService.obtenerComunidadPorId(comunidadId).then(comunidad => {
              if(comunidad){  
                console.log("entró...")
              page(`/comunidad?comunidad=${Crypto.encryptData(comunidad)}`);
              }else{
                alert('No se ha encontrado la comunidad');
              }
            }).catch((error) =>{
              alert('No se ha encontrado la comunidad');
            });
        });
    });
}

}