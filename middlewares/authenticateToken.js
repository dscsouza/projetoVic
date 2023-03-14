
// Middleware para autenticação
// foi alterado o método de login do jwt simples para session
//vantagem é que não precisamos passar o token no header ou de outra forma
//isso é gerenciado automaticamente pelo express-session
module.exports =  (req, res, next) => {
  // Verifica se a sessão do usuário existe
  if (req.session.user) {
    res.user = req.session.user;
    // Se existir, permita que o middleware continue
    next();
  } else {
    // Se não existir, redirecione o usuário para a página de login
    res.redirect('/');
  }
}
