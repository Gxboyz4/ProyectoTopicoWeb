import { ComunidadService } from "../../services/comunidad.service.js";

export class RightbarComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
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
    const comunidadesRecomendadas = ComunidadService.getComunidadesRecomendadas();
    shadow.innerHTML += `
            
        <div class="rightBar">
            <div class="container">
              <div class="item">
                <span>Comunidades Sugeridas</span>
                ${this.#renderComunidadesRecomendadas(comunidadesRecomendadas)}
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
  }

  #renderComunidadesRecomendadas(comunidades) {
    if (comunidades.length === 0) return '<p>No hay ninguna comunidad</p>';
    return `
        ${comunidades.map(comunidad => `
          <div class="comunidad">
            <div class="comunidadInfo">
              <img src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" alt=""/>
              <span>${comunidad.nombre}</span>
            </div>
          </div>`).join('')}
      `;

  }



}