const Db = require('./Db')
const Sequelize = require('sequelize');
const { sequelize } = require('./Db');
const moment = require('moment')



const Seguro = Db.sequelize.define('seguro', {
    idseguro: {
        type: Db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncremente: true
        
    },
    nome_marca: {
        type: Db.Sequelize.TEXT,
        notNull: true
    },
    matricula: {
        type: Db.Sequelize.TEXT,
        notNull: true
    },
    nr_interno: {
        type: Db.Sequelize.INTEGER,
        notNull: true
        
    },
    modelo: {
        type: Db.Sequelize.TEXT,
        
    },
   
    idtipo_equipamento: {
        type: Db.Sequelize.INTEGER,
        defaultValue: true,
        foreignKey: 'idtipo_equipamento' , 
        foreignKeyConstraint:true

    },
    data_validade:{
        type: Db.Sequelize.DATE,
        notNull: true
    },
    apolice: {
        type: Db.Sequelize.TEXT,
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

//Seguro.sync({force: true})

module.exports = Seguro