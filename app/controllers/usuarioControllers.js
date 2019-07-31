const validadorCpf = require('./cpfValidador');
module.exports.cadastrarUsuario = (app, req, resp) => {
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
        erros.push({ msg: "Por favor, informe um cpf valido !" });
    }
    if (erros) {
        req.validationErrors() ? erros = erros.concat(req.validationErrors()) : '';
    }

    if (erros.length > 0) {
        resp.json({ erros: erros });
        return;
    } else {
        var connection = app.config.dbConnection;
        var usuarioDao = new app.app.models.usuarioDAO(connection);
        usuarioDao.inserirUsuario(dadosUsuario, resp);
    }
}