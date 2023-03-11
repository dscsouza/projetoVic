const userController = require('../controllers/userControllers');
const authenticateToken = require('../middlewares/authenticateToken');

module.exports = app => {
    app.post('/login', userController.login);

    // Rota protegida por autenticação
    app.get('/protegido', authenticateToken, (req, res) => {
      console.log('autenticado...')  
      res.render('dashboard', {user: req.user.username})
      });
    
    //para fins de testes essa rota encontra-se desprotegida
    //antes de ir para produção, reincluir o middleware authenticateToken
    app.get('/inclui_os', (req, res) => {
      res.render('abertura_os')
    });



}


  


  