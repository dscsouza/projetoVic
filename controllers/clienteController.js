const Cliente = require('../model/clienteModel');

const clienteController = {
cadastra: async (req, res) => {
    try { 
    const dados = req.body;
    const cliente = await Cliente.create(dados);
        if (cliente.sqlMessage){
            res.status(401).render('inclui_cliente', {msg:'Cadastro não realizado, verifique os dados e tente novamente!'})
        }else{
            res.status(200).render('inclui_cliente', {msg:'Cadastro realizado com sucesso!'});
        }
    }catch(err){
        res.status(500).render('inclui_cliente', {msg: err});
    }
  },
lista: async (req, res) => {
    try{
        const lista = await Cliente.listAll();
        res.status(200).json(lista);
        }catch(err){
        res.status(500).json('Erro no servidor');
    }
},
listaSelecao: async(req, res) => {
    try{
        const {atributo, valor} = req.query;
        const selecao = await Cliente.listApproximation(atributo, valor)
        res.status(200).json(selecao);
    }catch(err){
        res.status(500).json(err);
    }
}  
}

module.exports = clienteController;