const express = require('express')
const Participacao_avaria = require('../models/Participacao_avaria')
const router = express.Router()
const Controller = require('../controller/avariaController')

//router.get('/', function(req, res, next){
  //  res.render('maquina');
//} );

router.get('/', (req, res) => {
    res.render('participacao_avaria')
})


//Pocessamento de formulário e envio à base de dados(Abastecimento)
/*router.post('/avaria', function(req, res){
    let alert = require('alert');
    Participacao_avaria.create({
        nome_marca: req.body.nome_marca,
        matricula: req.body.matricula,
        nr_interno: req.body.numinterno,
        equipamento: req.body.equipamento,
        idparticipacao_avaria: req.body.numparticipacao,
        horas: req.body.horas,
        quilometros: req.body.quilometros,
        descricao: req.body.descricao
      }).then(function(){
        res.redirect('/participacao_avaria');//res.send("Utilizador criado com sucesso")
        alert("Abastecimento registado com sucesso!")
        //JSAlert.alert("Abastecimento registado com sucesso!");
      }).catch(function(erro){
        res.send("Houve um erro: "+ erro)
      })
})*/

router.post('/api/participacao_avaria', Controller.create);

module.exports = router;