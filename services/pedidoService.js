const pedidos = [];
let proximoId = 0;

const pedidoService = {
	criar: function (dados) {
		if (!dados.cliente || typeof dados.cliente !== "string" || dados.cliente.trim() === "") {
			throw new Error("Cliente é obrigatório e não pode ser vazio.");
		}
		if (typeof dados.valor !== "number" || dados.valor <= 0) {
			throw new Error("O valor deve ser numérico e maior que zero.");
		}
		if (!dados.tipo || !dados.prioridade) {
			throw new Error("Tipo e prioridade são obrigatórios.");
		}
		const tiposValidos = ["entrega", "retirada"];
		if (!tiposValidos.includes(dados.tipo)) {
			throw new Error("Tipo inválido. Os tipos válidos são: entrega, retirada.");
		}

		const prioridadesValidas = ["baixa", "normal", "media", "alta", "urgente"];
		if (!prioridadesValidas.includes(dados.prioridade)) {
			throw new Error("Prioridade inválida. As prioridades válidas são: baixa, normal, media, alta, urgente.");
		}

		const novoPedido = {
			id: proximoId++,
			cliente: dados.cliente,
			tipo: dados.tipo,
			valor: dados.valor,
			prioridade: dados.prioridade,
			status: "recebido",
		};
		pedidos.push(novoPedido);
		return novoPedido;
	},

	listar: function (id) {
		if (id) {
			return pedidos.find((p) => p.id === parseInt(id)) || null;
		}
		return pedidos;
	},

	atualizar: function (id, novoStatus) {
		const pedido = pedidos.find((p) => p.id === parseInt(id));
		if (!pedido) {
			throw new Error("Pedido não encontrado.");
		}

		const statusPermitidos = ["recebido", "em_preparacao", "enviado", "entregue", "cancelado"];
		if (!statusPermitidos.includes(novoStatus)) {
			throw new Error(
				"Status inválido. Os status aceitos são: recebido, em_preparacao, enviado, entregue, cancelado.",
			);
		}

		pedido.status = novoStatus;
		return pedido;
	},
};

module.exports = pedidoService;
