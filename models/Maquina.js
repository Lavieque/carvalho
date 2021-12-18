const Db = require('./Db')
const Sequelize = require('sequelize');
const { sequelize } = require('./Db');
const moment = require('moment')



const Maquina = Db.sequelize.define('maquina', {
    idmaquina: {
        type: Db.Sequelize.INTEGER,
        primaryKey: true,
        
    },
    nome_marca: {
        type: Db.Sequelize.TEXT,
        notNull: true
    },
    matricula: {
        type: Db.Sequelize.TEXT,
        
    },
    nr_serie: {
        type: Db.Sequelize.TEXT,
        notNull: true
        
    },
   
    idtipo_equipamento: {
        type: Db.Sequelize.INTEGER,
        defaultValue: true,
        foreignKey: 'idtipo_equipamento' , 
        foreignKeyConstraint:true

    }

}, {
    timestamps: false,
    freezeTableName: true,
})

//Maquina.sync({force: true})

module.exports = Maquina