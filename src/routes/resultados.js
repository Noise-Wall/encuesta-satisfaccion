const express = require('express')
const router = express.Router()

// controller
const tempController = require('../controllers/temp')

router.get('/', tempController.temp)

module.exports = router