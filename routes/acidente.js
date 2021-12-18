const express = require('express')
const Participacao_acidente = require('../models/Participacao_acidente')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bodyParser = require('body-parser')
const controller = require('../controller/acidenteController')




router.get('/', (req, res) => {
    res.render('participacao_acidente')
})



router.post('/api/acidente', controller.create);

module.exports = router;