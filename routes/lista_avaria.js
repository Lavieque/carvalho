const express = require('express')
const router = express.Router()
const { sequelize } = require('../models/Db')
const Controller = require('../controller/avariaController')
const axios = require('axios');
const Participacao_avaria = require('../models/Participacao_avaria');
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
  //console.log("Conectado avaria !!")
});

router.get('/lista_avaria', function(req, res, next){
    axios.get('http://localhost:8000/lista_avaria/api/participacao_avaria')
        .then(function(response){
            res.render('lista_avaria', {participacao_avaria : response.data});
        })
        .catch(err=>{
            res.send(err);
        })
    
} );

router.get('/atualizar_avaria', (req, res)=>{
  axios.get('http://localhost:8000/lista_avaria/api/participacao_avaria', {params: {id: req.query.id}})
      .then(function(avariadata){
          res.render('atualizar_avaria', {participacao_avaria: avariadata.data})
      })
      .catch(err =>{
          res.send(err);
      });
});

router.get('/Iavaria', (req, res)=>{
    axios.get('http://localhost:8000/lista_avaria/api/participacao_avaria', {params: {id: req.query.id}})
        .then(function(avariadata){
            res.render('Iavaria', {participacao_avaria: avariadata.data})
        })
        .catch(err =>{
            res.send(err);
        });
  });


router.get("/apagarava/:id", (req, res, next)=>{
   let id = req.params.id;
   let sql = `DELETE FROM participacao_avaria WHERE idparticipacao_avaria = ${id}`
   connection.query(sql, (err, result)=>{
       if(err){
           console.log("Houve um erro ao apagar "+err)
       }
       res.redirect('/lista_avaria')
  })
})


router.post('/guardarava', (req, res, next)=>{
  let nome_marca = req.body.nome_marca;
  let matricula = req.body.matricula;
  let quilometros = req.body.quilometros;
  let descricao = req.body.descricao;
  let horas = req.body.horas;
  let nr_interno =  req.body.numinterno;
  let idparticipacao_avaria = req.body.numparticipacao;
  let info = [nome_marca, matricula, quilometros, descricao, horas, nr_interno, idparticipacao_avaria];
  let sql = "UPDATE participacao_avaria SET nome_marca = ?, matricula = ?, quilometros = ?, descricao = ?, horas = ?,  nr_interno = ?  WHERE idparticipacao_avaria = ?";
  connection.query(sql, info, (err, result)=> {
      if(err){
          console.log("Houve erro ao atualizar informação "+err)
      }
      res.redirect('/lista_avaria')
      console.log(info)
  })
})

router.get('/imprimiravaria', async(req, res) => {

    const browser = await puppeteer.launch(true)
    const page = await browser.newPage()
  
    await page.goto('http://localhost:8000/Iavaria/', {
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

router.get('/api/participacao_avaria', Controller.find);

module.exports = router;