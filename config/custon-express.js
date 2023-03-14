const express = require('express'); //importando o express
const consign = require('consign'); //importando o consign
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');


module.exports = () => {
    const app = express(); //Criando o app
    app.use(express.static(path.join(__dirname, "../static")));
    app.use(express.json()); 
    app.use(express.urlencoded({extended: true}));

          //implementando o session ao inves do jwt
      // Configuração da sessão
      app.use(session({
        secret: process.env.ACCESS_TOKEN_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
      }));

      // Parser de cookies
      app.use(cookieParser());




    app.set('view engine', 'ejs');
    app.set('views', './views');
    
    
    //Incluindo a pasta de rotas no app
    consign()
        .include('routes')
        .into(app);
    return app;
}
           