//por hacer

import {usuariosData} from '../data/usuarioData.js';

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
}