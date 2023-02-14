const express = require('express')
const router = express.Router()

// controller
const responderController = require('../controllers/responder')

router.get('/', responderController.form)

module.exports = router