const express = require('express');
const ResenaController = require('../controllers/resenaController');
const { model } = require('mongoose');
const router = express.Router();
const validateJWT = require('../utils/validateJWT');

router.post('/',validateJWT, ResenaController.crearResena);
router.get('/:idResena', ResenaController.obtenerResenaPorID);
router.get('/query', ResenaController.obtenerResenaFiltro);
router.get('/pelicula/:idPelicula', ResenaController.obtenerResenasDePelicula);
router.get('/:idComunidad/comunidad', ResenaController.obtenerResenasDeComunidad);
router.delete('/:idResena',validateJWT, ResenaController.eliminarResena);
router.patch('/:idResena/like',validateJWT, ResenaController.darLikeResena);
router.patch('/:idResena/dislike',validateJWT, ResenaController.quitarLikeResena);

router.post('/:idResena/comentario',validateJWT, ResenaController.agregarComentarioAResena);
router.delete('/:idResena/comentario/:idComentario',validateJWT, ResenaController.eliminarComentarioDeResena);
router.get('/:idResena/comentario', ResenaController.obtenerComentariosDeResena);



module.exports = router;