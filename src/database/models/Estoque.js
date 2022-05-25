const connection = require('../database');
const Sequelize = require('sequelize');
const Produto = require('./Produto');

const Estoque = connection.define('estoques',{
    valor: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Produto.hasOne(Estoque);
Estoque.belongsTo(Produto,{
    foreingKey: 'produtoId'
})

Estoque.sync({force:false}).then(()=>{});

module.exports = Estoque;

