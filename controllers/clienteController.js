const Cliente = require('../model/clienteModel');

const clienteController = {
cadastra: async (req, res) => {
    try { 
    const dados = req.body;
    const cliente = await Cliente.create(dados);
        if (cliente.sqlMessage){
            res.status(401).send('Cadastro não realizado')
        }else{
            res.status(200).redirect('inclui_cliente');
        }
    }catch(err){
        res.status(500).json(err);
    }
  },
lista: async (req, res) => {
    try{
    const lista = await Cliente.listAll();
    res.status(200).json(lista);
    }catch(err){
    res.status(500).json('Erro no servidor');
    }
}  
}

module.exports = clienteController;