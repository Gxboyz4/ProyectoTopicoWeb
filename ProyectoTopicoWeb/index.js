const db = require('./config/db');
const UsuarioRouter = require('./routes/usuarioRouter');
const ComunidadRouter = require('./routes/comunidadRouter');
const ResenaRouter = require('./routes/resenaRouter');
const ComunidadUsuarioRouter = require('./routes/comunidadUsuarioRouter');
const express = require('express');
const app = express();
const morgan = require('morgan');
const {AppError, globalErrorHandler} = require('./utils/appError');

async function main() {
    
    try {
        await db.conectar().then(() => {
            console.log('Conectado a la base de datos');
        }).catch((error) => {
            console.error(error);
        });

        app.use(express.json());
        app.use(morgan('combined'));
        
        app.use('/api/usuarios', UsuarioRouter);
        app.use('/api/comunidades', ComunidadRouter);
        app.use('/api/resenas', ResenaRouter);
        app.use('/api/comunidadUsuarios', ComunidadUsuarioRouter);

        app.all('*', (req, res, next) => {
            const error = new AppError(`No se encontró la ruta ${req.originalUrl} en el servidor web.`, 404);
            next(error);
        });
        app.use(globalErrorHandler);
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Corriendo en el puerto ${PORT}`);
        });
        
    } catch (error) {
        console.log('Catch en main');
        console.log(error);
    }
        /*
        usuario1 = await UsuarioDAO.crearUsuario({
            nombre: 'Usuario1',
            correo: 'pablo@gmail.com',
            contrasena: 'luispablo11',
            avatar: 'avatar1'
        }).then((usuario) => {
            console.log(`Usuario creado con exito ${usuario.nombre}`);
            return usuario;
        }).catch((error) => {
            console.log('Error al crear usuario');
        });

        await UsuarioDAO.iniciarSesion({
            correo: 'pablo@gmail.com',
            contrasena: 'luispablo11'
        }).then((usuario) => {
            console.log(`Usuario logueado con exito ${usuario.correo}`);
        }).catch((error) => {
            console.log('Credenciales incorrectas');
        });

        await UsuarioDAO.obtenerPublicacionesLikeadas(usuario1._id).then(
            (resenasLikeadas) => {
                console.log(`Resenas likeadas consultadas ${resenasLikeadas}`);
            }).catch((error) => {
                console.log('Error al obtener publicaciones likeadas');
            });
        
        comunidad1 = await ComunidadDAO.crearComunidad({
            nombre: 'DisneyWorld',
            descripcion: 'Comunidad para los fan de Disney',
            etiquetas: ['Disney', 'Peliculas']
        }).then((comunidad) => {
            console.log(`Comunidad creada con exito ${comunidad.nombre}`);
            return comunidad;
        }).catch((error) => {
            console.log('Error al crear comunidad');
        });

        await ComunidadUsuarioDAO.agregarUsuarioAComunidad({
            comunidad: comunidad1._id,
            usuario: usuario1._id,
            rol: 'Miembro'}).then((comunidadUsuario) => {
                console.log(`Usuario agregado a la comunidad ${comunidadUsuario.rol}`);
            }).catch((error) => {
                console.log('Error al agregar usuario a la comunidad');
            });

        await ComunidadUsuarioDAO.cambiarRolUsuario(
            comunidad1._id,
            usuario1._id,
            'Administrador').then((comunidadUsuario) => {
                console.log(`Usuario actualizado con exito ${comunidadUsuario.rol}`);
            }).catch((error) => {
                console.log('Error al actualizar rol');
            });

        

        await ResenaDAO.obtenerResenasFiltro(10,0,'Excelente').then(
            (resenasFiltro) => {
            console.log(`Resenas consultadas con filtro con exito ${resenasFiltro}`);
        }).catch((error) => {
            console.log('Error al consultar resenas por filtro');
        });

        await ResenaDAO.agregarComentarioAResena(resena1._id, {
            usuario: usuario1._id,
            comentario: 'Totalmente de acuerdo'
        }).then((comentarioAgregado) => {
            console.log(`Comentario agregado con exito ${comentarioAgregado}`);
        }).catch((error) => {
            console.log('Error al agregar comentario');
        });

        await ResenaDAO.obtenerResenasDePelicula(10,0,'ToyStory4').then((resenasDePelicula) => {
            console.log(`Resenas de pelicula consultadas con exito ${resenasDePelicula}`);
        }).catch((error) => {
            console.log('Error al consultar resenas de pelicula');
        });

         await ComunidadUsuarioDAO.obtenerUsuariosDeComunidad('66fdf6c42826cfa3e8d7d268').then((usuariosComunidad) => {
           console.log(`Usuarios de la comunidad ${usuariosComunidad}`);
         });

         await ComunidadDAO.obtenerComunidadesFiltro(10,0,"Disney" ).then((comunidadesFiltro) => {
                    console.log(`Comunidades consultadas con exito ${comunidadesFiltro}`);
         });
        

         await ResenaDAO.obtenerResenasDeComunidad('66fdf6c42826cfa3e8d7d268').then((resenasComunidad) => 
            {console.log(`Resenas de la comunidad ${resenasComunidad}`);});
        

         await ComunidadDAO.obtenerComunidadPorId('66fdf6c42826cfa3e8d7d268').then((comunidad) => {console.log(`Comunidad: ${comunidad}`)});
        

         await ResenaDAO.eliminarComentarioDeResena('66fdf6c42826cfa3e8d7d26d', '66fdf6c42826cfa3e8d7d271').then((comentarioEliminado) => 
            {console.log(`Comentario eliminado: ${comentarioEliminado}`)});
         

         await ResenaDAO.eliminarResena(('66fdf6c42826cfa3e8d7d26d')).then((resenaEliminada) =>{console.log(`Resena eliminada: ${resenaEliminada}`)});
    
        await ResenaDAO.darLikeResena('6702e207a6fc3d5cde2a1a2f','66fdf6c42826cfa3e8d7d264').then((resenaLikeada) => {console.log(`Resena likeada: ${resenaLikeada}`)});

       
        await ResenaDAO.quitarLikeResena('6702e207a6fc3d5cde2a1a2f','66fdf6c42826cfa3e8d7d264').then((resenaLikeada) => {console.log(`Resena deslikeada: ${resenaLikeada}`)});
         

        await db.desconectar().then(() => {
            console.log('Desconectado con exito');
        }).catch(error => {
            console.log('Error al desconectar');
        });

    */

}

main()
