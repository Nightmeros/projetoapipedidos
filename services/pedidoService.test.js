// services/pedidoService.test.js
const pedidoService = require('./pedidoService');

describe('Suíte de Testes - Serviço de Pedidos', () => {
    
    test('Deve criar um pedido válido com sucesso', () => {
        const dados = {
            cliente: "Carlos Silva",
            tipo: "entrega",
            valor: 350,
            prioridade: "normal"
        };
        
        const pedido = pedidoService.criar(dados);
        
        expect(pedido).toHaveProperty('id');
        expect(pedido.cliente).toBe("Carlos Silva");
        expect(pedido.status).toBe("recebido");
    });

   
});