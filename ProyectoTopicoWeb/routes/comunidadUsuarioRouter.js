const express = require('express');
const ComunidadUsuarioController = require('../controllers/comunidadUsuarioController');
const router = express.Router();
const { model } = require('mongoose');
const validateJWT = require('../utils/validateJWT');

router.post  ('/', validateJWT,ComunidadUsuarioController.agregarUsuarioAComunidad);
router.put  ('/query', validateJWT,ComunidadUsuarioController.cambiarRolUsuario);
router.get   ('/:idComunidad', validateJWT,ComunidadUsuarioController.obtenerUsuariosDeComunidad);
router.get   ('/usuario/:idUsuario', validateJWT,ComunidadUsuarioController.obtenerComunidadesPorUsuario);

module.exports = router;