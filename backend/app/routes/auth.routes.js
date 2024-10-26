const checkUserType = require('../middleware/checkUserType');

module.exports = (app) => {
    const express = require('express');
    const userController = require('../controllers/user.controller');
    const { refreshToken } = require('../controllers/auth.controller');

    const router = express.Router();

    // Authentication
    app.post('/users/login', checkUserType, userController.userLogin);

    // Registration
    app.post('/users', userController.registerUser);
}