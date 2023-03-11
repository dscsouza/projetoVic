const clienteController = require('../controllers/clienteController');

module.exports = app => {
    app.post('/cliente', clienteController.cadastra)
}

