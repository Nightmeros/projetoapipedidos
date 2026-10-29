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

    test('Deve lançar erro se o cliente for vazio', () => {
        const dados = { cliente: "   ", tipo: "entrega", valor: 100, prioridade: "normal" };
        
        expect(() => {
            pedidoService.criar(dados);
        }).toThrow("Cliente é obrigatório e não pode ser vazio."); 
    });

    test('Deve lançar erro se o tipo for inválido', () => {
        const dados = { cliente: "João", tipo: "invalido", valor: 100, prioridade: "alta" };
        
        expect(() => {
            pedidoService.criar(dados);
        }).toThrow("Tipo inválido");
    });

    test('Deve atualizar o status de um pedido existente', () => {
        const pedidoCriado = pedidoService.criar({
            cliente: "Maria", tipo: "entrega", valor: 50, prioridade: "alta"
        });
        
        const pedidoAtualizado = pedidoService.atualizar(pedidoCriado.id, "enviado");
        
        expect(pedidoAtualizado.status).toBe("enviado");
    });

    test('Deve lançar erro ao atualizar para um status inválido', () => {
        const pedidoCriado = pedidoService.criar({
            cliente: "José", tipo: "retirada", valor: 80, prioridade: "baixa"
        });
        
        expect(() => {
            pedidoService.atualizar(pedidoCriado.id, "status_louco");
        }).toThrow("Status inválido");
    });

   
});