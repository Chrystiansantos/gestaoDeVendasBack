const objectId = require('mongodb').ObjectId;
function ProdutoDAO(connection) {
    this._connection = connection();
}
ProdutoDAO.prototype.inserirProduto = function (produto) {
    var promiseInserirProduto = new Promise((resolve, reject) => {
        this._connection.open(function (err, mongoClient) {
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
ProdutoDAO.prototype.getProdutos = function () {
    var promiseGetProdutos = new Promise((resolve, reject) => {
        this._connection.open(function (err, mongoClient) {
            mongoClient.collection('produtos', (err, collection) => {
                collection.find().toArray((err, result) => {
                    (err !== null) ? reject(err) : resolve(result)
                })
            })
            mongoClient.close();
        })
    })
    return promiseGetProdutos;
}
ProdutoDAO.prototype.deletarProduto = function (dadosProduto) {
    var promiseDeletarProduto = new Promise((resolve, reject) => {
        this._connection.open(function (err, mongoClient) {
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
ProdutoDAO.prototype.alterarProduto = function (produto) {
    var promiseUpdateProduto = new Promise((resolve, reject) => {
        this._connection.open(function (err, mongoClient) {
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
module.exports = () => {
    return ProdutoDAO;
}