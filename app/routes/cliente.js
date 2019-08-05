module.exports = (app) => {
    app.post('/cliente', (req, res) => {
        req.session.autorizado ? app.app.controllers.clienteControllers.cadastrarCliente(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false })
    })
    app.get('/cliente', (req, res) => {
        req.session.autorizado ? app.app.controllers.clienteControllers.retornarClientes(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false })
    })
    app.delete('/cliente', (req, res) => {
        req.session.autorizado ? app.app.controllers.clienteControllers.deletarCliente(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false })
    })
    app.put('/cliente', (req, res) => {
        req.session.autorizado ? app.app.controllers.clienteControllers.alterarClientes(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false })
    })
}