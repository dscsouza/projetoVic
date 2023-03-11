const Cliente = require('../model/clienteModel');

const clienteController = {
cadastra: async (req, res) => {
    try { 
    const dados = req.body;
    const cliente = await Cliente.create(dados);
        if (cliente.sqlMessage){
            res.status(401).send('Cadastro não realizado')
        }else{
            res.status(200).send('Cliente cadastrado');
        }
    }catch(err){
        res.status(500).json(err);
    }
  }
}

module.exports = clienteController;