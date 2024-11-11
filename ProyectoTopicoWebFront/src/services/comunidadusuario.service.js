const API_URL = 'http://localhost:3000/api/comunidadUsuarios';

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

    static cambiarRolUsuario(idComunidad, idUsuario, rol, token){
        return fetch(`${API_URL}/query?idComunidad=${idComunidad}&idUsuario=${idUsuario}&rol=${rol}`, {
            method: 'PUT',
            headers: {
                'Authorization': `${token}`
            }
        }).then(response => response.json())
        .then(data => data);
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
}