const express = require('express')
const Abastecimento = require('../models/Abastecimento')
const router = express.Router()
const axios = require('axios')
const { sequelize } = require('../models/Db')
const controller = require('../controller/controller_aba')
router.get('/', function(req, res, next){
    res.render('index');
} );

router.get('/index', (req, res) => {
    res.render('index')
});


router.post('/api/abastecimento', controller.create)

module.exports = router;
  