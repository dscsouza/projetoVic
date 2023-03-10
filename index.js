const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const login = require("./routes/login")
const app = express();
const path = require('path');

require("dotenv").config();


// Middleware para autenticação
function authenticateToken(req, res, next) {
  
  // const token = req.headers['authorization'];
  const token = req.params.acessToken
  
  //console.log(authHeader)
  //const token = authHeader && authHeader.split(' ')[1];
  console.log(token)
  if (token == null) return res.status(401).send('Não autorizado');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
	if (err) return res.status(403).send('Token inválido');
	req.user = user;
	next();
  });
}

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/', express.static(path.join(__dirname, "static")));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use("/login", login)

// Rota protegida por autenticação
app.get('/protegido/:acessToken', authenticateToken, (req, res) => {
  
  res.render('dashboard', {'user': req.user.username})

});





app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});