const connection = require('../database');
const Sequelize = require('sequelize');

const Produto = connection.define('produtos',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor: {
        type: Sequelize.INTEGER
      }
});

Produto.sync({force:false}).then(()=>{});

module.exports = Produto;