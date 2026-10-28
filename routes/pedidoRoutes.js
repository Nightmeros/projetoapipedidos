const express = require('express');
const pedidoController = require('../controllers/pedidoController'); 

const router = express.Router();

router.post('/', pedidoController.criar);
router.get('/', pedidoController.listar);
router.get('/:id', pedidoController.listarPorId); 
router.patch('/:id/status', pedidoController.atualizar); 

module.exports = router;