const clienteController = require('../controllers/clienteController');
const authenticateToken = require('../middlewares/authenticateToken');

module.exports = app => {
    app.get('/cadastraCliente', authenticateToken, (req, res) => {
        res.render('inclui_cliente')
      });
    app.get('/clientes', authenticateToken, clienteController.lista);
    app.post('/cliente', clienteController.cadastra);
}



