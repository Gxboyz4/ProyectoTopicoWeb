export class LoginComponent extends HTMLElement {
    constructor() {
        super();
        this.showPassword = false; 
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#addStyles(shadow);
        this.#render(shadow);
        this.#addEventListeners(shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="login-container">
                <div class="login-box">
                 <div class="close-button" id="close-login">X</div>
                    <img src="../src/assets/images/logo.png" alt="Logo" class="logo-image" />
                    <h2 class="login-title">Iniciar Sesión</h2>
                    
                    <div class="input-group">
                        <div class="input-wrapper">
                            <input id="email" type="text" placeholder="Correo" class="input-field" />
                        </div>
                    </div>
                    
                    <div class="input-group">
                        <div class="input-wrapper">
                            <input id="password" type="password" placeholder="Contraseña" class="password-input" />
                            <img src="/src/assets/icons/ShowPassWordIcon.svg" alt="Mostrar contraseña" class="toggle-password" />
                        </div>
                    </div>
                    
                    <button class="login-button" id="login-button">Entrar</button>
                </div>
            </div>
        `;
    }

    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/login/login.component.css");
        shadow.appendChild(link);
    }

    #addEventListeners(shadow) {
        const passwordInput = shadow.querySelector(".password-input");
        const togglePassword = shadow.querySelector(".toggle-password");
        
        togglePassword.addEventListener("click", () => {
            this.showPassword = !this.showPassword;
            passwordInput.type = this.showPassword ? "text" : "password";
            togglePassword.src = this.showPassword 
                ? "/src/assets/icons/HidePasswordIcon.svg"
                : "/src/assets/icons/ShowPassWordIcon.svg";
        });

        const closeButton = shadow.querySelector("#close-login");

        closeButton.addEventListener("click", () => {
        window.location.href = '/'; //URL
        });

        const loginButton = shadow.querySelector("#login-button");
        loginButton.addEventListener("click", () => {
            window.location.href = '/'; 
            });
    }
}
