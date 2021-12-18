const Viatura = require('../models/Viatura')
const controller = {};
const { sequelize } = require('../models/Db')

//creat
exports.create = (req, res) =>{

  if(!req.body){
    res.status(400).send({message:"Não pode enviar vázio"});
    return;
  }

  const viatura = new Viatura ({
      nome_marca: req.body.nome_marca,
      matricula: req.body.matricula,
      nr_quadro: req.body.nr_quadro,
      idviatura: req.body.nr_interno,
      categoria: req.body.categoria,
      idtipo_equipamento: 2
  })

  viatura
    .save(viatura)
    .then(data => {
      //res.send(data)
      res.redirect('/viatura')
    })
    .catch(err =>{
      res.status(500).send({
        message: err.message || "correu um erro ao criar"
      })
    })
}

//select das viaturas
exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;

        Viatura.findByPk(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message: "Não foi encontrada viatura com id"+id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Erro ao procurar viatura com id"+id})
            })
    }else{
     Viatura.findAll()
        .then(viatura => {
        res.send(viatura)
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Aconteceu um erro ao procurar informação"})
    })
    }
    
}

//atualizar dados da viatura

/*
exports.update = (req, res)=>{
  /*
  app.put("/viatura", function (request, response) {

    var params = request.body;
    var nome_marca = params.nome_marca;
    var matricula = params.matricula;
    var nr_quadro = params.nr_quadro;
    var idviatura = params.nr_interno;
    var categoria = params.categoria;

    sequelize.query("Update viatura SET nome_marca = ?, matricula = ?, nr_quadro = ?, categoria =? WHERE id = ?", [nome_marca, matricula, nr_quadro, idviatura, categoria], function (error, results, fields) {

        if (error) {
            throw error;
        } else {
            response.json({
                status: 1,
                message: "User has been updated successfully"
            });
        }
    });
  });
  
    if(!req.body){
        return res
            .status(400)
            .send({message:"Os dados a atualizar não pode estar vázio"})
    }

    const id = req.params.id;
    Viatura.update(req.body)
        .then(data =>{
            if(!data){
                res.status(400).send({message: 'Não foi possivel atualizar a viatura com ${id}. Talvez não foi encontrado'})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Erro ao atualizar a informação"})
        })
        
}*/




//apagar

exports.delete = (req, res)=>{
    const id = req.params.id;

    Viatura.destroy(id)
        .then(data=>{
            if(!data){
              res.status(404).send({message:'Não pode apagar os dados com id ${id}. Talvez está errado'})
            }else{
                res.send({message:"Viatura apagado com sucesso!"})
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Não pode apagar a viatura com id="+id});
        })
}
/*


exports.delete = (req, res) => {
    //const {id} = req.params;
    const id = req.params.id;

    sequelize.query("DELETE FROM viatura WHERE id = "+  id, (err, rows) =>{
      res.redirect('/lista_viatura')
    }) 
};    
  /*
    Viatura.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };
  */
/*
  exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;

        Abastecimento.findByPk(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message: "Não foi encontrada viatura com id"+id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Erro ao procurar viatura com id"+id})
            })
    }else{
     Abastecimento.findAll()
        .then(abastecimento => {
        res.send(abastecimento)
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Aconteceu um erro ao procurar informação"})
    })
    }
    
}
*/
