const objectId = require('mongodb').ObjectId;
class Cliente {
    constructor(connection) {
        this.connection = connection();
    }
    cadastrarCliente(dadosCliente) {
        var promiseCadastrarCliente = new Promise((resolve, reject) => {
            this.connection.open(function (err, mongoClient) {
                mongoClient.collection('clientes', (err, collection) => {
                    collection.insert(dadosCliente, (err, result) => {
                        (err != null) ? reject(err) : resolve({ msg: 'Cliente inserido com sucesso !', status: "Ok" });
                    })
                })
                mongoClient.close();
            })
        })
        return promiseCadastrarCliente;
    }
    retornarClientes() {
        var promiseGetClientes = new Promise((resolve, reject) => {
            this.connection.open(function (err, mongoClient) {
                mongoClient.collection('clientes', (err, collection) => {
                    collection.find().toArray((err, result) => {
                        (err != null) ? reject(err) : resolve(result);
                    })
                })
            })
        })
        return promiseGetClientes;
    }
    deletarCliente(dadosCliente) {
        var promiseDeletarUsuario = new Promise((resolve, reject) => {
            this.connection.open(function (err, mongoClient) {
                mongoClient.collection('clientes', (err, collection) => {
                    collection.remove({ _id: objectId(dadosCliente) }, (err, result) => {
                        (err != null) ? reject(err) : resolve({ msg: "Usuario deletado com sucesso !", status: "ok" })
                    })
                    mongoClient.close()
                })
            })
        })
        return promiseDeletarUsuario;
    }
}
module.exports = () => {
    return Cliente;
} 