class vendaController {
    cadastrarVenda(app, req, res) {
        var { idCliente, produtos } = req.body;
        console.log("idCliente =>", idCliente, "produtos =>", produtos, 'console na linha 4 venda controler')
        /* Aqui tenho que testar se há produtos no array */

        var connection = app.config.dbConnection;
        var vendaDao = new app.app.models.vendaDAO(connection);
        var vendaCadastrada = vendaDao.cadastrarVenda(idCliente, produtos);
        vendaCadastrada.then(result => { res.json(result) }).catch(err => { res.json(err) })
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