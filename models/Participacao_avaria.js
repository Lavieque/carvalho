const Db = require('./Db')
const Sequelize = require('sequelize');
const { sequelize } = require('./Db');
const moment = require('moment')



const Participacao_avaria = Db.sequelize.define('participacao_avaria', {
    idparticipacao_avaria: {
        type: Db.Sequelize.INTEGER,
        primaryKey: true,
        notNull: true
        
    },
    nome_marca: {
        type: Db.Sequelize.TEXT,
        notNull: true
    },
    matricula: {
        type: Db.Sequelize.TEXT,
        notNull: true,
        defaultValue: true,
        foreignKey: 'matricula' , 
        foreignKeyConstraint:true
    },
    nr_interno: {
        type: Db.Sequelize.INTEGER,
        notNull: true,
        defaultValue: true,
        foreignKey: 'nr_interno' , 
        foreignKeyConstraint:true
        
    },
   
    equipamento: {
        type: Db.Sequelize.INTEGER,
        defaultValue: true,
        foreignKey: 'idtipo_equipamento' , 
        foreignKeyConstraint:true

    },
    horas: {
        type: Db.Sequelize.INTEGER,
        notNull:false,
        defaultValue: true

    },
    quilometros: {
        type: Db.Sequelize.INTEGER,
        notNull:false,
        defaultValue: true
    }, 
    descricao: {
        type: Db.Sequelize.TEXT
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
    //freezeTableName: true,
    
})

//Participacao_avaria.sync({force: true})

module.exports = Participacao_avaria