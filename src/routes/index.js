const express = require('express')
const router = express.Router()

// controller
const indexController = require('../controllers/index')

router.get('/', indexController.get)

module.exports = router