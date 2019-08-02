const validadorCpf = require('./cpfValidador');

module.exports.cadastrarUsuario = (app, req, res) => {
    var dadosUsuario = req.body;
    req.assert('login', 'Login nao pode ser vazio').notEmpty();
    req.assert('login', 'Login deve conter mais de 5 caracters').isLength({ min: 5 });
    req.assert('nome', 'Nome nao pode ser vazio').notEmpty();
    req.assert('nome', 'Nome deve ter mais de 3 caracters').isLength({ min: 3 });
    req.assert('cpf', "Verifique os digitos").notEmpty().isLength({ min: 11 });
    req.assert('senha', "Senha deve conter mais de 8 digitos").isLength({ min: 8 });
    req.assert('senha', 'Senha nao pode ser vazio').notEmpty();
    req.assert('telefone', "Verifique o numero inserido").notEmpty().isLength({ min: 11 });
    var erros = [];
    if (!validadorCpf.validarCpf(req.body.cpf)) {
        erros.push({ msg: "Por favor, informe um cpf valido !", value: req.body.cpf });
    }
    if (erros) {
        req.validationErrors() ? erros = erros.concat(req.validationErrors()) : '';
    }

    if (erros.length > 0) {
        res.json({ erros: erros });
    } else {
        var connection = app.config.dbConnection;
        var usuarioDao = new app.app.models.usuarioDAO(connection);
        var usuarioCadastrado = usuarioDao.inserirUsuario(dadosUsuario);
        usuarioCadastrado.then((result) => {
            res.json(result);
        }).catch(err => { res.json(err) })
    }
}
module.exports.autenticar = (app, req, res) => {
    let dadosUsuario = req.body;
    req.assert('login', 'Login nao pode ser vazio').notEmpty();
    req.assert('login', 'Login deve conter mais de 5 caracters').isLength({ min: 5 });
    req.assert('senha', "Senha deve conter mais de 8 digitos").isLength({ min: 8 });
    req.assert('senha', 'Senha nao pode ser vazio').notEmpty();
    var erros = req.validationErrors();
    if (erros) {
        res.json(erros)
    } else {
        var connection = app.config.dbConnection;
        var usuarioDao = new app.app.models.usuarioDAO(connection);
        var usuarioAutenticado = usuarioDao.autenticar(dadosUsuario, req)
        usuarioAutenticado.then((result) => {
            res.json(result)
        }).catch((err) => {
            res.json(err)
        });
    }
}
module.exports.deletarUsuario = (app, req, res) => {
    let dadosUsuario = req.body;
    req.assert('id', 'Id nao pode ser nulo').notEmpty();
    var erros = req.validationErrors();
    if (erros) {
        res.json({ erro: erros })
    } else {
        var connection = app.config.dbConnection;
        var usuarioDao = new app.app.models.usuarioDAO(connection);
        var usuarioDeletar = usuarioDao.deletarUsuario(dadosUsuario);
        usuarioDeletar.then((result) => { res.json(result) }).catch(err => { res.json(err) })
    }
}
module.exports.getUsuarios = (app, req, res) => {
    var connection = app.config.dbConnection;
    var usuarioDao = new app.app.models.usuarioDAO(connection);
    var usuarios = usuarioDao.getUsuarios();
    usuarios.then(result => { res.json(result) }).catch(err => { res.json() })
}
module.exports.updateUsuario = (app, req, res) => {
    var dadosUsuario = req.body;
    req.assert('id', 'Id nao pode ser nulo').notEmpty();
    req.assert('login', 'Login nao pode ser vazio e deve conter acima de 5 caracters').notEmpty().isLength({ min: 5 });
    req.assert('cpf', 'Cpf nao pode ser vazio e deve conter 11 caracters sendo apenas numeros').notEmpty().isLength({ min: 11 }).isNumeric();
    req.assert('nome', 'Nome deve conter mais de 3 digitos e nao pode ser vazio').notEmpty().isLength({ min: 3 });
    req.assert('telefone', "Telefone deve conter 11 digitos e nao pode ser nulo").notEmpty().isLength({ min: 11, max: 11 }).isNumeric();
    var erros = [];
    if (!validadorCpf.validarCpf(dadosUsuario.cpf)) {
        erros.push({ msg: "Por favor, informe um cpf valido !", value: dadosUsuario.cpf });
    }
    if (erros) {
        req.validationErrors() ? erros = erros.concat(req.validationErrors()) : '';
    }
    if (erros.length > 0) {
        res.json({ erros: erros })
    } else {
        var connection = app.config.dbConnection;
        var usuarioDao = new app.app.models.usuarioDAO(connection);
        var usuarioDao = usuarioDao.updateUsuario(dadosUsuario);
        usuarioDao.then((result) => { res.json(result) }).catch(err => { res.json(err) });
    }
}