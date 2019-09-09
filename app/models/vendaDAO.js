const objectId = require('mongodb').ObjectId;
class VendaDao {
    constructor(connection) {
        this.connection = connection();
    }

    async cadastrarVenda(produtos) {
        let promiseCadastrarVenda = new Promise((resolve, reject) => {
            this.connection.open(function (err, mongoCliente) {
                mongoCliente.collection('produtos', function (err, collection) {
                    ///aqui ele ira receber o id e fazer um find com o id do produto
                    //aqui ele ira chamaro metodo para saber se ha produtos no banco de dados
                    var promiseVerificarEstoque = await this.verificarEstoque(produtos)
                    console.log(promiseVerificarEstoque)
                })
            })
        })
        return promiseCadastrarVenda;
    }
    verificarEstoque(produtos) {
        promiseVerificaEstoque = new Promise((result, reject) => {
            this.connection.open((err, mongoCliente) => {
                mongoCliente.collection('produtos', (err, collection) => {
                    //aqui vou colocar um laço e pesquisar a quantidade
                    for (const i of produtos) {
                        collection.find({
                            _id: objectId(produto).toArray((err, result) => {
                                if (result.qtd <= produto[i].qtd) {
                                    reject({ msg: 'Produtos insuficientes', status: 'erro' })
                                }
                            })
                        })
                    }
                    resolve(true);
                })
            })
        })
        return promiseVerificaEstoque;
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
                            (err != null) ? reject(err) : resolve({ msg: 'Venda deletada sucesso !', status: 'ok' })
                        })
                    mongoCliente.close();
                })
            })
        })
        return promiseDeletarVenda;
    }
}

module.exports = () => {
    return VendaDao;
}