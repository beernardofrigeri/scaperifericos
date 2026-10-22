const {mysql, status500, status200} = require('./constante');

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

module.exports = conexao;