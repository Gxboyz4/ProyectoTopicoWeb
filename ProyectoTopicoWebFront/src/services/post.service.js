
import { postsData } from '../data/postsData.js';
const API_URL = 'http://localhost:3000/';
const URL_RESENAS = 'api/resenas/';

export class PostService {

    static crearPost(post, token) {
        return fetch(`${API_URL}${URL_RESENAS}`, {
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
        return fetch(`${API_URL}${URL_RESENAS}${postId}`, {
            method: 'GET'
        }).then(response => response.json())
            .then(data => data);
    }

    static obtenerPostsFiltro(limit = 10, offset = 0, filtro = '') {
        return fetch(`${API_URL}${URL_RESENAS}query?filtroContenido=${filtro}&limit=${limit}&offset=${offset}`, {
            method: 'GET'
        }).then(response => {
            return response.ok ? response.json() : [];
        });
    }

    static obtenerDePelicula(idPelicula, limit, offset) {
        return fetch(`${API_URL}${URL_RESENAS}/idPelicula=${idPelicula}/query?limit=${limit}&offset=${offset}`, {
            method: 'GET'
        }).then(response => response.json())
            .then(data => data);

    }

    static eliminarResena(idResena, token) {
        return fetch(`${API_URL}${URL_RESENAS}${idResena}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`
            }
        }).then(response => response.json())
            .then(data => data);
    }

    static obtenerResenasComunidad(idComunidad, limit = 10, offset = 0, sortBy = 'fecha_creacion', sortOrder = 'desc') {
        return fetch(`${API_URL}${URL_RESENAS}${idComunidad}/comunidad?limit=${limit}&offset=${offset}&sortBy=${sortBy}&sortOrder=${sortOrder}`, {
            method: 'GET'
        }).then(response => {
            return response.ok ? response.json() : [];
        });
    }

    static likeResena(idResena, idUsuario, token) {

        return fetch(`${API_URL}${URL_RESENAS}${idResena}/like/${idUsuario}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
        }).then(response => response.json())
            .then(data => data);
    }
    
    static dislikeResena(idResena, idUsuario, token) {

        return fetch(`${API_URL}${URL_RESENAS}${idResena}/dislike/${idUsuario}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
        }).then(response => response.json())
            .then(data => data);
    }

    static obtenerResenasPopulares(likes,limit = 10, offset = 0) {
        return fetch(`${API_URL}${URL_RESENAS}popular?likes=${likes}&limit=${limit}&offset=${offset}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.ok ? response.json() : [];
        });
    }

    static getPosts() {
        return Array.isArray(postsData) ? postsData : [];
    }

    static getPostById(postId) {
        // HACER PETICION A LA API
        return postsData.find(post => post.id === postId);
    }



}