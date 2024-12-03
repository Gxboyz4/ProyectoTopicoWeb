const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const { model } = require('mongoose');
const router = express.Router();
const validateJWT = require('../utils/validateJWT');

router.post('/', UsuarioController.crearUsuario);
router.post('/iniciarSesion', UsuarioController.iniciarSesion);
router.get('/:id',validateJWT, UsuarioController.obtenerPublicacionesLikeadas);
router.get('/info/:id', UsuarioController.obtenerUsuarioPorId);
router.put('/:id', validateJWT,UsuarioController.actualizarUsuarioPorId);


module.exports = router;