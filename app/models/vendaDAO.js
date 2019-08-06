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
                            result.toArray((err, result) => {
                                if (err != null) {
                                    reject(err);
                                } else {
                                    var produto = result;
                                    if (produto[0].qtd < dadosCompra.qtd) {
                                        reject({ msg: 'Nao há produtos suficientes', status: 'err' });
                                    } else {
                                        mongoCliente.collection('clientes', (err, collection) => {
                                            collection.update({
                                                _id: { $eq: objectId(dadosCompra.idCliente) }
                                            }, {
                                                    $push: {
                                                        compras: {
                                                            _id: new objectId(),
                                                            qtd: parseInt(dadosCompra.qtd),
                                                            marca: produto[0].marca,
                                                            modelo: produto[0].modelo,
                                                            tamanho: parseInt(produto[0].tamanho),
                                                            cor: produto[0].cor,
                                                            preco: parseFloat(produto[0].preco),
                                                            total: produto[0].preco * dadosCompra.qtd
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
                                                                    $set: { qtd: parseInt(produto[0].qtd - dadosCompra.qtd) }
                                                                }, (err, result) => {
                                                                    (err != null) ? reject(err) : resolve({ msg: "Venda cadastrada com sucesso !", status: "ok" })
                                                                })
                                                        })
                                                    }
                                                })
                                        })
                                    }
                                }
                            })
                        }
                    })
                    mongoCliente.close();
                })
            })
        })
        return promiseCadastrarVenda;
    }
    deletarVenda(dadosCompra) {
        var promiseDeletarVenda = new Promise((resolve, reject) => {
            this.connection.open(function (err, mongoCliente) {
                mongoCliente.collection('clientes', (err, collection) => {
                    collection.update({
                        _id: objectId(dadosCompra.idCliente)
                    }, {
                            $pull: {
                                pagamento: { _id: objectId(dadosCompra.idCompra) }
                            }
                        }, (err, result) => {
                            (err != null) ? reject(err) : resolve({ msg: 'Compra deletada sucesso !', status: 'ok' })
                        })
                    mongoCliente.close();
                })
            })
        })
    }    /*                      collection.update({
                        _id: objectId(dadosPagamento.idCliente)
                    }, {
                            $pull: { pagamento: { _id: objectId(dadosPagamento.idPagamento) } }
                        }, (err, result) => {
                            (err != null) ? reject(err) : resolve({ msg: 'Pagamento deletado com sucesso !', status: 'ok' })
                        });
                    mongoCliente.close();
                })
            })
        })*/
}
module.exports = () => {
    return VendaDao;
}