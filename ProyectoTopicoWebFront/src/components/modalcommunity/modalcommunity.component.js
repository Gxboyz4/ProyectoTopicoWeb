export class ModalCommunityComponent extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#addStyles(shadow);
        this.#render(shadow);
        this.#addEventListeners();
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="modal" id="modalCrearComunidad">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Crear Comunidad</h2>
                    <form id="create-community-form">
                        <div class="form-group">
                            <label for="name">Nombre</label>
                            <input type="text" id="name" class="input-field" placeholder="Nombre de la comunidad" required />
                        </div>
                        <div class="form-group">
                            <label for="description">Descripción</label>
                            <textarea id="description" class="input-field" placeholder="Descripción de la comunidad" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="tags">Etiquetas</label>
                            <input type="text" id="tags" class="input-field" placeholder="Etiquetas separadas por coma" />
                        </div>
                        <button type="submit" class="submit-button">Crear</button>
                    </form>
                </div>
            </div>
        `;
    }

    #addEventListeners() {
        const modal = this.shadowRoot.querySelector('.modal');
        const closeModal = this.shadowRoot.querySelector('.close-modal');
        const form = this.shadowRoot.querySelector('#create-community-form');
        
        this.addEventListener('open-modal', () => {
            modal.style.display = 'flex';
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const name = this.shadowRoot.querySelector('#name').value;
            const description = this.shadowRoot.querySelector('#description').value;
            const tags = this.shadowRoot.querySelector('#tags').value;
            
            console.log(`Comunidad creada:\nNombre: ${name}\nDescripción: ${description}\nEtiquetas: ${tags}`);
            modal.style.display = 'none'; 
        });
    }

    #addStyles(shadow) {
        const style = document.createElement("style");
        style.textContent = `
            .modal {
                display: none; 
            }
        `;
        shadow.appendChild(style);

        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/modalcommunity/modalcommunity.component.css");
        shadow.appendChild(link);
    }

}