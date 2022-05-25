const express = require('express');
const apiProduto = require('./api/produto');
const connection = require('./database/database');
const apiUsers = require('./api/usuario');
const apiEstoque = require('./api/estoque');
const app = express();

connection.authenticate()
    .then(()=>{console.log('connected')})
    .catch(e=>{console.log(e)})
//

app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use('/', apiProduto);
app.use('/', apiUsers);
app.use('/', apiEstoque);

app.listen(5000, ()=>console.log('Running...'));