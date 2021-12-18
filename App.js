const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//const JSAlert = require("js-alert");
//const cookieParser = require('cookie-parser')
//const session = require('express-session')
//const flash = require('connect-flash')
const Router = require('router')
const navigator = require('navigator')
const port = process.env.PORT || 8000




var router = express.Router()

const viatura = require('./routes/viatura')
const index = require('./routes/index')
const maquina = require('./routes/maquina')
const avaria = require('./routes/avaria')
const manutencao = require('./routes/manutencao')
const acidente = require('./routes/acidente')
const pedido_inspecao = require('./routes/pediddo_inspecao')
const inspecao = require('./routes/inspecao')
const seguro = require('./routes/seguro')
const lista_viatura = require('./routes/lista_viatura')
const lista_abastecimento = require('./routes/lista_abastecimento')
const lista_maquina = require('./routes/lista_maquina')
const lista_seguro = require('./routes/lista_seguro')
const lista_inspecao = require('./routes/lista_inspecao')
const lista_acidente = require('./routes/lista_acidente')
const lista_peinsp = require('./routes/lista_peinsp')
const lista_manutencao = require('./routes/lista_manutencao')
const lista_avaria = require('./routes/lista_avaria')
const registaruser = require('./routes/registaruser')
const abastecimento = require('./routes/abastecimento')


//Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())





//Ficheiros estáticos
app.use(express.static('assets'));
app.use('/assets', express.static( 'assets'))
app.use('/js', express.static(__dirname + 'assets/js'))
app.use('/sass', express.static(__dirname + 'assets/sass'))
app.use('/webfonts', express.static(__dirname + 'assets/webfonts'))
app.use('/images', express.static('images')) 

app.use('/viatura', viatura)
app.use('', viatura)
app.use('', index)
app.use('/index', index)
app.use('/maquina', maquina)
app.use('', maquina)
app.use('', avaria)
app.use('/participacao_avaria', avaria)
app.use('', manutencao)
app.use('/participacao_manutencao', manutencao)
app.use('', acidente)
app.use('/participacao_acidente', acidente)
app.use('/pedido_inspecao', pedido_inspecao)
app.use('', pedido_inspecao)
app.use('/inspecao', inspecao)
app.use('', inspecao)
app.use('/seguro', seguro)
app.use('', seguro)
app.use('/lista_viatura', lista_viatura)
app.use('', lista_viatura)
app.use('/lista_abastecimento', lista_abastecimento)
app.use('', lista_abastecimento)
app.use('/lista_maquina', lista_maquina)
app.use('', lista_maquina)
app.use('/lista_seguro', lista_seguro)
app.use('', lista_seguro)
app.use('/lista_inspecao', lista_inspecao)
app.use('', lista_inspecao)
app.use('/lista_acidente', lista_acidente)
app.use('', lista_acidente)
app.use('/lista_pedidoInspecao', lista_peinsp)
app.use('', lista_peinsp)
app.use('/lista_manutencao', lista_manutencao)
app.use('', lista_manutencao)
app.use('/lista_avaria', lista_avaria)
app.use('', lista_avaria)
app.use('/registaruser', registaruser)
app.use('', registaruser)
app.use('', abastecimento)
app.use('/abastecimento', abastecimento)

//Set View's
app.set('views', './views');
app.set('view engine', 'ejs');
app.set('', './imprimir/views');

app.get('/login', (req, res) => {
  res.render('login')
})

//app.get('/registaruser', (req, res) => {
  //res.render('registaruser')
//})








app.listen(port, function(){
    console.log("Isto funciona");
});