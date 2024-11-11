export class SettingsPage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#addStyles(shadow);
        this.#render(shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="settings-page">
                <app-header></app-header>
                <div class="settings-content">
                    <app-settingscomp></app-settingscomps>
                </div>
            </div>
        `;
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/pages/settings/settings.page.css");
        shadow.appendChild(link);
    }
}