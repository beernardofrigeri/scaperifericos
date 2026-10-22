const {status500, status200, status404, status400, status201, app, port} = require('./constante');
const conexao = require('./banco');

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