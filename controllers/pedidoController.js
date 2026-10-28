const pedidoService = require('../services/pedidoService');

function criar(req, res) {
    try {
        const pedido = pedidoService.criar(req.body);
        
        return res.status(201).json(pedido);

    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

function atualizar(req, res) {
    try { 
        const pedidoAtualizado = pedidoService.atualizar(req.params.id, req.body.status);
        return res.status(200).json(pedidoAtualizado);

    } catch (error) {
        if (error.message === 'Pedido não encontrado.') {
            return res.status(404).json({ erro: error.message });
        }
        return res.status(400).json({ erro: error.message });
    }
}

function listar(req, res) {
    try {
        const pedidos = pedidoService.listar();
        return res.status(200).json(pedidos);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno ao listar pedidos.' });
    }
}
function listarPorId(req, res) {
    try {
        const pedido = pedidoService.listar(req.params.id);
        if (!pedido) {
            return res.status(404).json({ erro: 'Pedido não encontrado.' });
        }
        return res.status(200).json(pedido);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno ao buscar pedido.' });
    }
}

module.exports = { criar, atualizar, listar, listarPorId };