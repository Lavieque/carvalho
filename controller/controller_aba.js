const Abastecimento = require('../models/Abastecimento')
const { sequelize } = require('../models/Db')
const Db = require('../models/Db')
const Op = Db.Sequelize.Op;


//Inserir dados 
exports.create = (req, res)=>{

    if(!req.body){
        res.status(400).send({message:"Não pode enviar vázio"});
        return;
    }

    const abastecimento = new Abastecimento ({
        nome_marca: req.body.nome_marca,
        matricula: req.body.matricula,
        marcacao_antes: req.body.marcacao_antes,
        marcacao_depois: req.body.marcacao_depois,
        litros_abastecidos: req.body.litros_abastecidos,
        idlocal_abastecimento: req.body.estaleiro,
        data_abastecimento: req.body.data_abastecimento
    })

    abastecimento
        .save(abastecimento)
        .then(data =>{
            res.redirect('/abastecimento')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "correu um erro ao criar"
            })
        })
}

//select das viaturas
exports.find = (req, res)=>{
    if(req.body.id){
        const id = req.body.id;

        Abastecimento.findByPk(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message: "Não foi encontrado o registo com id"+id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Erro ao procurar o registo com id"+id})
            })
    }else{
        Abastecimento.findAll()
            .then(abastecimento => {
            res.send(abastecimento)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Aconteceu um erro ao procurar informação"})
        })
    }
}

