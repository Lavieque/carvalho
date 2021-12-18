const express = require('express')
const router = express.Router()
const { sequelize } = require('../models/Db')
const controller = require('../controller/pemanuController')
const axios = require('axios');
const Participacao_manutencao = require('../models/Participacao_manutencao');
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
  //console.log("Conectado manutenção !!")
});

router.get('/lista_manutencao', function(req, res, next){
    axios.get('http://localhost:8000/lista_manutencao/api/participacao_manutencao')
        .then(function(response){
            res.render('lista_manutencao', {participacao_manutencao : response.data});
        })
        .catch(err=>{
            res.send(err);
        })
    
} );

router.get('/atualizar_manutencao', (req, res)=>{
  axios.get('http://localhost:8000/lista_manutencao/api/participacao_manutencao', {params: {id: req.query.id}})
      .then(function(manutencaodata){
          res.render('atualizar_manutencao', {participacao_manutencao: manutencaodata.data})
      })
      .catch(err =>{
          res.send(err);
      });
});

router.get('/Imanutencao', (req, res)=>{
    axios.get('http://localhost:8000/lista_manutencao/api/participacao_manutencao', {params: {id: req.query.id}})
        .then(function(manutencaodata){
            res.render('Imanutencao', {participacao_manutencao: manutencaodata.data})
        })
        .catch(err =>{
            res.send(err);
        });
  });


router.get("/apagarmanu/:id", (req, res, next)=>{
   let id = req.params.id;
   let sql = `DELETE FROM participacao_manutencao WHERE idparticipacao_manutencao = ${id}`
   connection.query(sql, (err, result)=>{
       if(err){
           console.log("Houve um erro ao apagar "+err)
       }
       res.redirect('/lista_manutencao')
  })
})


router.post('/guardarmanu', (req, res, next)=>{
  let nome_marca = req.body.nome_marca;
  let matricula = req.body.matricula;
  let quilometros = req.body.quilometros;
  let descricao = req.body.descricao;
  let horas = req.body.horas;
  let nr_interno =  req.body.numinterno;
  let idparticipacao_manutencao = req.body.numparticipacao;
  let info = [nome_marca, matricula, quilometros, descricao, horas, nr_interno, idparticipacao_manutencao];
  let sql = "UPDATE participacao_manutencao SET nome_marca = ?, matricula = ?, quilometros = ?, descricao = ?, horas = ?,  nr_interno = ?  WHERE idparticipacao_manutencao = ?";
  connection.query(sql, info, (err, result)=> {
      if(err){
          console.log("Houve erro ao atualizar informação "+err)
      }
      res.redirect('/lista_manutencao')
      console.log(info)
  })
})

router.get('/imprimirmanutencao', async(req, res) => {

    const browser = await puppeteer.launch(true)
    const page = await browser.newPage()
  
    await page.goto('http://localhost:8000/Imanutencao/', {
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

router.get('/api/participacao_manutencao', controller.find);

module.exports = router;