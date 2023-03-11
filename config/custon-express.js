const express = require('express'); //importando o express
const consign = require('consign'); //importando o consign
const path = require('path');

module.exports = () => {
    const app = express(); //Criando o app
    app.use('/', express.static(path.join(__dirname, "../static")));
    app.use(express.json()); 
    app.use(express.urlencoded({extended: true}));
    app.set('view engine', 'ejs');
    app.set('views', './views');
    
    
    //Incluindo a pasta de rotas no app
    consign()
        .include('routes')
        .into(app);
    return app;
}
           