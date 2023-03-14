const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel')


// Usuário e senha de teste
// const users = [
//     {
//       id: 1,
//       username: 'usuario1',
//       password: '$2a$10$bGFFK.UzEBZcCz4XAIhiP.u4r/1PfXrelRiG6QPM2Dz0zepGcuoEe' // senha: "senha123"
//     },
//     {
//       id: 2,
//       username: 'usuario2',
//       password: '$2a$10$bGFFK.UzEBZcCz4XAIhiP.u4r/1PfXrelRiG6QPM2Dz0zepGcuoEe' // senha: "senha123"
//     }
//   ];


const userController = {
    login: async (req, res) => {
        const { username, password } = req.body;
        console.log(`usuário: ${username} Senha: ${password}`);
        const credencial = await User.autentica(username)
        const user = credencial.nm_usuario == username
        const hash_senha = credencial.hash_senha

        if (!user) {
            console.log('erro no login');
            return res.status(401).send('Usuário ou senha inválidos');
        }

        try {
            if (await bcrypt.compare(password, hash_senha)) {
                
                req.session.user = {
                    usuario: credencial.nm_usuario,
                    logadoEm: new Date()
                  };
                  res.redirect('/dashboard');
            } else {
                res.render('login',{msg: 'Usuário ou senha inválidos'});
            }
        } catch (err) {
            console.log(err)
            res.render('login',{msg:'Erro no servidor'});
        }
    },
    encrypt: (text) => {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(text, salt);
        return hash;
    },
}

module.exports = userController