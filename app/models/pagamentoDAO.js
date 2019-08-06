const objectId = require('mongodb').ObjectId;
class PagamentoDAO {

    constructor(connection) {
        this.connection = connection();
    }
    cadastrarPagamento(dadosPagamento) {
        var promiseCadastrarPagamento = new Promise((resolve, reject) => {
            let date = new Date();
            (dadosPagamento.hora == null) ? dadosPagamento.hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() : null;
            (dadosPagamento.dia == null) ? dadosPagamento.dia = date.getDate() + '/' + (1 + date.getMonth()) + '/' + date.getFullYear() : null;
            this.connection.open(function (err, mongoCliente) {
                mongoCliente.collection('clientes', (err, collection) => {
                    collection.update({ _id: objectId(dadosPagamento.idCliente) }, {
                        $push: {
                            pagamento: {
                                _id: new objectId(),
                                valor: dadosPagamento.valor,
                                data: diaDoPagamento,
                                hora: horaDoPagamento,
                            }
                        }
                    }, (err, result) => {
                        (err != null) ? reject(err) : resolve({ msg: "Pagamento cadastrado com sucesso !", status: "ok" })
                    })
                    mongoCliente.close();
                })
            })
        })
        return promiseCadastrarPagamento;
    }
    deletarPagamento(dadosPagamento) {
        var promiseDeletarPagamento = new Promise((resolve, reject) => {
            this.connection.open(function (err, mongoCliente) {
                mongoCliente.collection('clientes', (err, collection) => {
                    collection.update({
                        _id: objectId(dadosPagamento.idCliente)
                    }, {
                            $pull: { pagamento: { _id: objectId(dadosPagamento.idPagamento) } }
                        }, (err, result) => {
                            (err != null) ? reject(err) : resolve({ msg: 'Pagamento deletado com sucesso !', status: 'ok' })
                        });
                    mongoCliente.close();
                })
            })
        })
        return promiseDeletarPagamento;
    }
}
module.exports = () => {
    return PagamentoDAO;
}