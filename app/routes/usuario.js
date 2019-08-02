module.exports = (app) => {
    //Aqui ele ira fazer a validaçao do usuario
    app.get('/usuarioValido', (req, res) => {
        app.app.controllers.usuarioControllers.autenticar(app, req, res)
    })
    app.post('/usuario', (req, res) => {
        (req.session.autorizado) ? app.app.controllers.usuarioControllers.cadastrarUsuario(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false });
    })
    app.get('/usuario', (req, res) => {
        (req.session.autorizado) ? app.app.controllers.usuarioControllers.getUsuarios(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false })
    })
    app.delete('/usuario', (req, res) => {
        (req.session.autorizado) ? app.app.controllers.usuarioControllers.deletarUsuario(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false });
    })
    app.put('/usuario', (req, res) => {
        (req.session.autorizado) ? app.app.controllers.usuarioControllers.updateUsuario(app, req, res) : res.json({ msg: 'Usuario nao esta logado', logado: false });
    })
}