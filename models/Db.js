const Sequelize = require('sequelize');

 //Ligação base de dados
 const sequelize = new Sequelize('projeto', 'root', 'Edma2014', {
    host: "localhost",
    dialect: "mysql"
  })

sequelize.authenticate().then(function(){
console.log("Conectado com sucesso!!")
}).catch(function(erro){
console.log("Falha ao conectar"+erro)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}