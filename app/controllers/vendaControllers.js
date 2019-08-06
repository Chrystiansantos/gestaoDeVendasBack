class vendaController {
    cadastrarVenda(app, req, res) {
        var dadosCompra = req.body;
        /*vou passar id do cliente, id do produto e quantidade que o cliente deseja e no dao irei 
        fazer a busca no banco e inserir os dados*/
        req.assert('idCliente', 'Selecione um cliente').notEmpty();
        req.assert('idProduto', 'Selecione um produto').notEmpty();
        req.assert('qtd', 'Informe a quantidade do produto').notEmpty();
        var erros = req.validationErrors();
        if (erros) {
            res.json(erros)
        } else {
            var connection = app.config.dbConnection;
            var vendaDao = new app.app.models.vendaDAO(connection);
            var vendaCadastrada = vendaDao.cadastrarVenda(dadosCompra);
            vendaCadastrada.then(result => { res.json(result) }).catch(err => { res.json(err) })
        }
    }
    deletarVenda(app, req, res) {
        var dadosVenda = req.body;
        req.assert('idCliente', 'Informe o id do cliente').notEmpty();
        req.assert('idVenda', 'Informe o id da venda').notEmpty();
        var erros = req.validationErrors();
        if (erros) {
            res.json(erros);
        } else {
            var connection = app.config.dbConnection;
            var vendaDao = new app.app.models.vendaDAO(connection);
            var vendaDeletada = vendaDao.deletarVenda(dadosVenda);
            vendaDeletada.then(result => { res.json(result) }).catch(err => { res.json(err) })
        }
    }
}
module.exports = () => {
    return new vendaController;
}