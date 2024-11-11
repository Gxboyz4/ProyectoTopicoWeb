
export class PostformComponent extends HTMLElement {
    constructor() {
        super();
    }
    
    async connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#addStyles(shadow);
        this.#render(shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="postform">
                <div class="container">
                    <div class="post">
                        <h3>Comparte tu crítica</h3>
                        <div class="critica">
                            <textarea id="critica" placeholder="Escribe tu crítica aquí"></textarea>
                        </div>
                        <div class="pelicula">
                            <input type="text" id="pelicula" placeholder="Añadir película">
                        </div>
                        <div class="publicar">
                            <img src="src/assets/icons/LikeIcon.svg" alt="icono-calificacion">
                            <div class="details">
                                <label for="calificacion">Califica la película</label>
                                <input type="number" id="calificacion" name="calificacion" min="0" max="10" placeholder="0-10">
                                <button>Publicar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/postform/postform.component.css");
        shadow.appendChild(link);
    }

}