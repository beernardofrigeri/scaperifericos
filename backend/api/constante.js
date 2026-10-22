const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const status500 = "Erro ao estabelecer conexão com o banco de dados.";
const status200 = "Operação realizada com sucesso!";
const status201 = "Recurso criado com sucesso.";
const status404 = "Não encontrado.";
const status400 = "Requisição inválida.";
const status401 = "Email ou senha incorretos.";
const status403 = "Valor não permitido.";

module.exports = {
    express,
    mysql,
    app,
    port,
    status500,
    status200,
    status201,
    status404,
    status400,
    status401,
    status403
};