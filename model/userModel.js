const connection = require('../database/connection');

class User {
    autentica(username, hash){
        const sql = `SELECT nm_usuario, hash_senha FROM tb_usuario WHERE nm_usuario = ${username} AND hash_senha = ${hash}`;
        connection.query(sql, (error, result) => {
            if(error){
                return error;
            }else{
                return JSON.parse(result);
            }
        })
    }
}

module.exports = new User;