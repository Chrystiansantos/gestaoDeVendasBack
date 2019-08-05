const objectId = require('mongodb').ObjectId;
const fs = require('fs');
class ClienteDao {
    constructor(connection) {
        this.connection = connection();
    }
    cadastrarCliente(dadosCliente, pathImagem) {
        var promiseCadastrarCliente = new Promise((resolve, reject) => {
            let date = new Date();
            let time_Stamp = date.getTime();
            let urlImagen = dadosCliente.nome + '_' + time_Stamp;
            let path_origem = pathImagem;
            let path_destino = './app/imagem_clientes/' + urlImagen;
            fs.rename(path_origem, path_destino, (err) => {
                if (err) {
                    reject(err)
                } else {
                    dadosCliente.urlImagen = urlImagen;
                    this.connection.open(function (err, mongoClient) {
                        mongoClient.collection('clientes', (err, collection) => {
                            collection.insert(dadosCliente, (err, result) => {
                                (err != null) ? reject(err) : resolve({ msg: 'Cliente inserido com sucesso !', status: "Ok" });
                            })
                        })
                        mongoClient.close();
                    })
                }
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
                            cep: dadosCliente.cep
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