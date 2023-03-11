const custonExpress = require('./config/custon-express');
const connection = require('./database/connection');

require("dotenv").config();

connection.connect((error) => {
  if(error){
    console.log(error);
  }else{
    console.log('Conectado!');
      const app = custonExpress();
      app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
    
  }
})


    