const Db = require('./Db')
const Sequelize = require('sequelize');
const { sequelize } = require('./Db');
const moment = require('moment')

moment(new Date()).utc().format("YYYY-MM-DD")

const Abastecimento = Db.sequelize.define('abastecimento', {
    idabastecimento: {
        type: Db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_marca: {
        type: Db.Sequelize.TEXT,
        notNull: true
    },
    matricula: {
        type: Db.Sequelize.TEXT,
        notNull: true
    },
    marcacao_antes: {
        type: Db.Sequelize.INTEGER,
        notNull: true
    },
    marcacao_depois: {
        type: Db.Sequelize.INTEGER,
        notNull: true
    },
    litros_abastecidos:{
        type: Db.Sequelize.INTEGER,
        notNull: true
    },
    idlocal_abastecimento: {
        type: Db.Sequelize.TEXT,
        defaultValue: true,
        foreignKey: 'idlocal_abastecimento' , 
        foreignKeyConstraint:true

    },
    data_abastecimento:{
        type: Db.Sequelize.DATE,
        notNull: true
    },
    createdAt: {
        allowNull: false,
        type: Db.Sequelize.DATE
    },
      updatedAt: {
        allowNull: false,
        type: Db.Sequelize.DATE
    }

}, {
    //timestamps: false,
    freezeTableName: true,
})

//Abastecimento.sync({force: true})

module.exports = Abastecimento