const mongoDb = require('mongodb');
let connMongoDb = () => {
    var db = new mongoDb.Db(
        'gestaoDeVendas',
        new mongoDb.Server(
            'localhost', 27017, {}), {});
    return db;
}
module.exports = () => {
    return connMongoDb;
}