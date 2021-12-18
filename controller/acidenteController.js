const Participacao_acidente = require('../models/Participacao_acidente')
const controller = {};
const { sequelize } = require('../models/Db')

//creat
exports.create = (req, res) =>{

  if(!req.body){
    res.status(400).send({message:"Não pode enviar vázio"});
    return;
  }

  const participacao_acidente = new Participacao_acidente ({
    nome_marca: req.body.nome_marca,
    matricula: req.body.matricula,
    nr_interno: req.body.numinterno,
    equipamento: req.body.equipamento,
    idparticipacao_acidente: req.body.numparticipacao,
    horas: req.body.horas,
    quilometros: req.body.quilometros,
    descricao: req.body.descricao,
    data_acidente: req.body.data_acidente,
    hora_acidente: req.body.hora_acidente
  })

  participacao_acidente
    .save(participacao_acidente)
    .then(data => {
      //res.send(data)
      res.redirect('/participacao_acidente')
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

        Participacao_acidente.findByPk(id)
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
    Participacao_acidente.findAll()
        .then(participacao_acidente => {
        res.send(participacao_acidente)
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Aconteceu um erro ao procurar informação"})
    })
    }
    
}
