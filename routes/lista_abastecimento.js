const express = require('express')
const router = express.Router()
const { sequelize } = require('../models/Db');
const { route } = require('./index');
const controller = require('../controller/controller_aba')
const axios = require('axios');
const Abastecimento = require('../models/Abastecimento')
const mysql      = require('mysql2');
const Connection = require('connection');
const puppeteer = require('puppeteer');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Edma2014',
  database : 'projeto',
  
});

connection.connect((err, res)=>{
  if(err){
      console.log("Falha ao conectar"+err)
  }
  //console.log("Conectado máquina!!")
});


router.get('/lista_abastecimento', (req, res)=> {
  axios.get('http://localhost:8000/lista_abastecimento/api/abastecimento')
    .then(function(response){
      res.render('lista_abastecimento', {abastecimento: response.data})
    })
    .catch(err => {
      res.send(err)
    })
})
router.get('/atualizar_aba', (req, res)=>{
  axios.get('http://localhost:8000/lista_abastecimento/api/abastecimento', {params: {id: req.query.id}})
      .then(function(abadata){
          res.render('atualizar_aba', {abastecimento: abadata.data})
      })
      .catch(err =>{
          res.send(err);
      });
});

router.get('/Ilistaabastecimento', (req, res)=> {
  axios.get('http://localhost:8000/lista_abastecimento/api/abastecimento')
    .then(function(response){
      res.render('Ilistaabastecimento', {abastecimento: response.data})
    })
    .catch(err => {
      res.send(err)
    })
})



router.get('/atualizar_aba', (req, res) => {
  axios.get("http://localhost:8000/lista_abastecimento/api/abastecimento", {params: {id: req.query.id}})
    .then(function(abastecimentodata){
      res.render('atualizar_aba', {abastecimento: abastecimentodata.data})
    })
    .catch(err => {
      res.send(err);
    })
})

router.get("/apagaraba/:id", (req, res, next)=>{
  let id = req.params.id;
  let sql = `DELETE FROM abastecimento WHERE idabastecimento = ${id}`
  connection.query(sql,(err, result) => {
    if(err){
      console.log('Falha ao apagar '+err)
    }
    res.redirect('/lista_abastecimento')
  })
})

router.post('/editar_aba', (req, res, next)=>{
  let idlocal_abastecimento = req.body.idlocal_abastecimento;
  let nome_marca = req.body.nome_marca;
  let matricula = req.body.matricula;
  let marcacao_antes = req.body.marcacao_antes;
  let marcacao_depois = req.body.marcacao_depois;
  let litros_abastecidos = req.body.litros_abastecidos;
  let data_abastecimento = req.body.data_abastecimento;
  let dados = [idlocal_abastecimento, nome_marca, matricula, marcacao_antes, marcacao_depois, litros_abastecidos, data_abastecimento];
  let sql = "UPDATE abastecimento SET idlocal_abastecimento = ? nome_marca = ?, matricula = ?, marcacao_antes = ?, marcacao_depois = ?, litros_abastecidos = ?, data_abastecimento = ? WHERE idabastecimento = ?";
  connection.query(sql, dados, (err, result)=>{
    if(err){
      console.log("Erro ao atualizar "+err)
    }
    res.redirect('/lista_abastecimento')
  })
})

router.get('/cria', async(req, res) => {

  const browser = await puppeteer.launch(true)
  const page = await browser.newPage()

  await page.goto('http://localhost:8000/Ilistaabastecimento/', {
    waitUntil: 'networkidle0'
  })

  const pdf = await page.pdf({
    printBackground: true,
    format: 'letter',
    margin: {
      left: "20px",
      right: "20px"
    } 
  })

  await browser.close()

  res.contentType("application/pdf")

  return res.send(pdf)
})


//router.post('/api/abastecimento', controller.create)
//router.get('/api/abastecimento', controller.find);
router.get('/api/abastecimento', controller.find);

module.exports = router;