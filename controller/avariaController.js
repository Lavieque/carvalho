const Participacao_avaria = require('../models/Participacao_avaria')
const controller = {};
const { sequelize } = require('../models/Db')

//creat
exports.create = (req, res) =>{

  if(!req.body){
    res.status(400).send({message:"Não pode enviar vázio"});
    return;
  }

  const participacao_avaria = new Participacao_avaria ({
    nome_marca: req.body.nome_marca,
        matricula: req.body.matricula,
        nr_interno: req.body.numinterno,
        equipamento: req.body.equipamento,
        idparticipacao_avaria: req.body.numparticipacao,
        horas: req.body.horas,
        quilometros: req.body.quilometros,
        descricao: req.body.descricao
  })

  participacao_avaria
    .save(participacao_avaria)
    .then(data => {
      //res.send(data)
      res.redirect('/participacao_avaria')
    })
    .catch(err =>{
      res.status(500).send({
        message: err.message || "correu um erro ao criar"
      })
    })
}

//select das participações
exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;

        Participacao_avaria.findByPk(id)
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
    Participacao_avaria.findAll()
        .then(participacao_avaria => {
        res.send(participacao_avaria)
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Aconteceu um erro ao procurar informação"})
    })
    }
    
}
