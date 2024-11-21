export class ModalMessage extends HTMLElement {

    constructor() {
        super();
        this._title = '';
        this._message = '';
    }

   
    set message(msg) {
        this._message = msg;
        const pElement = this.shadowRoot.querySelector('p');
        if (pElement) {
            pElement.textContent = msg;
        }
    }

    set title(msg) {
        this._title = msg;
        const h2Element = this.shadowRoot.querySelector('h2');
        if (h2Element) {
            h2Element.textContent = msg;
        }
    }


    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#addStyles(shadow);
        this.#render(shadow);
        this.#addEventListeners();
    }

    #render(shadow) {
        shadow.innerHTML += `
            <dialog id="dialog">
                <h2>${this._title}</h2>
                <p>${this._message}</p>
                <button id="close-dialog" aria-label="close" class="x">❌</button>
            </dialog>
        `;
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/modalmessage/modalmessage.component.css");
        shadow.appendChild(link);
    }


    #addEventListeners() {
        const closeButton = this.shadowRoot.querySelector('#close-dialog');
        closeButton.addEventListener('click', () => {
            this.shadowRoot.querySelector('#dialog').close();
        });
    }

    open() {
        this.shadowRoot.querySelector('#dialog').showModal();
    }
}