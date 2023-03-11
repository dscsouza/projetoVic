const custonExpress = require('./config/custon-express');
const app = custonExpress();


require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

    