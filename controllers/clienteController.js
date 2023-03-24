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
        const pg = parseInt(req.query.pg);
        const qtd = parseInt(req.query.qtd);
        if(pg == ''){
            pg = 1;
        }
        const count = (pg*qtd) - qtd;
        const lista = await Cliente.listAll(count, qtd);
        res.status(200).json(lista);
        }catch(err){
        res.status(500).json(err);
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
},
exclui: async(req, res) => {
    try{
        const id_cliente =  req.query
        console.log(id_cliente);
        const resultado = await Cliente.deleta(id_cliente);
        if(resultado.sqlMessage){
            res.status(401).json('A exclusão não foi concluída')
        }else{
            res.status(200).json('Exclusão realizada');
        }
    }catch(err){
        res.status(500).json(err);
    }
    
}  
}

module.exports = clienteController;