const express = require('express')
const router = express.Router()
const { sequelize } = require('../models/Db');
const { route } = require('./viatura');
const controller = require('../controller/controller')
const axios = require('axios');
const Viatura = require('../models/Viatura');
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
  //console.log("Conectado!!")
});

router.get('/lista_viatura', function(req, res, next){
    axios.get('http://localhost:8000/lista_viatura/api/viatura')
        .then(function(response){
            res.render('lista_viatura', {viatura: response.data});
        })
        .catch(err=>{
            res.send(err);
        })
    
} );

router.get('/Ilistaviatura', function(req, res, next){
  axios.get('http://localhost:8000/lista_viatura/api/viatura')
      .then(function(response){
          res.render('Ilistaviatura', {viatura: response.data});
      })
      .catch(err=>{
          res.send(err);
      })
  
} );

router.get('/atualizar_viatura', (req, res) => {
  
  axios.get('http://localhost:8000/lista_viatura/api/viatura',{params:{id:req.query.id}})
    .then(function(viaturadata){
      res.render('atualizar_viatura', {viatura: viaturadata.data})
    })
    .catch(err=>{
      res.send(err);
    })
    
  
})


router.get("/delete/:id", (req,res,next)=> {
  let id = req.params.id;
  let sql = `DELETE FROM viatura WHERE idviatura = ${id}`
  connection.query(sql,(err, result) => {
    if(err){
      console.log("Falha ao apagar"+err)
    }
    res.redirect('/lista_viatura')
  });
});



router.post('/atualizar', (req, res, next)=>{
  let nome_marca = req.body.nome_marca;
  let matricula = req.body.matricula;
  let nr_quadro = req.body.nr_quadro;
  let categoria = req.body.categoria;
  let idviatura = req.body.nr_interno;
  let dados = [nome_marca, matricula, nr_quadro, categoria, idviatura];
  let sql = "UPDATE viatura SET nome_marca = ?, matricula = ?, nr_quadro = ?, categoria = ? WHERE idviatura = ?";
  connection.query(sql, dados, (err, result)=> {
    if(err){
      console.log("erro ao atualizar viatura"+err)
    }
    res.redirect('/atualizar_viatura')
    console.log(dados)
  })
})

router.get('/pdf', async(req, res) => {

  const browser = await puppeteer.launch( )
  const page = await browser.newPage()

  await page.goto('http://localhost:8000/Ilistaviatura/', {
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


router.get('/api/viatura', controller.find)
//router.post('/api/viatura/:id', controller.update);
router.delete('/api/viatura/:id', controller.delete);


module.exports = router;