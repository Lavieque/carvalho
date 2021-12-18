const express = require('express')
const router = express.Router()
const { sequelize } = require('../models/Db');
//const { route } = require('./Participacao_acidente');
const controller = require('../controller/acidenteController')
const axios = require('axios');
const Acidente = require('../models/Participacao_acidente');
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
  //console.log("Conectado acidente!!")
});

router.get('/lista_acidente', function(req, res, next){
    axios.get('http://localhost:8000/lista_acidente/api/acidente')
        .then(function(response){
            res.render('lista_acidente', {participacao_acidente: response.data});
        })
        .catch(err =>{
            res.send(err);
        })
});

router.get('/atualizar_acidente', (req, res) => {
  
    axios.get('http://localhost:8000/lista_acidente/api/acidente',{params:{id:req.query.id}})
      .then(function(acidentedata){
        res.render('atualizar_acidente', {participacao_acidente: acidentedata.data})
      })
      .catch(err=>{
        res.send(err);
      })
      
    
  })

  router.get('/Iacidente', (req, res) => {
  
    axios.get('http://localhost:8000/lista_acidente/api/acidente',{params:{id:req.query.id}})
      .then(function(acidentedata){
        res.render('Iacidente', {participacao_acidente: acidentedata.data})
      })
      .catch(err=>{
        res.send(err);
      })
         
  })


router.get("/apagarAcidente/:id", (req, res, next)=>{
    let id = req.params.id;
    let sql = `DELETE FROM participacao_acidente WHERE idparticipacao_acidente = ${id}`
    connection.query(sql, (err, result)=>{
        if(err){
            console.log("Falha ao apagar "+err)
        }
        res.redirect('/lista_acidente')
    });
});

router.post('/atualizarAcidente', (req, res, next)=>{
    let nome_marca = req.body.nome_marca;
    let matricula = req.body.matricula;
    let horas = req.body.horas;
   
    let nr_interno = req.body.nr_interno;
    let quilometros = req.body.quilometros;
    let descricao = req.body.descricao;
    let data_acidente = req.body.data_acidente;
    let hora_acidente = req.body.hora_acidente;
    let idparticipacao_acidente = req.body.numparticipacao;
    let dados = [nome_marca, matricula, horas, nr_interno, quilometros, descricao, data_acidente, hora_acidente, idparticipacao_acidente];
    let sql = "UPDATE participacao_acidente SET nome_marca = ?, matricula = ?, horas = ?, nr_interno = ?, quilometros = ?, descricao = ?, data_acidente = ?, hora_acidente WHERE idparticipacao_acidente = ?";
    connection.query(sql, dados, (err, result)=> {
      if(err){
        console.log("erro ao atualizar participação"+err)
      }
      res.redirect('/lista_acidente')
      console.log(dados)
    })
})

router.get('/imprimiracidente', async(req, res) => {

  const browser = await puppeteer.launch(true)
  const page = await browser.newPage()

  await page.goto('http://localhost:8000/Iacidente/', {
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


router.get('/api/acidente', controller.find)



module.exports = router;