const express = require('express');
const ComunidadUsuarioController = require('../controllers/comunidadUsuarioController');
const router = express.Router();
const { model } = require('mongoose');

router.post  ('/comunidadUsuario/', ComunidadUsuarioController.agregarUsuarioAComunidad);
router.put  ('/comunidadUsuario/query', ComunidadUsuarioController.cambiarRolUsuario);
router.get   ('/comunidadUsuario/:idComunidad', ComunidadUsuarioController.obtenerUsuariosDeComunidad);

module.exports = router;