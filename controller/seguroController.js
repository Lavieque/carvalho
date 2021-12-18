const Seguro = require('../models/Seguro')
const Db = require('../models/Db')
const Sequelize = require('sequelize');
const { sequelize } = require('../models/Db');



//Criar
exports.criar = (req, res)=> {
    if(!req.body){
        res.status(400).send({message: "Preencher os espaços em branco"})
    }

    const seguro = {
        nome_marca: req.body.nome_marca,
        matricula: req.body.matricula,
        nr_interno: req.body.numinterno,
        idtipo_equipamento: req.body.equipamento,
        modelo: req.body.modelo,
        data_validade: req.body.data_validade,
        apolice: req.body.apolice,
    }

    Seguro.create(seguro)
        .then(data => {
            res.redirect('/seguro')
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Ocorreu um erro ao registar o seguro"})
        })
}

//mostrar
exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;

        Seguro.findByPk(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message: "Não foi encontrada viatura com id"+id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Erro ao procurar viatura com id"+id})
            })
    }else{
     Seguro.findAll()
        .then(seguro => {
        res.send(seguro)
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Aconteceu um erro ao procurar informação"})
    })
    }
    
}






  