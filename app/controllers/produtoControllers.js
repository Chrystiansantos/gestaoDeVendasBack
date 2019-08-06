class produtoController {
    inserirProduto(app, req, res) {
        var dadosProduto = req.body;
        req.assert('qtd', 'Quantidade deve ser preenchida maior que 1').notEmpty();
        req.assert('marca', 'Marca deve ser preenchido').notEmpty();
        req.assert('modelo', 'Modelo deve ser preenchido').notEmpty();
        req.assert('tamanho', 'Tamanho deve ser preenchido').notEmpty();
        req.assert('cor', 'Cor deve ser preenchida').notEmpty();
        req.assert('codigo', 'codigo deve ser preenchido').notEmpty();
        req.assert('preco', 'Preço deve ser preenchido').notEmpty();
        req.assert('descricao', "Descriçao deve ser preenchida").notEmpty();

        erros = req.validationErrors();
        if (erros) {
            res.json({ erros: erros })
        } else {
            var connection = app.config.dbConnection;
            var produtoDao = new app.app.models.produtoDAO(connection)
            var produtoCadastrado = produtoDao.inserirProduto(dadosProduto);
            produtoCadastrado.then((result) => {
                res.json({ msg: "Produto cadastrado com sucesso !", status: "ok" })
            }).catch((err) => {
                res.json(err);
            })
        }
    }
    retornarProdutos(app, req, res) {
        var connection = app.config.dbConnection;
        var produtosDao = new app.app.models.produtoDAO(connection);
        var getProdutos = produtosDao.getProdutos();
        getProdutos.then(result => { res.json(result) }).catch(err => { res.json(err) })
    }
    deletarProduto(app, req, res) {
        var dadosForm = req.body;
        req.assert('id', 'Id nao pode ser vazio').notEmpty();
        var erros = req.validationErrors();
        if (erros) {
            res.json(erros)
        } else {
            var connection = app.config.dbConnection;
            var produtoDao = new app.app.models.produtoDAO(connection)
            var produtoDeletado = produtoDao.deletarProduto(dadosForm);
            produtoDeletado.then(result => { res.json(result) }).catch(err => { res.json(err) })
        }
    }
    atualizarProduto(app, req, res) {
        var dadosProduto = req.body;
        req.assert('qtd', 'Quantidade deve ser preenchida maior que 1').notEmpty();
        req.assert('marca', 'Marca deve ser preenchido').notEmpty();
        req.assert('modelo', 'Modelo deve ser preenchido').notEmpty();
        req.assert('tamanho', 'Tamanho deve ser preenchido').notEmpty();
        req.assert('cor', 'Cor deve ser preenchida').notEmpty();
        req.assert('codigo', 'codigo deve ser preenchido').notEmpty();
        req.assert('preco', 'Preço deve ser preenchido').notEmpty();
        req.assert('descricao', "Descriçao deve ser preenchida").notEmpty();
        var erros = req.validationErrors();
        if (erros) {
            res.json({ erros: erros });
        } else {
            var connection = app.config.dbConnection;
            var produtosDao = new app.app.models.produtoDAO(connection);
            var produtoAlterado = produtosDao.alterarProduto(dadosProduto);
            produtoAlterado.then(result => { res.json(result) }).catch(err => { res.json(err) })
        }
    }
}
module.exports = () => {
    return new produtoController;
}