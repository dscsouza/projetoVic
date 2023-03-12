const connection = require('../database/connection');

class Item {
    create(dados){
    return new Promise((resolve, reject) => {
        const [ds_item, referencia, tipo] = dados
        const sql = `CALL prd_cadastra_item(${ds_item}, ${referencia}, ${tipo})`;
        connection.query(sql, [ds_item, referencia, tipo], (error, results) => {
            if(error){
                reject(error);
            }else{
                resolve(results);
            }
        })
    })
  }
}

module.exports = new Item;