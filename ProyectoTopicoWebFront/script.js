import { HeaderComponent } from "./src/components/header/header.component.js";
import { LeftbarComponent } from "./src/components/leftbar/leftbar.component.js";
import { HomePage } from "./src/pages/home/home.page.js";
import { PostsComponent } from "./src/components/posts/posts.component.js";
import { PostComponent } from "./src/components/post/post.component.js";
import { CommentComponent } from "./src/components/comment/comment.component.js";
import { PrincipalComponent } from "./src/components/principal/principal.component.js";
import { RightbarComponent } from "./src/components/rightbar/rightbar.component.js";
import { ComunidadPage } from "./src/pages/community/community.page.js";
import { LoginComponent } from "./src/components/login/login.component.js";
import { LoginPage } from "./src/pages/login/login.page.js";
import { RegisterComponent } from "./src/components/register/register.component.js";
import { RegisterPage } from "./src/pages/register/register.page.js";

document.addEventListener('DOMContentLoaded', () => {
    //Configuracion de Rutas
    page('/', () => showContent('app-home'));
    page('/comunidad', () => showContent('app-comunidad'));
    page('*', () => showContent('app-home'));
    //Para entrar aquí tienes que poner en el navegador: http://localhost:5000/login
    page('/login', () => showContent('app-login'));
    //Inicializar nuestro router
    page();
});

function showContent(contentId){
    const contentContainer = document.getElementById('content');
    contentContainer.innerHTML = `<${contentId}></${contentId}>`;
}

//components
window.customElements.define('app-header', HeaderComponent);
window.customElements.define('app-leftbar', LeftbarComponent);
window.customElements.define('app-rightbar', RightbarComponent);
window.customElements.define('app-posts', PostsComponent);
window.customElements.define('app-post', PostComponent);
window.customElements.define('app-comment', CommentComponent);
window.customElements.define('app-principal', PrincipalComponent);
window.customElements.define('app-logincomp', LoginComponent);
window.customElements.define('app-registercomp', RegisterComponent);
//pages
window.customElements.define('app-home', HomePage);
window.customElements.define('app-comunidad', ComunidadPage);
window.customElements.define('app-login', LoginPage);
window.customElements.define('app-register', RegisterPage);