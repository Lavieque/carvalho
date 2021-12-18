const express = require('express')
const Inspecao = require('../models/Inspecao')
const router = express.Router()
const bodyParser = require('body-parser')
const { sequelize } = require('../models/Db')
const Controller = require('../controller/inspController')
const axios = require('axios');
const mysql      = require('mysql2');
const Connection = require('connection');


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
    //console.log("Conectado inspeção!!")
  });

  

   router.get('/lista_inspecao', (req, res)=> {
       axios.get('http://localhost:8000/lista_inspecao/api/inspecao')
        .then(function(response){
            res.render('lista_inspecao', {inspecao: response.data});
        })
        .catch(err => {
            res.send(err);
        })
   }) 

   /*router.get('/atualizar_seguro', (req, res)=> {
    axios.get("http://localhost:8000/lista_seguro/api/seguro", {params: {id: req.query.id}})
      .then(function(segurodata){
        res.render('atualizar_seguro', {seguro: segurodata.data})
      })
      .catch(err =>{
        res.send(err);
      })
  })*/

  router.get('/atualizar_insp', (req, res)=>{
      axios.get("http://localhost:8000/lista_inspecao/api/inspecao", {params: {id: req.query.id}})
        .then(function(inspecaodata){
            res.render('atualizar_insp', {inspecao: inspecaodata.data})
        })
        .catch(err =>{
            res.send(err);
        })
  })


  router.get("/deleteInsp/:id", (req, res, next)=>{
      let id = req.params.id;
      let sql = `DELETE FROM inspecao WHERE idinspecao = ${id}`
      connection.query(sql, (err, result)=>{
          if(err){
              console.log("Falha ao apagar "+err)
          }
          res.redirect('/lista_inspecao')
      })
  })

 

  router.post('/editar_insp', (req, res, next)=>{
    let nome_marca = req.body.nome_marca;
    let matricula = req.body.matricula;
    let modelo = req.body.modelo;
    let data_inspecao = req.body.data_inspecao;
    let proxima_inspecao = req.body.proxima_inspecao;
    let observacoes = req.body.observacoes;
    let nr_interno = req.body.numinterno;
    let dados = [nome_marca, matricula, modelo, data_inspecao, proxima_inspecao, observacoes, nr_interno];
    let sql = "UPDATE inspecao SET nome_marca = ?, matricula = ?, modelo = ?, data_inspecao = ?, proxima_inspecao = ?, observacoes = ? WHERE nr_interno = ?";
    connection.query(sql, dados, (err, result)=>{
        if(err){
            console.log("Erro ao atualizar inspeção "+err)
        }
        res.redirect('/lista_inspecao')
        console.log(dados)
    })
  })


  router.get('/api/inspecao', Controller.find)

  module.exports = router;