const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Middleware para autenticação
module.exports =  (req, res, next) => {
  
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