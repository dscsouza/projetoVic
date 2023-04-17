const clienteController = require('../controllers/clienteController');
const authenticateToken = require('../middlewares/authenticateToken');

module.exports = app => {
    app.get('/cadastraCliente', authenticateToken, (req, res) => {
        res.render('inclui_cliente', { msg: '' })
      });
    app.get('/clientes',  clienteController.lista);
    app.put('/cliente', clienteController.listaId);
    app.get('/pesquisaAproximacao', clienteController.listaSelecao);
    app.put('/edita-cliente', clienteController.edita);
    app.get('/exclui-cliente', clienteController.exclui);
    app.post('/cliente', clienteController.cadastra);
}



