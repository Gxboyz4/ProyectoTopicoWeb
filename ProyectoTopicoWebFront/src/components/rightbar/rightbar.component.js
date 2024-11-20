
import { Comunidad } from "../../models/comunidad.js";
import { ComunidadService } from "../../services/comunidad.service.js";
import { ComunidadUsuarioService } from "../../services/comunidadusuario.service.js";
import { SessionStorageService } from "../../utils/sessionStorageService.service.js";
import { Crypto } from "../../utils/Crypto.js";
import { PeliculaService } from "../../services/pelicula.service.js";

export class RightbarComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    this.session = SessionStorageService.getItem('session');
    this.#addStyles(shadow);
    this.#render(shadow);
    this.#addEventListeners(shadow);
  }

  #addStyles(shadow) {
    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "../src/components/rightbar/rightbar.component.css");
    shadow.appendChild(link);
  }

  async #render(shadow) {
    const comunidades = await this.#cargarComunidades();
    const actividadReciente = await this.#renderActividadReciente();
    shadow.innerHTML += `
      <div class="rightBar">
          <div class="container">
            <div class="item">
              <span>Mis Comunidades</span>
              ${this.#renderComunidades(comunidades)}
            </div>
            <div class="itemReciente">
              <span>Actividad Reciente</span>
              <div class="comunidad">
                  ${actividadReciente}
                <span>56 min ago</span>
            </div>

            </div>

          </div>
        </div>
      `;
    this.#addEventListeners(shadow);
  }

  async #renderActividadReciente() {
    if (this.session) {
      try {
        const resenas = await ComunidadUsuarioService.obtenerResenasComunidadesUsuaario(this.session.usuario._id, this.session.token);
        console.log(resenas);
        if (resenas && resenas.publicaciones.length > 0) {
          console.log(resenas);
          const resenasHtml = await Promise.all(resenas.publicaciones.map(async resena => {
            const urlPelicula = await this.obtenerUrlPelicula(resena.pelicula);
            const tituloPelicula = await this.obtenerTituloPelicula(resena.pelicula);
            return `
            <div class="comunidadInfo">
                <img src="${urlPelicula}" alt="Imagen comunidad"/>
                <span class= "comunidadTitulo">${tituloPelicula}</span>
                </div>
            `;
          }));
          return resenasHtml.join('');
        } else {
          return '<p>No hay actividades recientes.</p>';
        }
      } catch (error) {
        return `<p>Error al obtener las reseñas: ${error}</p>`;
      }
    } else {
      console.log("No hay sesión");
      return '<p>Inicia sesión para ver las actividades recientes</p>';
    }
  }
  

  async obtenerTituloPelicula(idPelicula) {
    try {
      const pelicula = await PeliculaService.getPeliculaPorId(idPelicula);
      return pelicula.Title;
    } catch (error) {
      console.error("Error obteniendo el título de la película:", error);
      return ''; 
    }
  }

  async obtenerUrlPelicula(idPelicula) {
    try {
      const pelicula = await PeliculaService.getPeliculaPorId(idPelicula);
      return pelicula.Poster;
    } catch (error) {
      console.error("Error obteniendo la URL de la película:", error);
      return ''; 
    }
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
    
    if (!comunidades) return `
      <p>Unete a una comunidad</p>
    `;

    if(!this.session){
      return `
        <p>Inicia sesión para ver tus comunidades</p>`
      ;
    }
    return `
        ${comunidades ? comunidades.map(comunidad => `
            <div class="comunidad">
                <div class="comunidad">
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

      addEventListener('actualizar-comunidades', () => {
        this.#cargarComunidades().then(comunidades => {
          const comunidadesContainer = shadow.querySelector('.item');
          comunidadesContainer.innerHTML = `
            <span>Mis Comunidades</span>
            ${this.#renderComunidades(comunidades)}
          `;
          this.#addEventListeners(shadow);
        });
      });

      addEventListener('cerrar-sesion', () => {

        const comunidadesContainer = shadow.querySelector('.item');
        comunidadesContainer.innerHTML = `
          <span>Mis Comunidades</span>
          <p>Inicia sesión para ver tus comunidades</p>
        `;
      
      });

      addEventListener('unirse-comunidad', () => {
        this.#cargarComunidades().then(comunidades => {
          const comunidadesContainer = shadow.querySelector('.item');
          comunidadesContainer.innerHTML = `
              <span>Mis Comunidades</span>
              ${this.#renderComunidades(comunidades)}
            `;
          this.#addEventListeners(shadow);
        });
      });
  }

}