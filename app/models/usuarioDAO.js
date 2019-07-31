const crypto = require('crypto');
function UsuarioDao(connection) {
    this._connection = connection();
}
UsuarioDao.prototype.inserirUsuario = function (usuario, resp) {
    this._connection.open(function (err, mongoClient) {
        mongoClient.collection('usuarios', function (err, collection) {
            var senhaCriptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');
            usuario.senha = senhaCriptografada;
            var loginExistente = false;
            collection.find().toArray(function (err, result, collection) {
                for (var i = 0; i < result.length; i++) {
                    (result[i].login == usuario.login) ? this.loginExistente = true : '';
                }
                if (loginExistente) {
                    collection.insert(usuario)
                    resp.json({ msg: 'Usuario inserido com sucesso !' })
                } else {
                    resp.json({ msg: "Usuario existente" })
                }
            })
        })
        mongoClient.close();
    })
}
module.exports = () => {
    return UsuarioDao;
}