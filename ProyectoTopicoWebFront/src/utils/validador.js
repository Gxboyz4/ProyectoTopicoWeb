export default class Validador {
    static validarComunidad(comunidad) {
        const { nombre, descripcion, etiquetas, imagen } = comunidad;
        return !(!nombre.trim() || !descripcion.trim() || etiquetas.every(tag => !tag.trim()) || (!imagen) || etiquetas.length < 1);
    }

    static validarUsuario(usuario) {
        const { nombre, correo, contrasena, avatar } = usuario;
        return !(!nombre.trim() || !correo.trim() || !contrasena.trim() || !avatar || !avatar.trim());
    }

    static validarUsuarioActualizar(usuario) {
        const { nombre, correo, contrasena, avatar } = usuario;
        return !(!nombre.trim() || !correo.trim() || !avatar || !avatar.trim());
    }

    static validarDatosLogin(usuario) {
        const {correo, contrasena} = usuario;
        return !(!correo.trim() || !contrasena.trim());
    }

    static validarDatosPost(contenido, calificacion, pelicula) {
        if (!contenido.trim() || !pelicula.trim() || !calificacion.trim()) {
            return false;
        }
        const calificacionNumero = Number(calificacion);
        if (isNaN(calificacionNumero) || calificacionNumero < 0 || calificacionNumero > 10) {
            return false;
        }
        return true;
    }
}
