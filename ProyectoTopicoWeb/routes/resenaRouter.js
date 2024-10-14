const express = require('express');
const ResenaController = require('../controllers/resenaController');
const { model } = require('mongoose');
const router = express.Router();

router.post  ('/resena/', ResenaController.crearResena);
router.get   ('/resena/', ResenaController.obtenerResenaFiltro);
router.post  ('/resena/:idResena/comentario', ResenaController.agregarComentarioAResena);
router.delete('/resena/:idResena/comentario/:idComentario', ResenaController.eliminarComentarioDeResena);
router.get   ('/resena/pelicula', ResenaController.obtenerResenasDePelicula);
router.delete('/reseña/:idResena', ResenaController.eliminarResena);
router.get   ('/resena/comunidad', ResenaController.obtenerResenasDeComunidad);
router.patch ('/resena/:idResena/like', ResenaController.darLikeResena);
router.patch ('/resena/:idResena/dislike', ResenaController.quitarLikeResena);