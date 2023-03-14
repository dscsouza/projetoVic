const connection = require('../database/connection');

class Cliente {
        create(dados){
        const {nm_cliente, cgc, email, telefone} = dados
        const sql = 'CALL prd_cadastra_cliente(?, ?, ?, ?)'
        
        return new Promise((resolve, reject) => {
            connection.query(sql, [nm_cliente, cgc, email, telefone], (error, results) =>{
                if(error){
                   reject(error);
                }else{
                    resolve(true);
                }
            })
        })
    }
        listAll(){
            const sql = 'SELECT * FROM tb_cliente';
            return new Promise((resolve, reject) => {
                connection.query(sql, (error, results) => {
                    if(error){
                        reject(error);
                    }else{
                        resolve(results);
                    }
                })
            })
        }
        listApproximation(atributo, valor){
        const sql = `SELECT * FROM tb_cliente WHERE ? like %?%`;
        return new Promise((resolve, reject) => {
        connection.query(sql, [atributo, valor], (error, result) => {
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        })
        });
    }
}

module.exports = new Cliente;