const userController = require('../controllers/userControllers');
const authenticateToken = require('../middlewares/authenticateToken');
const loginController = require('../controllers/loginController')

module.exports = app => {
    app.get('/', loginController.loginForm);
    app.post('/login', userController.login);

    // Rota protegida por autenticação
    app.get('/dashboard', authenticateToken, (req, res) => {
      console.log('autenticado...')  
      res.render('dashboard', { msg: '', user: res.user.usuario })
      });
    
    //para fins de testes essa rota encontra-se desprotegida
    //antes de ir para produção, reincluir o middleware authenticateToken
    app.get('/abreOs', authenticateToken, (req, res) => {
      
      res.render('abertura_os', { msg: '' })
    });

    app.get('/inclui_usuario', authenticateToken, (req, res) => {
      res.render('inclui_usuario', { msg: '' })
    });    
    



}


  


  