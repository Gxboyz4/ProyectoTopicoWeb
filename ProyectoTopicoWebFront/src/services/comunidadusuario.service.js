const API_URL = 'http://localhost:3000/api/comunidadUsuarios';
const ROL_ADMIN = "Administrador";
const ROL_USUARIO = "Usuario";

export class ComunidadUsuarioService {
    static agregarUsuarioAComunidad(comunidadUsuario, token){
        return fetch(`${API_URL}`, {
            method: 'POST',
            body: JSON.stringify(comunidadUsuario),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        }).then(response => response.json())
        .then(data => data);
    }

    static agregarAdminAComunidad(comunidadUsuario, token){
        comunidadUsuario.rol = ROL_ADMIN;
        return ComunidadUsuarioService.agregarUsuarioAComunidad(comunidadUsuario, token);
    }

    static cambiarRolUsuario(idComunidad, idUsuario, rol, token){
        return fetch(`${API_URL}/query?idComunidad=${idComunidad}&idUsuario=${idUsuario}&rol=${rol}`, {
            method: 'PUT',
            headers: {
                'Authorization': `${token}`
            }
        }).then(response => response.json())
        .then(data => data);
    }


    static obtenerResenasComunidadesUsuaario(idUsuario, token){
        return fetch (`${API_URL}/publicacionesComunidad/${idUsuario}`,{
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(response => response.json()).then(data => data);
    }
    static obtenerUsuariosDeComunidad(idComunidad, token){
        return fetch(`${API_URL}/${idComunidad}`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(response => response.json())
        .then(data => data);
    }

    static obtenerComunidadesDeUsuario(idUsuario, token){
        return fetch(`${API_URL}/usuario/${idUsuario}`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(response => {
            return response.ok ? response.json() : null;
        });
    }
    static agregarUsuarioComunidad(comunidadUsuario, token){
        comunidadUsuario.rol = ROL_USUARIO;
        return ComunidadUsuarioService.agregarUsuarioAComunidad(comunidadUsuario, token);
    }

    static buscarUsuarioEnComunidad(idComunidad, idUsuario){
        return fetch(`${API_URL}/buscar?idComunidad=${idComunidad}&idUsuario=${idUsuario}`, {
            method: 'GET'
        }).then(response => response.ok ? response.json() : null);
    }
}