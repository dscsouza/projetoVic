const itemController = require('../controllers/itemController');
const authenticateToken = require('../middlewares/authenticateToken');

module.exports = app => {
    app.post('/item', itemController.cadastra);
    app.get('/estoque', authenticateToken, (req, res) => {
        res.render('inclui_item')
      });
}