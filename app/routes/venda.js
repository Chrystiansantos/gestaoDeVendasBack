module.exports = (app) => {
    app.post('/venda', (req, res) => {
        //req.session.autorizado ? app.app.controllers.vendaController.cadastrarVenda(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false });
        app.app.controllers.vendaControllers.cadastrarVenda(app, req, res)
    });
    app.delete('/venda', (req, res) => {
        //req.session.autorizado ? app.app.controllers.vendaControllers.deletarVenda(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false });
        app.app.controllers.vendaControllers.deletarVenda(app, req, res)
    });
} 