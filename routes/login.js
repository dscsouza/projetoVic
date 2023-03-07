var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const userController = require('../controllers/userControllers');



// Rota de login
router.post('/', userController.login);

module.exports = router;
  