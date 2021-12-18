const Db = require('./Db')
const Sequelize = require('sequelize');
const { sequelize } = require('./Db');
const moment = require('moment')



const Inspecao = Db.sequelize.define('inspecao', {
    idinspecao: {
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
    data_inspecao:{
        type: Db.Sequelize.DATE,
        notNull: true
    },
    proxima_inspecao:{
        type: Db.Sequelize.DATE,
        notNull: true
    },
    observacoes:{
        type: Db.Sequelize.TEXT,
        
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

//Inspecao.sync({force: true})

module.exports = Inspecao