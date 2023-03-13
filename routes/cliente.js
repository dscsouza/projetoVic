const clienteController = require('../controllers/clienteController');
const authenticateToken = require('../middlewares/authenticateToken');

module.exports = app => {
    app.post('/cliente', clienteController.cadastra);
    app.post('/cadastraCliente', authenticateToken, clienteController.cadastra);
}



