const express = require('express');
const consign = require('consign');
const bodyParse = require('body-parser');
const expressSession = require('express-session');
const expressValidator = require('express-validator');
const multiParty = require('connect-multiparty');

const app = express();
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Credentials", true)
    next();
});


app.use(multiParty());

app.use(expressValidator());

app.use(expressSession({
    secret: "usuario",
    resave: false,
    saveUninitialized: false
}))
consign().include('app/routes')
    .then('app/models')
    .then('config/dbConnection.js')
    .then('app/controllers')
    .into(app);
module.exports = app;