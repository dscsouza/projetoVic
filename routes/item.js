const itemController = require('../controllers/itemController');

module.exports = app => {
    app.post('/item', itemController.cadastra)
}