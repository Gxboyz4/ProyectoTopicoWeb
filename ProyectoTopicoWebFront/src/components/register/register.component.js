import Validador from "../../utils/validador.js";
import { UsuarioService } from "../../services/usuario.service.js";
import { Usuario } from "../../models/usuario.js";

export class RegisterComponent extends HTMLElement {
    constructor() {
        super();
        this.selectedAvatar = null;
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#addStyles(shadow);
        this.#render(shadow);
        this.#addEventListeners(shadow);
        this.modal = document.querySelector("modal-message");
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="register-container">
                <div class="register-box">
                    <div class="close-button" id="close-register">X</div>
                    <img src="../src/assets/images/logo.png" alt="Logo" class="logo-image" />
                    <h2 class="register-title">Crear Cuenta</h2>
                    
                    <div class="input-group">
                        <div class="input-wrapper">
                            <input id="username" type="text" placeholder="Nombre de usuario" class="input-field" />
                        </div>
                    </div>
    
                    <div class="input-group">
                        <div class="input-wrapper">
                            <input id="email" type="email" placeholder="Correo" class="input-field" />
                        </div>
                    </div>
    
                    <div class="input-group">
                        <div class="input-wrapper">
                            <input id="password" type="password" placeholder="Contraseña" class="password-input" />
                            <img src="/src/assets/icons/ShowPassWordIcon.svg" alt="Mostrar contraseña" class="toggle-password" />
                        </div>
                    </div>
                    <h2 class="avatar-title">Elige tu avatar</h2>
                    <div class="input-group">
                        <div class="input-wrapper avatar-selection">
                            <p></p>
                            <div class="avatar-options">
                                <div class="avatar-option" data-avatar="avatar1">
                                    <img src="../src/assets/profileimages/avatar1.png" alt="Avatar 1" />
                                </div>
                                <div class="avatar-option" data-avatar="avatar2">
                                    <img src="../src/assets/profileimages/avatar2.png" alt="Avatar 2" />
                                </div>
                                <div class="avatar-option" data-avatar="avatar3">
                                    <img src="../src/assets/profileimages/avatar3.png" alt="Avatar 3" />
                                </div>
                                <div class="avatar-option" data-avatar="avatar3">
                                    <img src="../src/assets/profileimages/avatar4.png" alt="Avatar 3" />
                                </div>
                                <div class="avatar-option" data-avatar="avatar3">
                                    <img src="../src/assets/profileimages/avatar5.png" alt="Avatar 3" />
                                </div>
                                <div class="avatar-option" data-avatar="avatar3">
                                    <img src="../src/assets/profileimages/avatar6.png" alt="Avatar 3" />
                                </div>
                                
                            </div>
                        </div>
                    </div>
    
                    <button class="register-button">Registrarse</button>
                </div>
            </div>
        `;
    }


    #addStyles(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/components/register/register.component.css");
        shadow.appendChild(link);
    }

    #addEventListeners(shadow) {
        const passwordInput = shadow.querySelector(".password-input");
        const togglePassword = shadow.querySelector(".toggle-password");

        // Manejo de mostrar/ocultar contraseña
        togglePassword.addEventListener("click", () => {
            passwordInput.type = passwordInput.type === "password" ? "text" : "password";
            togglePassword.src = passwordInput.type === "password"
                ? "/src/assets/icons/ShowPassWordIcon.svg"
                : "/src/assets/icons/HidePasswordIcon.svg";
        });

        // Manejo de selección de avatar
        const avatarOptions = shadow.querySelectorAll(".avatar-option");
        avatarOptions.forEach(option => {
            option.addEventListener("click", (event) => {
                this.selectedAvatar = event.target.closest(".avatar-option").getAttribute("data-avatar");
                console.log("Avatar seleccionado: ", this.selectedAvatar);

                // Cambiar el estilo del avatar seleccionado
                avatarOptions.forEach(opt => opt.classList.remove("selected"));
                event.target.closest(".avatar-option").classList.add("selected");

            });
        });

        //Botón de cerrar
        const closeButton = shadow.querySelector("#close-register");
        closeButton.addEventListener("click", (event) => {
            event.preventDefault();
            page("/login");
        });
        //Botón de registrar
        const registerButton = shadow.querySelector(".register-button");
        registerButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.#registrarUsuario(shadow);
        });
    }

    #registrarUsuario(shadow) {
        const nombre = shadow.querySelector("#username").value;
        const correo = shadow.querySelector("#email").value;
        const contrasena = shadow.querySelector("#password").value;
        const avatar = this.selectedAvatar;

        const userData = new Usuario(nombre, correo, contrasena, avatar, []);

        if (Validador.validarUsuario(userData)) {
            UsuarioService.registrarUsuario(userData).then(() => {
                if (userData) {
                    this.modal.title = 'Registrado';
                    this.modal.message = 'Se ha registrado correctamente';
                    this.modal.open();
                    page("/login");
                } else {
                    this.modal.title = 'Error';
                    this.modal.message = 'Error al registrar usuario';
                    this.modal.open();
                }
            });
        } else {
            this.modal.title = 'Campos faltantes';
            this.modal.message = 'Debe completar todos los campos';
            this.modal.open();
        }
    }


}
