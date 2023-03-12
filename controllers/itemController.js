const Item = require('../model/itemModel');

const itemController = {
    cadastra: async (req, res) => {
        try{
            const dados = req.body;
            console.log(dados);
            const item = await Item.create(dados);
            if(item.sqlMessage){
                res.status(401).send(sqlMessage);
            }else{
                res.status(200).send('Cadastro realizado');
            }
        }catch(err){
            console.log(err);
            res.status(500).send(err);
        }
        

    }
}

module.exports = itemController;