const connection = require('../database');
const Sequelize = require('sequelize');

const Produto = connection.define('produtos',{
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      valor: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
});

Produto.sync({force:false}).then(()=>{});

module.exports = Produto;