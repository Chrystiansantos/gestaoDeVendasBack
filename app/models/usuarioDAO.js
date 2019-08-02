const crypto = require('crypto');
const objectId = require('mongodb').ObjectId;
function UsuarioDao(connection) {
    this._connection = connection();
}
UsuarioDao.prototype.inserirUsuario = function (usuario) {
    var promiseInserirUsuario = new Promise((resolve, reject) => {
        this._connection.open(function (err, mongoClient) {
            mongoClient.collection('usuarios', function (err, collection) {
                var senhaCriptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');
                usuario.senha = senhaCriptografada;
                var loginExistente = false;
                collection.find().toArray(function (err, result) {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].login == usuario.login) { loginExistente = true }
                    }
                    if (loginExistente == true) {
                        reject({ msg: 'Usuario existente', status: 'erro' })
                    } else {
                        collection.insert(usuario, (err, result) => {
                            err ? reject({ erro: "Ocorreu um erro ao salvar", status: "erro" }) : resolve({ msg: "Usuario inserido com sucesso", status: "Ok" });
                        });
                    }
                    mongoClient.close();
                })
            })
        })
    })
    return promiseInserirUsuario;
}
UsuarioDao.prototype.autenticar = function (dadosUsuario, req) {
    var promiseAutenticar = new Promise((resolve, reject) => {
        this._connection.open((err, mongoClient) => {
            dadosUsuario.senha = crypto.createHash('md5').update(dadosUsuario.senha).digest('hex');
            mongoClient.collection('usuarios', (err, collection) => {
                collection.find({ login: { $eq: dadosUsuario.login }, senha: { $eq: dadosUsuario.senha } }).toArray((err, result) => {
                    if (err) {
                        reject({ msg: "Ocorreu um erro", status: "erro" })
                    } else {
                        if (result) {
                            if (result[0] != undefined) {
                                req.session.autorizado = true;
                                req.session.usuario = result[0].login;
                                req.session.nome = result[0].nome;
                                resolve({ msg: 'Usuario logado', logado: req.session.autorizado, status: "ok" })
                            }
                        }
                    }
                    (result.length < 1) ? reject({ msg: 'Usuarion invalido ou inexistente', status: 'erro' }) : ''
                })
                mongoClient.close();
            })
        })
    })
    return promiseAutenticar;
}
UsuarioDao.prototype.deletarUsuario = function (dadosUsuario) {
    var promiseDeletarUsuario = new Promise((resolve, reject) => {
        this._connection.open(function (err, mongoClient) {
            mongoClient.collection('usuarios', function (err, collection) {
                collection.remove({ _id: objectId(dadosUsuario.id) }, function (err, result) {
                    (err != null) ? reject({ msg: "Falha ao deletar usuario", status: 'erro' }) : resolve({ msg: "Usuario deletado com sucesso !", status: "ok" });
                })
                mongoClient.close();
            })
        })
    })
    return promiseDeletarUsuario;
}
UsuarioDao.prototype.getUsuarios = function () {
    var promiseGetUsuarios = new Promise((resolve, reject) => {
        this._connection.open(function (err, mongoClient) {
            mongoClient.collection('usuarios', function (err, collection) {
                collection.find().toArray(function (err, result) {
                    for (var i = 0; i < result.length; i++) {
                        delete result[i].senha;
                    }
                    (err == null) ? resolve(result) : reject(err);
                })
            })
            mongoClient.close();
        })
    })
    return promiseGetUsuarios;
}
UsuarioDao.prototype.updateUsuario = function (dadosUsuario) {
    var promiseUpdate = new Promise((resolve, reject) => {
        this._connection.open(function (err, mongoClient) {
            mongoClient.collection('usuarios', (err, collection) => {
                collection.update({ _id: objectId(dadosUsuario.id) }, {
                    $set: {
                        nome: dadosUsuario.nome,
                        cpf: dadosUsuario.cpf,
                        login: dadosUsuario.login,
                        telefone: dadosUsuario.telefone
                    }
                }, (err, result) => {
                    (err == null) ? resolve({ msg: "Usuario alterado com sucesso !", status: "ok" }) : reject(err)
                })
            })
            mongoClient.close();
        })
    })
    return promiseUpdate;
}
module.exports = () => {
    return UsuarioDao;
}