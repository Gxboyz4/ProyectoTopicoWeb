const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const { model } = require('mongoose');
const router = express.Router();

router.post('/', UsuarioController.crearUsuario);
router.post('/iniciarSesion', UsuarioController.iniciarSesion);
router.get('/:id', UsuarioController.obtenerPublicacionesLikeadas);

module.exports = router;