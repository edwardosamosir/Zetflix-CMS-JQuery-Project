const router = require('express').Router();
const UserController = require('../controllers/userController');

// Home Page Register and Login
router.post('/register', UserController.registerNewAdmin)
router.post('/login', UserController.login)
router.post('/login-with-google', UserController.googleLogin)

module.exports = router;

