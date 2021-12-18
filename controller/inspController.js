const Inspecao = require('../models/Inspecao')
const controller = {};
const { sequelize } = require('../models/Db')


exports.create = (req, res) =>{

    if(!req.body){
      res.status(400).send({message:"Não pode enviar vázio"});
      return;
    }
  
    const inspecao = new Inspecao ({
        nome_marca: req.body.nome_marca,
        matricula: req.body.matricula,
        nr_interno: req.body.numinterno,
        idtipo_equipamento: req.body.equipamento,
        modelo: req.body.modelo,
        data_inspecao: req.body.data_inspecao,
        proxima_inspecao: req.body.proxima_inspecao,
        observacoes: req.body.observacao,
    })
  
    inspecao
      .save(inspecao)
      .then(data => {
        //res.send(data)
        res.redirect('/inspecao')
      })
      .catch(err =>{
        res.status(500).send({
          message: err.message || "correu um erro ao criar"
        })
      })
}


//select 
exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;

        Inspecao.findByPk(id)
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
        Inspecao.findAll()
            .then(inspecao => {
            res.send(inspecao)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Aconteceu um erro ao procurar informação"})
        })
    }
    
}