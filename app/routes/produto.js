module.exports = (app) => {

    app.post('/produtos', (req, res) => {
        req.session.autorizado ? app.app.controllers.produtoControllers.inserirProduto(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false });
    })
    app.get('/produtos', (req, res) => {
        req.session.autorizado ? app.app.controllers.produtoControllers.retornarProdutos(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false });
    })
    app.delete('/produtos', (req, res) => {
        req.session.autorizado ? app.app.controllers.produtoControllers.deletarProduto(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false });
    })
    app.put('/produtos', (req, res) => {
        req.session.autorizado ? app.app.controllers.produtoControllers.atualizarProduto(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false });
    })
}