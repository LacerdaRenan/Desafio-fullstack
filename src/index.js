const express = require('express');
const apiProduto = require('./api/produto');
const connection = require('./database/database');
const Produto = require('./database/models/Produto');
const app = express();

connection.authenticate().then(()=>{console.log('connected')}).catch(e=>{console.log(e)})

app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use('/', apiProduto);

app.listen(5000, ()=>console.log('Running...'));