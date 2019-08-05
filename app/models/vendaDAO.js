const objectId = require('mongodb').ObjectId;
class VendaDao {
    constructor(connection) {
        this.connection = connection();
    }
    cadastrarVenda(dadosCompra) {
        let promiseCadastrarVenda = new Promise((resolve, reject) => {
            this.connection.open(function (err, mongoCliente) {
                mongoCliente.collection('produtos', (err, collection) => {
                    collection.find({ _id: { $eq: objectId(dadosCompra.idProduto) } }, (err, result) => {
                        if (err != null) {
                            reject(err)
                        } else {
                            var produto = result;
                            mongoCliente.collection('clientes', (err, collection) => {
                                collection.update({
                                    _id: { $eq: objectId(dadosCompra.idCliente) }
                                }, {
                                        $push: {
                                            compras: {
                                                qtd: produto.qtd,
                                                marca: produto.marca,
                                                modelo: produto.modelo,
                                                tamanho: produto.tamanho,
                                                cor: produto.tamanho,
                                                preco: produto.preco,
                                                total: produto.preco * dadosCompra.qtd
                                            }
                                        }
                                    }, (err, result) => {
                                        if (err != null) {
                                            reject(err);
                                        } else {
                                            mongoCliente.collection('produtos', (err, collection) => {
                                                collection.update({
                                                    _id: objectId(dadosCompra.idProduto)
                                                }, {
                                                        $set: { qtd: produto.qtd - dadosCompra.qtd }
                                                    }, (err, result) => {
                                                        (err != null) ? reject(err) : resolve({ msg: "Venda cadastrada com sucesso !", status: "ok" })
                                                    })
                                            })
                                            //  mongoCliente.close();
                                        }
                                    })
                                //mongoCliente.close();
                            })
                        }
                    })
                    mongoCliente.close();
                })
            })
        })
        return promiseCadastrarVenda;
    }

}
module.exports = () => {
    return VendaDao;
}