const Maquina = require('../models/Maquina')
const Db = require('../models/Db')
const Sequelize = require('sequelize');
const { sequelize } = require('../models/Db');
const Op = Db.Sequelize.Op;

//Registar máquina

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({message: "Preenche os espaços em branco!"})
        
    }

    const maquina = {
        nome_marca: req.body.nome_marca,
        matricula: req.body.matricula,
        nr_serie: req.body.nr_serie,
        idmaquina: req.body.nr_interno,
        idtipo_equipamento: 1
    }

    Maquina.create(maquina)
        .then(data => {
            //res.send(data)
            res.redirect('/maquina')
        })
        .catch(err =>{
            res.status(500).send({message: err.message || "Ocorreu alguma erro ao registar a máquina"})
        })
    

}

//Select de todos registos
/*
exports.findAll = (req, res) => {
    const id = req.query.id;
    const condition = id? {id: { [Op.like]: id } } : null;

    Maquina.findAll({ where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Ocorreu um erro ao procura os registos"});
        })
};

//Select de um registo
exports.findOne = (req, res) => {
    const id = req.params.id;

    Maquina.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message:  "Ocorreu um erro ao procura o registo com id"+id});
        })
};
*/
exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;

        Maquina.findByPk(id)
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
     Maquina.findAll()
        .then(maquina => {
        res.send(maquina)
        
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Aconteceu um erro ao procurar informação"})
    })
    }
    
}

//Atualizar registo
exports.update = (req, res) => {
    const id = req.params.id;

    Maquina.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if(num == ""){
                res.send({message: "Dados atualizados com sucesso!"})
            }else{
                res.send({message: "Não foi possivel atualizar máquina com id"})
            }
        })
        .catch(errr => {
            res.status(500).send({ message:  "Ocorreu um erro ao atualizar registo com id"+id});
        })

};

//Apagar registo
exports.delete = (req, res) => {
    const id = req.params.id;

    Maquina.destroy({
        where: {id: id}
    })
        .then(num => {
            if(num == 1){
                res.send({message: "Registo apagado com sucesso!"})
            }
            else{
                res.send({message: 'Não foi possivel apagar o registo com id=${id}'})
            }
            
        })
        .catch(err => {
            res.status(500).send({message: "Não pode apagar o registo com id "+id})
        })
}