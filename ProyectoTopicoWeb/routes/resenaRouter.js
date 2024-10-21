const express = require('express');
const ResenaController = require('../controllers/resenaController');
const { model } = require('mongoose');
const router = express.Router();

router.post('/', ResenaController.crearResena);
router.get('/:idResena', ResenaController.obtenerResenaPorID);
router.get('/query', ResenaController.obtenerResenaFiltro);
router.get('/pelicula/:idPelicula', ResenaController.obtenerResenasDePelicula);
router.get('/:idComunidad/comunidad', ResenaController.obtenerResenasDeComunidad);
router.delete('/:idResena', ResenaController.eliminarResena);
router.patch('/:idResena/like', ResenaController.darLikeResena);
router.patch('/:idResena/dislike', ResenaController.quitarLikeResena);

router.post('/:idResena/comentario', ResenaController.agregarComentarioAResena);
router.delete('/:idResena/comentario/:idComentario', ResenaController.eliminarComentarioDeResena);



module.exports = router;