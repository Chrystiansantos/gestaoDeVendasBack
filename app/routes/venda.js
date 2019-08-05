module.exports = (app) => {
    app.post('/venda', (req, res) => {
        //req.session.autorizado ? app.app.controllers.vendaController.cadastrarVenda(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false });
        app.app.controllers.vendaControllers.cadastrarVenda(app, req, res)
    });
    app.get('/venda', (req, res) => {
        req.session.autorizado ? app.app.controllers.vendaControllers.retornarVenda(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false });
    });
    app.put('/venda', (req, res) => {
        req.session.autorizado ? app.app.controllers.vendaControllers.alterarVenda(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false });
    });
    app.delete('/venda', (req, res) => {
        req.session.autorizado ? app.app.controllers.vendaControllers.deletarVenda(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false });
    });
} 