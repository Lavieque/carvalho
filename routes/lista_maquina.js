const express = require('express')
const router = express.Router()
const { sequelize } = require('../models/Db');
const { route } = require('./maquina');
const axios = require('axios');
const Maquina = require('../models/Maquina')
const maquina_controller = require('../controller/maquina.controller')
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

router.get('/lista_maquina', (req, res) => {
    axios.get('http://localhost:8000/lista_maquina/api/maquina')
        .then(function(response){
            res.render('lista_maquina', {maquina: response.data});
        })
        .catch(err => {
            res.send(err);
        })
    
})

router.get('/Ilistamaquina', (req, res) => {
  axios.get('http://localhost:8000/lista_maquina/api/maquina')
      .then(function(response){
          res.render('Ilistamaquina', {maquina: response.data});
      })
      .catch(err => {
          res.send(err);
      })
  
})

router.get('/atualizar_maquina', (req, res) => {
    axios.get("http://localhost:8000/lista_maquina/api/maquina", {params: {id: req.query.id}})
      .then(function(maquinadata){
        res.render('atualizar_maquina', {maquina: maquinadata.data})
      })
      .catch(err => {
        res.send(err);
      })
})


router.get("/apagar/:id", (req, res, next)=>{
  let id = req.params.id;
  let sql = `DELETE FROM maquina WHERE idmaquina = ${id}`
  connection.query(sql,(err, result) => {
    if(err){
      console.log('Falha ao apagar '+err)
    }
    
    res.redirect('/lista_maquina')
  })
})


router.post('/editar', (req, res, next)=>{
  let nome_marca = req.body.nome_marca;
  let matricula = req.body.matricula;
  let nr_serie = req.body.nr_serie;
  let idmaquina = req.body.nr_interno;
  let dados = [nome_marca, matricula, nr_serie, idmaquina];
  let sql = "UPDATE maquina SET nome_marca = ?, matricula = ?, nr_serie = ? WHERE idmaquina = ?";
  connection.query(sql, dados, (err, result)=>{
    if(err){
      console.log("Erro ao atualizar "+err)
    }
    res.redirect('/lista_maquina')
  })
})

router.get('/criapdf', async(req, res) => {

  const browser = await puppeteer.launch( )
  const page = await browser.newPage()

  await page.goto('http://localhost:8000/Ilistamaquina/', {
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

router.get('/api/maquina', maquina_controller.find);
router.put('/api/maquina/:id', maquina_controller.update);
router.delete('/api/maquina/:id', maquina_controller.delete);

module.exports = router;