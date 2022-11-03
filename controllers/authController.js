const authController = require('express').Router();
const { register } = require('../services/userService');


authController.post('/register', async (req, res) => {
    try {
        const token = await register(req.body.email, req.body.password);
        res.json(token);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = authController;