const express = require('express');
const passport = require('passport');

const registerController = require('../controllers/auth/register');
const loginController = require('../controllers/auth/login');

const router = express.Router();

router.post(
   '/login',
   loginController.validate(),
   (req, res) => loginController.handleLogin(req, res)
);

router.post(
   '/register',
   registerController.validate(),
   (req, res) => registerController.handleRegister(req, res)
);

export default router;