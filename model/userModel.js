const connection = require('../database/connection');

class User {
    autentica(username){
        const sql = `SELECT nm_usuario, hash_senha FROM tb_usuario WHERE nm_usuario = ${username}`;
        connection.query(sql, (error, result) => {
            if(error){
                console.log('if aqui')
                console.log(error)
                return false;
            }else{
                console.log('else aqui')
                return result;
            }
        })
    }

    encrypt(password){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    }

}

module.exports = new User;