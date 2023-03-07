const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Usuário e senha de teste
const users = [
    {
      id: 1,
      username: 'usuario1',
      password: '$2a$10$bGFFK.UzEBZcCz4XAIhiP.u4r/1PfXrelRiG6QPM2Dz0zepGcuoEe' // senha: "senha123"
    },
    {
      id: 2,
      username: 'usuario2',
      password: '$2a$10$bGFFK.UzEBZcCz4XAIhiP.u4r/1PfXrelRiG6QPM2Dz0zepGcuoEe' // senha: "senha123"
    }
  ];


const userController = {
    login: async (req, res) => {
        const { username, password } = req.body;
        console.log(`usuário: ${username} Senha: ${password}`);
        const user = users.find(u => u.username === username);

        if (!user) {
            console.log('erro no login');
            return res.status(401).send('Usuário ou senha inválidos');

        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
                res.json({ accessToken: accessToken });
                console.log('verificando senha');
            } else {
                res.status(401).send('Usuário ou senha inválidos');
            }
        } catch (err) {
            console.error(err);
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