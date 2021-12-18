const express = require('express')
const router = express.Router()
const { sequelize } = require('../models/Db');
//const { route } = require('./pedido_inspecao');
const controller = require('../controller/peinspController')
const axios = require('axios');
const Pedido_inspecao = require('../models/Pedido_inspecao');
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
  //console.log("Conectado pedido !!")
});

router.get('/lista_pedidoInspecao', function(req, res, next){
    axios.get('http://localhost:8000/lista_pedidoInspecao/api/pedido_inspecao')
        .then(function(response){
            res.render('lista_pedidoInspecao', {pedido_inspecao : response.data});
        })
        .catch(err=>{
            res.send(err);
        })
    
} );



router.get('/atualizar_peInsp', (req, res)=>{
    axios.get('http://localhost:8000/lista_pedidoInspecao/api/pedido_inspecao', {params: {id: req.query.id}})
        .then(function(pedido_inspecaodata){
            res.render('atualizar_peInsp', {pedido_inspecao: pedido_inspecaodata.data})
        })
        .catch(err =>{
            res.send(err);
        });
});

router.get('/Iinspecao', (req, res)=>{
    axios.get('http://localhost:8000/lista_pedidoInspecao/api/pedido_inspecao', {params: {id: req.query.id}})
        .then(function(pedido_inspecaodata){
            res.render('Iinspecao', {pedido_inspecao: pedido_inspecaodata.data})
        })
        .catch(err =>{
            res.send(err);
        });
});

router.get("/apagarPeins/:id", (req, res, next)=>{
     let id = req.params.id;
     let sql = `DELETE FROM pedido_inspecao WHERE idpedido_inspecao = ${id}`
     connection.query(sql, (err, result)=>{
         if(err){
             console.log("Houve um erro ao apagar "+err)
         }
         res.redirect('/lista_pedidoInspecao')
    })
})


router.post('/guardarIns', (req, res, next)=>{
    let nome_marca = req.body.nome_marca;
    let matricula = req.body.matricula;
    let quilometros = req.body.quilometros;
    let descricao = req.body.descricao;
    let data_inspecao = req.body.data_inspecao;
    let nr_interno =  req.body.numinterno;
    let idpedido_inspecao = req.body.numparticipacao;
    let info = [nome_marca, matricula, quilometros, descricao, data_inspecao, nr_interno, idpedido_inspecao];
    let sql = "UPDATE pedido_inspecao SET nome_marca = ?, matricula = ?, quilometros = ?, descricao = ?, data_inspecao = ?,  nr_interno = ?  WHERE idpedido_inspecao = ?";
    connection.query(sql, info, (err, result)=> {
        if(err){
            console.log("Houve erro ao atualizar informação "+err)
        }
        res.redirect('/lista_pedidoInspecao')
        console.log(info)
    })
})

router.get('/imprimirinspecao', async(req, res) => {

    const browser = await puppeteer.launch(true)
    const page = await browser.newPage()
  
    await page.goto('http://localhost:8000/Iinspecao/', {
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


router.get('/api/pedido_inspecao', controller.find);

module.exports = router;