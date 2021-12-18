const Db = require('./Db')
const Sequelize = require('sequelize');
const { sequelize } = require('./Db');
const moment = require('moment')



const Tipo_user = Db.sequelize.define('tipo_user', {
    idtipo_user: {
        type: Db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncremente: true
        
    },
    nometipo_user: {
        type: Db.Sequelize.TEXT,
        notNull: true
    },    
    

}, {
    //timestamps: false,
    freezeTableName: true,
})

Tipo_user.sync({force: true})

module.exports = Tipo_user