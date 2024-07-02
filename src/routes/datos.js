const express = require('express');
const path  = require('path');

const datosController = require('../controllers/datosController');

const router = express.Router()

router.get('/create', datosController.create)
router.post('/create', datosController.store)

module.exports = router;