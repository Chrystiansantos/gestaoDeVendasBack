const objectId = require('mongodb').ObjectId;
class ProdutoDAO {
    constructor(connection) {
        this.connection = connection();
    }
    inserirProduto(produto) {
        var promiseInserirProduto = new Promise((resolve, reject) => {
            this.connection.open(function (err, mongoClient) {
                mongoClient.collection('produtos', (err, collection) => {
                    collection.insert(produto, (err, result) => {
                        (err != null) ? reject(err) : resolve({ msg: 'Dados cadastrado com sucesso !', status: "ok" });
                    })
                })
                mongoClient.close();
            })
        })
        return promiseInserirProduto;
    }
    getProdutos() {
        var promiseGetProdutos = new Promise((resolve, reject) => {
            this.connection.open(function (err, mongoClient) {
                mongoClient.collection('produtos', (err, collection) => {
                    collection.find().toArray((err, result) => {
                        (err != null) ? reject(err) : resolve(result)
                    })
                })
                mongoClient.close();
            })
        })
        return promiseGetProdutos;
    }
    deletarProduto(dadosProduto) {
        var promiseDeletarProduto = new Promise((resolve, reject) => {
            this.connection.open(function (err, mongoClient) {
                mongoClient.collection('produtos', function (err, collection) {
                    collection.remove({ _id: objectId(dadosProduto.id) }, function (err, result) {
                        (err == null) ? resolve({ msg: "Produto deletado com sucesso !", status: "ok" }) : reject({ msg: "Falha ao deletar usuario", status: 'erro' });
                    })
                    mongoClient.close();
                })
            })
        })
        return promiseDeletarProduto;
    }
    alterarProduto(produto) {
        var promiseUpdateProduto = new Promise((resolve, reject) => {
            this.connection.open(function (err, mongoClient) {
                mongoClient.collection('produtos', (err, collection) => {
                    collection.update({ _id: objectId(produto.id) }, {
                        $set: {
                            qtd: produto.qtd,
                            marca: produto.marca,
                            modelo: produto.modelo,
                            tamanho: produto.tamanho,
                            cor: produto.cor,
                            codigo: produto.codigo,
                            preco: produto.preco,
                            descricao: produto.descricao,
                        }
                    }, (err, result) => {
                        (err == null) ? resolve({ msg: "Produto alterado com sucesso !", status: "ok" }) : reject(err)
                    })
                    mongoClient.close();
                })
            })
        })
        return promiseUpdateProduto;
    }
}
module.exports = () => {
    return ProdutoDAO;
}