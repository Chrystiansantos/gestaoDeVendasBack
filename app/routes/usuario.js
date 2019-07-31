module.exports = (app) => {
    app.get('/usuario', (req, res) => {
        res.send('retornar usuario')
    })
    app.post('/usuario', (req, res) => {
        app.app.controllers.usuarioControllers.cadastrarUsuario(app, req, res)
    })
}