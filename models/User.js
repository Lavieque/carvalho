const Db = require('./Db')
const Sequelize = require('sequelize');
const { sequelize } = require('./Db');
const moment = require('moment')



const User = Db.sequelize.define('user', {
    iduser: {
        type: Db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncremente: true
        
    },
    nome: {
        type: Db.Sequelize.TEXT,
        notNull: true
    },
    password: {
        type: Db.Sequelize.INTEGER,
        notNull: true
    },
    
   
    idtipo_user: {
        type: Db.Sequelize.INTEGER,
        defaultValue: true,
        foreignKey: 'idtipo_user' , 
        foreignKeyConstraint:true

    },
    

}, {
    //timestamps: false,
    freezeTableName: true,
})

//User.sync({force: true})

module.exports = User