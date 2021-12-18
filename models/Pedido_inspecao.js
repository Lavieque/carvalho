const Db = require('./Db')
const Sequelize = require('sequelize');
const { sequelize } = require('./Db');
const moment = require('moment')



const Pedido_inspecao = Db.sequelize.define('pedido_inspecao', {
    idpedido_inspecao: {
        type: Db.Sequelize.INTEGER,
        primaryKey: true,
        notNull: true
        
    },
    nome_marca: {
        type: Db.Sequelize.TEXT,
        notNull: true,
    },
    matricula: {
        type: Db.Sequelize.TEXT,
        notNull: true,
        defaultValue: true,
        //foreignKeyConstraint:true
    },
    nr_interno: {
        type: Db.Sequelize.INTEGER,
        notNull: true,
        defaultValue: true,
        //CONSTRAINT:'pedido_inspecao',
        //references:{
           // model: 'viatura',
            //key: 'idviatura' , 
            
        //} , 
        foreignKey: 'nr_interno' , 
        foreignKeyConstraint:true,
        
        
    },
   
    equipamento: {
        type: Db.Sequelize.INTEGER,
        defaultValue: true,
        references:{
            model: 'tipo_equipamento',
            key: 'idtipo_equipamento' , 
        } , 
        foreignKeyConstraint:true

    },
    quilometros: {
        type: Db.Sequelize.INTEGER,
        notNull:false,
        
    }, 
    descricao: {
        type: Db.Sequelize.TEXT
    },
    data_inspecao: {
        type: Db.Sequelize.DATE,
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

//Pedido_inspecao.sync({force: true})

module.exports = Pedido_inspecao