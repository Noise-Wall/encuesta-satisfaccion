const express = require('express')
const router = express.Router()

// controller
const responderController = require('../controllers/responder')

router.get('/', responderController.info)
router.get('/datos', responderController.datosUsuario)
router.get('/encuesta/:id', responderController.form)
router.post('/datos/subir', responderController.subirUsuario)

module.exports = router