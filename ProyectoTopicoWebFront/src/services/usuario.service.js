//por hacer

import {usuariosData} from '../data/usuarioData.js';

const API_URL = 'http://localhost:3000/api/usuarios';

export class UsuarioService {
    static getUsuarios(){
        // HACER PETICION A LA API
        let allUsuarios = [];
        usuariosData.forEach(usuario => {
            allUsuarios = allUsuarios.concat(usuario);
        });
        return allUsuarios;
    }

    static getUsuarioById(usuarioId) {
        const usuario = usuariosData.find(usuario => usuario.id === Number(usuarioId));
        return usuario;
    }

    static registrarUsuario(usuario){
        return fetch(`${API_URL}`, {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.status === 200 ? response.json() : null);
    }

    static iniciarSesion(usuario){
        return fetch(`${API_URL}/iniciarSesion`, {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.status === 200 ? response.json() : null);
    }

    static obtenerUsuarioPorId(idUsuario){
        return fetch(`${API_URL}/info/${idUsuario}`, {
            method: 'GET'
        }).then(response => {
            return response.ok ? response.json() : null;
        });
    }

    static getLikes(idUsuario, token){
        return fetch(`${API_URL}/${idUsuario}`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(response => response.json())
        .then(data => data);
    }
}