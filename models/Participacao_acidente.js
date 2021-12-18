const Db = require('./Db')
const Sequelize = require('sequelize');
const { sequelize } = require('./Db');
const moment = require('moment')



const Participacao_acidente = Db.sequelize.define('participacao_acidente', {
    idparticipacao_acidente: {
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
        

    },
    quilometros: {
        type: Db.Sequelize.INTEGER,
        notNull:false,
        
    }, 
    descricao: {
        type: Db.Sequelize.TEXT
    },
    data_acidente: {
        type: Db.Sequelize.DATE,
        notNull: true,
        
    },
    hora_acidente: {
        type: Db.Sequelize.TIME,
        notNull: true,
        
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

//Participacao_acidente.sync({force: true})

module.exports = Participacao_acidente