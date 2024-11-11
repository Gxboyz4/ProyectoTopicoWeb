

// import { Comentario } from '../models/comentario.model';
import { postsData } from '../data/postsData.js';

export class ComentarioService {

    static getComentarios(){
        // HACER PETICION A LA API
        let allComentarios = [];
        postsData.forEach(post => {
            allComentarios = allComentarios.concat(post.comentarios);
        });
        return allComentarios;
    }

    static getComentariosByPostId(postId){
        // HACER PETICION A LA API
        const post = postsData.find(post => post.id === postId);
        return post ? post.comentarios : [];
    }

    
}