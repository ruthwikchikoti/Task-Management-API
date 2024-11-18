const express = require('express');
const { register, login } = require('../controllers/auth.js');
const { validateRegister, validateLogin } = require('../middleware/validators.js');

const router = express.Router();

router.post('/register', validateRegister, register);

router.post('/login', validateLogin, login);

module.exports = router;
