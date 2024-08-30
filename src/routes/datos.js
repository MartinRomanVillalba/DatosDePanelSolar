const express = require('express');
const path  = require('path');

const datosController = require('../controllers/datosController');

const router = express.Router()

router.get('/listadatos', datosController.index)

router.get('/create', datosController.create)
router.post('/create', datosController.store)

router.get('/detail/:fecha/:hora', datosController.detail)

router.get('/:id/edit', datosController.edit)
router.put('/:id/edit', datosController.update)

router.delete('/:id/delete', datosController.destroy)

module.exports = router;