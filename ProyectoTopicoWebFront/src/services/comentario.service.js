

// import { Comentario } from '../models/comentario.model';
import { postsData } from '../data/postsData.js';
const API_URL = 'http://localhost:3000/';
const URL_COMUNIDADES = 'api/resenas/';

export class ComentarioService {

    static crearComentario(comentario, token,idResena,usuario) {
        return fetch(`${API_URL}${URL_COMUNIDADES}${idResena}/comentario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({comentario,usuario})
        }).then(response => response.json())
          .then(data => data);
    }

    static eliminarComentario(idComentario, token, idResena) {
        return fetch(`${API_URL}${URL_COMUNIDADES}${idResena}/comentario/${idComentario}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`
            }
        }).then(response => response.json())
          .then(data => data);
    }

    static getComentarioById(idResena){
        return fetch(`${API_URL}${URL_COMUNIDADES}${idResena}/comentario`, {
            method: 'GET'
        }).then(response => response.json())
            .then(data => data);
    }

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