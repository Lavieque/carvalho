const express = require('express')
const Inspecao = require('../models/Inspecao')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bodyParser = require('body-parser')
const Controller = require('../controller/inspController')


//router.get('/', function(req, res, next){
  //  res.render('maquina');
//} );



router.get('/', (req, res) => {
    res.render('inspecao')
})


//Pocessamento de formulário e envio à base de dados(Abastecimento)
/*router.post('/inspecao', function(req, res){
    //let alert = require('alert');
    Inspecao.create({
        nome_marca: req.body.nome_marca,
        matricula: req.body.matricula,
        nr_interno: req.body.numinterno,
        idtipo_equipamento: req.body.equipamento,
        modelo: req.body.modelo,
        data_inspecao: req.body.data_inspecao,
        proxima_inspecao: req.body.proxima_inspecao,
        observacoes: req.body.observacao,
      }).then(function(){
        req.flash('success', 'Registration successfully');
        res.redirect('/inspecao');//res.send("Utilizador criado com sucesso")
        //alert("Participação registada com sucesso!")
        //JSAlert.alert("Abastecimento registado com sucesso!");
      }).catch(function(erro){
        res.send("Houve um erro: "+ erro)
      })
})*/

router.post('/api/inspecao', Controller.create)

module.exports = router;