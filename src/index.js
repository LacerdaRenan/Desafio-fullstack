const express = require('express');
const apiProduto = require('./api/produto');
const connection = require('./database/database');
const Produto = require('./database/models/Produto');
const app = express();

connection.authenticate().then(()=>{console.log('connected')}).catch(e=>{console.log(e)})

app.use(express.urlencoded({extended:false}))
app.use(express.json());

/*
Produto.create({
    nome: 'Notebook2',
    valor: 1000.25
}).then(()=>console.log('Cadastrado novo produto'));
*/
app.use('/', apiProduto);

app.listen(5000, ()=>console.log('Running...'));