const objectId = require('mongodb').ObjectId;
class ClienteDao {
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
    deletarCliente(IdDeletar) {
        var promiseDeletarUsuario = new Promise((resolve, reject) => {
            this.connection.open(function (err, mongoClient) {
                mongoClient.collection('clientes', (err, collection) => {
                    collection.remove({ _id: objectId(IdDeletar) }, (err, result) => {
                        (err != null) ? reject(err) : resolve({ msg: "Usuario deletado com sucesso !", status: "ok" })
                    })
                    mongoClient.close()
                })
            })
        })
        return promiseDeletarUsuario;
    }
    atualizarCliente(dadosCliente) {
        var promiseAtualizarCliente = new Promise((resolve, reject) => {
            this.connection.open(function (err, mongoClient) {
                mongoClient.collection('clientes', (err, collection) => {
                    collection.update({ _id: objectId(dadosCliente.id) }, {
                        $set: {
                            nome: dadosCliente.nome,
                            telefone: dadosCliente.telefone,
                            sexo: dadosCliente.sexo,
                            numero: dadosCliente.numero,
                            cidade: dadosCliente.cidade,
                            estado: dadosCliente.estado,
                            cep: dadosCliente.cep,
                            endereco:dadosCliente.rua
                        }
                    }, (err, result) => {
                        (err == null) ? resolve({ msg: "Usuario alterado com sucesso !", status: "Ok" }) : reject(err);
                    })
                    mongoClient.close();
                })
            })
        })
        return promiseAtualizarCliente;
    }
}
module.exports = () => {
    return ClienteDao;
} 