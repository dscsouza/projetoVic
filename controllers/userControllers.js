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
        const user = credencial[0].nm_usuario == username
        const hash_senha = credencial[0].hash_senha

        if (!user) {
            console.log('erro no login');
            return res.status(401).send('Usuário ou senha inválidos');
        }

        try {
            if (await bcrypt.compare(password, hash_senha)) {
                const accessToken = jwt.sign({ username: credencial.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
                res.json({ accessToken: accessToken });
            } else {
                res.status(401).send('Usuário ou senha inválidos');
            }
        } catch (err) {
            res.status(500).send('Erro no servidor');
        }
    },
    encrypt: (text) => {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(text, salt);
        return hash;
    },
}

module.exports = userController