const User = require('../models/User')
const controller = {};
const { sequelize } = require('../models/Db')
const bcrypt = require('bcrypt')

//creat
exports.create = (req, res) =>{

  if(!req.body){
    res.status(400).send({message:"Não pode enviar vázio"});
    return;
  }

  const user = new User ({
    nome: req.body.nome,
    password: req.body.password,
    iduser: req.body.numero,
    idtipo_user: req.body.tipo,
    
  })
  
 
  user
    .save(user)
    .then(data => {
      //res.send(data)
      res.redirect('/registaruser')
    })
    .catch(err =>{
      res.status(500).send({
        message: err.message || "correu um erro ao criar"
      })
    })
  
}

//select das user
exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;

        User.findByPk(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message: "Não foi encontrado o utilizador com id"+id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Erro ao procurar utilizador com id"+id})
            })
    }else{
    User.findAll()
        .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Aconteceu um erro ao procurar informação"})
    })
    }
    
}
