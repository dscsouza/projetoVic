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
        listId(valor){
            const sql = `SELECT * FROM tb_cliente WHERE ?`;
        return new Promise((resolve, reject) => {
            connection.query(sql, valor, (error, result) => {
                console.log(result)
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
            
    }
        listAll(count, qtd){
            const sqlTotalRegistros = 'SELECT COUNT(*) as totalRegistros FROM tb_cliente';
            let valores = {
                totalPages: 0.0,
                dados: null,
            }
            return new Promise((resolve, reject) => {
                connection.query(sqlTotalRegistros, (error, results) => {
                    if(error){
                        reject(error);
                    }else{
                        const totalRegistros = parseInt(results[0].totalRegistros);
                        // Alterei essa linha para dividir o total de registros pela
                        // quantidade de itens por página e arredondar para cima
                        valores.totalPages = Math.ceil(totalRegistros / qtd); 
                        const sql = `SELECT * FROM tb_cliente LIMIT ${qtd} OFFSET  ${count}`;
                        connection.query(sql, (error, results) => {
                            if(error){
                                reject(error);
                            }else{
                                console.log(valores);
                                valores.dados = results;
                                console.log(valores);
                                resolve(valores);
                            }
                        }) 
                    }
                })
            })
    }
        listApproximation(atributo, valor){
        const sql = `SELECT * FROM tb_cliente WHERE ${atributo} LIKE '%${valor}%'`;
        return new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        })
        });
    }
        edit(id_cliente, valor){
        const sql = `UPDATE tb_cliente SET ? WHERE id_cliente = ${id_cliente}`;
        return new Promise((resolve, reject) => {
            connection.query(sql, valor, (error, result) => {
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            })
        })  
    }
        delete(valor){
            const sql = `DELETE FROM tb_cliente WHERE ?`;
        return new Promise((resolve, reject) => {
            connection.query(sql, valor, (error, result) => {
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
            
    }
}

module.exports = new Cliente;