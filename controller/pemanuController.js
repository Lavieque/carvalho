const Participacao_manutencao = require('../models/Participacao_manutencao')
const controller = {};
const { sequelize } = require('../models/Db')


exports.create = (req, res) =>{
    if(!req.body){
        res.status(400).send({message:"Não pode ter espaços vázios"});
        return;
    }

    const participacao_manutencao = new Participacao_manutencao ({
        nome_marca: req.body.nome_marca,
        matricula: req.body.matricula,
        nr_interno: req.body.numinterno,
        tipo_equipamento: req.body.equipamento,
        idparticipacao_manutencao: req.body.numparticipacao,
        horas: req.body.horas,
        quilometros: req.body.quilometros,
        descricao: req.body.descricao
    })

    participacao_manutencao
        .save(participacao_manutencao)
        .then(data => {
            res.redirect('/participacao_manutencao')
        })
        .catch(err =>{
            res.status(500).send({
                message:err.message || "Ocorreu um erro ao guardar"
            })
        })
}

//select

exports.find = (req, res)=>{
    if(req.query.id){
      const id = req.query.id;
      Participacao_manutencao.findByPk(id)
        .then(data=>{
          if(!data){
            res.status(404).send({message: "Não foi encontrado o registo com id"+id})
          }else{
            res.send(data)
          }
        })
        .catch(err=>{
          res.status(500).send({message:"Erro ao procurar registo com id"+id})
        })
    }else{
        Participacao_manutencao.findAll()
        .then(participacao_manutencao =>{
          res.send(participacao_manutencao)
        })
        .catch(err=>{
          res.status(500).send({message: err.message || "Aconteceu um erro ao procurar informação"})
        })
    }
  }
