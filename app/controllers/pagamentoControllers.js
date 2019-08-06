class PagamentoController {
    cadastrarPagamento(app, req, res) {
        var dadosPagamento = req.body;
        req.assert('idCliente', 'Por favor informe o id do usuario').notEmpty();
        req.assert('valor', 'Por favor informe um valor').notEmpty();
        var erros = req.validationErrors();
        if (erros) {
            res.json(erros)
        } else {
            var connection = app.config.dbConnection;
            var pagamentoDAO = new app.app.models.pagamentoDAO(connection);
            var pagamentoCadastrado = pagamentoDAO.cadastrarPagamento(dadosPagamento);
            pagamentoCadastrado.then(result => { res.json(result) }).catch(err => { res.json(err) });
        }
    }
    deletarPagamento(app, req, res) {
        var dadosPagamento = req.body;
        req.assert('idCliente', 'Por favor informe o cliente').notEmpty();
        req.assert('idPagamento', 'Por favor informe o id de pagamento').notEmpty();
        var erros = req.validationErrors();
        if (erros) {
            res.json(erros)
        } else {
            var connection = app.config.dbConnection;
            var pagamentoDAO = new app.app.models.pagamentoDAO(connection);
            var pagamentoDeletado = pagamentoDAO.deletarPagamento(dadosPagamento);
            pagamentoDeletado.then(result => { res.json(result) }).catch(err => { res.json(err) })
        }
    }
}
module.exports = () => {
    return new PagamentoController;
}