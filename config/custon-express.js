const express = require('express'); //importando o express
const consign = require('consign'); //importando o consign

module.exports = () => {
    const app = express(); //Criando o app
    app.use(express.json()); 
    app.use(express.urlencoded({extended: true}));
    //Incluindo a pasta de rotas no app
    consign()
        .include('routes')
        .into(app);
    return app;
}
           