module.exports = (app) => {

    app.post('/pagamento', (req, res) => {
        req.session.autorizado ? app.app.controllers.pagamentoControllers.cadastrarPagamento(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false });
    })
    app.delete('/pagamento', (req, res) => {
        req.session.autorizado ? app.app.controllers.pagamentoControllers.deletarPagamento(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false });
    })
    app.put('/pagamento', (req, res) => {
        //req.session.autorizado ? app.app.controllers.pagamentoControllers.alterarPagamento(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false });
        app.app.controllers.pagamentoControllers.alterarPagamento(app, req, res);
    })
}