const connection = require('../database/connection');

class User {
    autentica(username){
        const sql = `SELECT nm_usuario, hash_senha FROM tb_usuario WHERE nm_usuario = ?`;
       return new Promise((resolve, reject) => {
        (connection.query(sql, username, (error, results) => {
            const retonroSql = results[0];
            if(error){
                reject(error)
            }
               resolve (retonroSql)
            
        }))
       })
    }

}

module.exports = new User;


/*

class User {
    async  autentica(username){
          const sql = `SELECT nm_usuario, hash_senha FROM tb_usuario WHERE nm_usuario = ?`;
         return new Promise((resolve, reject) => {
          (connection.query(sql, username, (error, results) => {
              if(error){
                  reject(error)
              }
                 resolve (results)
              
          }))
         })
      }
  
  }*/
  