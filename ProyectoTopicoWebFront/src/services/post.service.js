
import { postsData } from '../data/postsData.js';
const API_URL = 'http://localhost:3000/';
const URL_COMUNIDADES = 'api/resenas/';

export class PostService {

    static crearPost(post, token) {
        return fetch(`${API_URL}${URL_COMUNIDADES}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(post)
        }).then(response => response.json())
            .then(data => data);
    }

    static obtenerPostPorId(postId) {
        return fetch(`${API_URL}${URL_COMUNIDADES}${postId}`, {
            method: 'GET'
        }).then(response => response.json())
            .then(data => data);
    }

    static obtenerPostsFiltro(limit = 10, offset = 0, filtro = '') {
        return fetch(`${API_URL}${URL_COMUNIDADES}query?filtroContenido=${filtro}&limit=${limit}&offset=${offset}`, {
            method: 'GET'
        }).then(response => {
            return response.ok ? response.json() : [];
        });
    }

    static obtenerDePelicula(idPelicula, limit, offset) {
        return fetch(`${API_URL}${URL_COMUNIDADES}/idPelicula=${idPelicula}/query?limit=${limit}&offset=${offset}`, {
            method: 'GET'
        }).then(response => response.json())
            .then(data => data);

    }

    static eliminarResena(idResena, token) {
        return fetch(`${API_URL}${URL_COMUNIDADES}${idResena}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`
            }
        }).then(response => response.json())
            .then(data => data);
    }

    static obtenerResenasComunidad(idComunidad, limit, offset, sortBy, sortOrder) {
        return fetch(`${API_URL}${URL_COMUNIDADES}idComunidad=${idComunidad}/comunidad/query?limit=${limit}&offset=${offset}&sortBy=${sortBy}&sortOrder=${sortOrder}`, {
            method: 'GET'
        }).then(response => {
            return response.ok ? response.json() : [];
        });
    }

    static likeResena(idResena, idUsuario) {

        return fetch(`${API_URL}${URL_COMUNIDADES}${idResena}/like/${idUsuario}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => data);
    }
    static dislikeResena(idResena, idUsuario) {

        return fetch(`${API_URL}${URL_COMUNIDADES}${idResena}/dislike/${idUsuario}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => data);
    }

    static getPosts() {
        return Array.isArray(postsData) ? postsData : [];
    }

    static getPostById(postId) {
        // HACER PETICION A LA API
        return postsData.find(post => post.id === postId);
    }


}