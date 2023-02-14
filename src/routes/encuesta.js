const express = require('express')
const router = express.Router()

// controller
const encuestaController = require('../controllers/encuesta')

router.get('/', encuestaController.list)
router.post('/agregar', encuestaController.add)
router.get('/quitar/:id', encuestaController.remove)

module.exports = router