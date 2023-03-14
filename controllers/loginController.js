const loginForm = (req, res) => {
    res.render('login', {msg:''}); // renderiza a view login.ejs
  }
  
  module.exports = {
    loginForm
  };