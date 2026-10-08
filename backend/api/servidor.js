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

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sca'
});

conexao.connect((erro) => {
    if (erro) {
        console.log(status500);
    }
    else {
        console.log(status200);
    }
});

app.get('/', (req, res) => {
    return res.status(200).send({message: status200});
});

app.get("/usuarios", (req, res) => {
    const sql = "SELECT * FROM usuarios";
    conexao.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).send({message: status500});
        }
        else {
            return res.status(200).send(resultados);
        }
    });
});

app.get("/usuarios/:id", (req, res)=>{
const id = Number(req.params.id);
const sql = "SELECT * FROM usuarios WHERE id_usuario = ?"
    conexao.query(sql, [id], (erro, resultado)=>{
        if(erro){
            return res.status(500).json({mensagem: status500});
        }
        if (resultado.length === 0) {
            return res.status(404).json({mensagem: status404});
        }
        return res.status(200).json(resultado[0])
    });
});

app.get("/categorias", (req, res) => {
    const sql = "SELECT * FROM categorias";
    conexao.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).send({message: status500});
        }
        else {
            return res.status(200).send(resultados);
        }
    });
});
app.get("/categorias/:id", (req, res)=>{
const id = Number(req.params.id);
const sql = "SELECT * FROM categorias WHERE id_categoria = ?"
    conexao.query(sql, [id], (erro, resultado)=>{
        if(erro){
            return res.status(500).json({mensagem: status500});
        }
        if (resultado.length === 0) {
            return res.status(404).json({mensagem: status404});
        }
        return res.status(200).json(resultado[0])
    });
});
app.get("/produtos", (req, res) => {
    const sql = "SELECT * FROM produtos";
    conexao.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).send({message: status500});
        }
        else {
            return res.status(200).send(resultados);
        }
    });
});
app.listen(port, () => {
    console.log("Servidor rodando na porta: " + port);
});