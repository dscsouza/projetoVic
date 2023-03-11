const userController = require('../controllers/userControllers');
const authenticateToken = require('../middlewares/authenticateToken');

module.exports = app => {
    app.post('/login', userController.login);

    // Rota protegida por autenticação
    app.get('/protegido/:acessToken', authenticateToken, (req, res) => {
        res.render('dashboard', {'user': req.user.username})
      });
}


  


  