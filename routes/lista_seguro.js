const express = require('express')
const Seguro = require('../models/Seguro')
const router = express.Router()
const bodyParser = require('body-parser')
const { sequelize } = require('../models/Db')
const Controller = require('../controller/seguroController')
const axios = require('axios');
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
  //console.log("Conectado seguro!!")
});


router.get('/lista_seguro', (req, res)=>{
    axios.get('http://localhost:8000/lista_seguro/api/seguro')
      .then(function(response){
        res.render('lista_seguro', {seguro: response.data});
      })
      .catch(err => {
        res.send(err);
    })
    
})

router.get('/Ilistaseguro', (req, res)=>{
  axios.get('http://localhost:8000/lista_seguro/api/seguro')
    .then(function(response){
      res.render('Ilistaseguro', {seguro: response.data});
    })
    .catch(err => {
      res.send(err);
  })
  
})



router.get('/atualizar_seguro', (req, res)=> {
  axios.get("http://localhost:8000/lista_seguro/api/seguro", {params: {id: req.query.id}})
    .then(function(segurodata){
      res.render('atualizar_seguro', {seguro: segurodata.data})
    })
    .catch(err =>{
      res.send(err);
    })
})

router.get("/eliminar/:id", (req,res,next)=> {
  let id = req.params.id;
  let sql = `DELETE FROM seguro WHERE idseguro = ${id}`
  connection.query(sql,(err, result) => {
    if(err){
      console.log("Falha ao apagar"+err)
    }
    res.redirect('/lista_seguro')
  });
});

router.post('/guardar', (req, res, next)=>{
  let nome_marca = req.body.nome_marca;
  let matricula = req.body.matricula;
  let modelo = req.body.modelo;
  let data_validade = req.body.data_validade;
  let apolice = req.body.apolice;
  let nr_interno = req.body.numinterno;
  let dados = [nome_marca, matricula, modelo, data_validade, apolice, nr_interno];
  let sql = "UPDATE seguro SET nome_marca = ?, matricula = ?, modelo = ?, data_validade = ?, apolice = ? WHERE nr_interno = ?";
  connection.query(sql, dados, (err, result)=> {
    if(err){
      console.log("erro ao atualizar seguro"+err)
    }
    res.redirect('/lista_seguro')
    console.log(dados)
  })
})

router.get('/imprimirseguro', async(req, res) => {

  const browser = await puppeteer.launch(true)
  const page = await browser.newPage()

  await page.goto('http://localhost:8000/Ilistaseguro/', {
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


  router.get('/api/seguro', Controller.find);


  module.exports = router;