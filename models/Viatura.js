const Db = require('./Db')
const Sequelize = require('sequelize');
const { sequelize } = require('./Db');
const moment = require('moment')



const Viatura = Db.sequelize.define('viatura', {
    idviatura: {
        type: Db.Sequelize.INTEGER,
        primaryKey: true,
        
    },
    nome_marca: {
        type: Db.Sequelize.TEXT,
        notNull: true
    },
    matricula: {
        type: Db.Sequelize.TEXT,
        notNull: true
    },
    nr_quadro: {
        type: Db.Sequelize.TEXT,
        
    },
    categoria: {
        type: Db.Sequelize.TEXT,
        notNull: true
    },
   
    idtipo_equipamento: {
        type: Db.Sequelize.NUMBER,
        defaultValue: true,
        foreignKey: 'idtipo_equipamento' , 
        foreignKeyConstraint:true

    }

}, {
    timestamps: false,
    freezeTableName: true,
})

//User.sync({force: true})

module.exports = Viatura