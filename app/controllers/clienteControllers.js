const validarCpf = require('./cpfValidador');
class clienteController {
    cadastrarCliente(app, req, res) {
        var dadosCliente = req.body;
        //Validar os campos
        req.assert('nome', 'Nome nao pode ser vazio').notEmpty();
        req.assert('nome', 'Nome deve conter acima de 3 caracters').isLength({ min: 3 })
        req.assert('cpf').notEmpty();
        req.assert('cpf').isLength(({ min: 11, max: 11 }));
        req.assert('telefone', 'Telefone deve ser preenchido no formato (xx) xxxxx-xxxx').isLength({ min: 11 })
        req.assert('telefone', 'Por favor preencha o telefone').notEmpty()
        req.assert('sexo', 'Por favor selecione o sexo').notEmpty();
        req.assert('rua', 'Rua nao pode ser vazio').notEmpty();
        req.assert('rua', 'Verifique a rua').isLength({ min: 1 });
        req.assert('numero', 'Numero nao pode ser vazio').notEmpty();
        req.assert('cidade', 'Por favor verifique a cidade').notEmpty()
        req.assert('cidade', 'Cidade deve conter acima de 3 digitos').isLength({ min: 3 });
        req.assert('estado', 'Por favor verifique o estado').notEmpty()
        req.assert('cep', 'Por favor verifique o Cep').notEmpty().isLength({ min: 8, max: 8 })
        req.assert('cep', 'Cep deve conter 8 digitos').isLength({ min: 8, max: 8 })
        var erros = [];
        if (!validarCpf.validarCpf(dadosCliente.cpf)) {
            erros.push({ msg: "Por favor, informe um cpf valido !", value: req.body.cpf });
        }
        if (erros.length > 0) {
            req.validationErrors() ? erros = erros.concat(req.validationErrors()) : '';
        }
        if (erros.length > 0) {
            res.json(erros);
        } else {
            let endereçoDaImagem = req.files.img.path;
            var connection = app.config.dbConnection;
            var clienteDao = new app.app.models.clienteDAO(connection);
            var clienteCadastrado = clienteDao.cadastrarCliente(dadosCliente, endereçoDaImagem);
            clienteCadastrado.then(result => { res.json(result) }).catch(err => { res.json(err) })
        }
    }
    retornarClientes(app, req, res) {
        var connection = app.config.dbConnection;
        var clienteDao = new app.app.models.clienteDAO(connection);
        var clientesCadastrados = clienteDao.retornarClientes();
        clientesCadastrados.then(result => { res.json(result) }).catch(err => { res.json() });
    }
    deletarCliente(app, req, res) {
        var dadosCliente = req.body;
        req.assert('id', 'Por favor preencha o id').notEmpty();
        var erros = req.validationErrors();
        if (erros) {
            res.json(erros);
        } else {
            var connection = app.config.dbConnection;
            var clienteDao = new app.app.models.clienteDAO(connection);
            var clienteDeletado = clienteDao.deletarCliente(dadosCliente.id);
            clienteDeletado.then(result => { res.json(result) }).catch(err => { res.json(err) })

        }
    }
    alterarClientes(app, req, res) {
        var dadosCliente = req.body;
        req.assert('nome', 'Nome nao pode ser vazio').notEmpty();
        req.assert('nome', 'Nome deve conter acima de 3 caracters').isLength({ min: 3 })
        req.assert('telefone', 'Telefone deve ser preenchido no formato (xx) xxxxx-xxxx').isLength({ min: 11 })
        req.assert('telefone', 'Por favor preencha o telefone').notEmpty()
        req.assert('sexo', 'Por favor selecione o sexo').notEmpty();
        req.assert('rua', 'Rua nao pode ser vazio').notEmpty();
        req.assert('rua', 'Verifique a rua').isLength({ min: 1 });
        req.assert('numero', 'Numero nao pode ser vazio').notEmpty();
        req.assert('cidade', 'Por favor verifique a cidade').notEmpty()
        req.assert('cidade', 'Cidade deve conter acima de 3 digitos').isLength({ min: 3 });
        req.assert('estado', 'Por favor verifique o estado').notEmpty()
        req.assert('cep', 'Por favor verifique o Cep').notEmpty().isLength({ min: 8, max: 8 })
        req.assert('cep', 'Cep deve conter 8 digitos').isLength({ min: 8, max: 8 })
        req.assert('id', 'Por favor informe o Id').notEmpty();
        var erros = req.validationErrors();
        if (erros) {
            res.json(erros)
        } else {
            var connection = app.config.dbConnection;
            var clienteDao = new app.app.models.clienteDAO(connection);
            var atualizacaoCliente = clienteDao.atualizarCliente(dadosCliente);
            atualizacaoCliente.then(result => { res.json(result) }).catch(err => { res.json(err) })
        }
    }
}
module.exports = () => {
    return new clienteController;
}
