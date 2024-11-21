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
import { CardCommunityComponent } from "./src/components/cardcommunity/cardcommunity.component.js";
import { ComunityComponent } from "./src/components/community/community.component.js";
import { CommunityTopics } from "./src/pages/communitytopics/communitytopics.page.js";
import { PostformComponent } from "./src/components/postform/postform.component.js";
import { SettingsComponent } from "./src/components/settings/settings.component.js";
import { SettingsPage } from "./src/pages/settings/settings.page.js";
import { ModalCommunityComponent } from "./src/components/modalcommunity/modalcommunity.component.js";
import { ModalMessage } from "./src/components/modalmessage/modalmessage.component.js";
import { UnirseComponent } from "./src/components/unirse/unirse.component.js";
document.addEventListener('DOMContentLoaded', () => {
    //Configuracion de Rutas
    page('/', () => showContent('app-home'));
    //page('/', () => showContent('app-home'));
    page('/comunidad', () => showContent('app-comunidad'));
    page('/comunidad/:id', (context) => {
        const id = context.params.id;
        showContent(`app-comunity id="${id}"`);
    });
    page('/login', () => showContent('app-login'));
    page('/register', () => showContent('app-register'));
    page('/comunidadtopics', () => showContent('app-comunidadtopics'));
    page('/settings', () => showContent('app-settings'));
    page('/genero/:genero', (context) => {
        const genero = context.params.genero;
        showContent(`app-comunidadtopics genero="${genero}"`);
    });
    page('*', () => {
        showContent('app-home');
    });
    //Inicializar nuestro router
    page();
});

function showContent(contentId){
    const contentContainer = document.getElementById('content');
    contentContainer.innerHTML = '';
    contentContainer.innerHTML = `<${contentId}></${contentId}>`;
    window.scrollTo(0, 0);
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
window.customElements.define('app-comunity', ComunityComponent);
window.customElements.define('app-cardcommunity', CardCommunityComponent);
window.customElements.define('app-postform', PostformComponent);
window.customElements.define('app-settingscomp', SettingsComponent);
window.customElements.define('app-modalcommunity', ModalCommunityComponent);
window.customElements.define('modal-message', ModalMessage);
window.customElements.define('app-unirse', UnirseComponent);

//pages
window.customElements.define('app-home', HomePage);
window.customElements.define('app-comunidad', ComunidadPage);
window.customElements.define('app-login', LoginPage);
window.customElements.define('app-register', RegisterPage);
window.customElements.define('app-comunidadtopics', CommunityTopics);
window.customElements.define('app-settings', SettingsPage);
