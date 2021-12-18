const Pedido_inspecao = require('../models/Pedido_inspecao')
const controller = {};
const { sequelize } = require('../models/Db')


//CRIAR PEDIDO

exports.create = (req, res) =>{
    if(!req.body){
        res.status(400).send({message:"Não pode ter espaços vázios"});
        return;
    }

    const pedido_inspecao = new Pedido_inspecao ({
        nome_marca: req.body.nome_marca,
        matricula: req.body.matricula,
        nr_interno: req.body.numinterno,
        equipamento: req.body.equipamento,
        idpedido_inspecao: req.body.numparticipacao,
        quilometros: req.body.quilometros,
        descricao: req.body.descricao,
        data_inspecao: req.body.data_inspecao,
    })

    pedido_inspecao
        .save(pedido_inspecao)
        .then(data => {
            res.redirect('/pedido_inspecao')
        })
        .catch(err =>{
            res.status(500).send({
                message:err.message || "Ocorreu um erro ao guardar"
            })
        })
}


exports.find = (req, res)=>{
  if(req.query.id){
    const id = req.query.id;
    Pedido_inspecao.findByPk(id)
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
    Pedido_inspecao.findAll()
      .then(pedido_inspecao =>{
        res.send(pedido_inspecao)
      })
      .catch(err=>{
        res.status(500).send({message: err.message || "Aconteceu um erro ao procurar informação"})
      })
  }
}