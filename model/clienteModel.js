const connection = require('../database/connection');

class Cliente {
        create(dados){
        const {nm_cliente, cgc, contato} = dados
        const sql = 'CALL prd_cadastra_cliente(?, ?, ?)'
        
        return new Promise((reject, resolve) => {
            connection.query(sql, [nm_cliente, cgc, contato], (error, results) =>{
                if(error){
                   reject(error);
                }else{
                    resolve(results);
                }
            })
        })
    }
}

module.exports = new Cliente;