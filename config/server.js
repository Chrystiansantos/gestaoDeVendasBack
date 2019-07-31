const express = require('express');
const consign = require('consign');
const bodyParse = require('body-parser');
const expressSession = require('express-session');
const expressValidator = require('express-validator');

const app = express();
app.use(bodyParse.urlencoded({ extended: true }));
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