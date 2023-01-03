const authController = require('express').Router();
const { body, validationResult } = require('express-validator');

const { register, login, logout } = require('../services/userService');
const { parseError } = require('../util/parser');

authController.post('/register',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
    async (req, res) => {
        try {
            const {errors} = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            
            const token = await register(req.body.email, req.body.password);
            res.json(token);
        } catch (error) {
            const message = parseError(error);
            res.status(400).json({ message });
        }
    });

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.json(token);
    } catch (error) {
        const message = parseError(error);        
        res.status(401).json({ message });
    }
});

authController.get('/logout', async (req, res) => {
    const token = req.token;
    await logout(token);
    res.status(204).end();
});

// TODO: /auth/users GET
// authController.get('/users', async (req, res) => {
//     try {
//         let users = [];
//         if (req.query.where) {
//             const userId = JSON.parse(req.query.where.split('=')[1]);
//             users = await getByUserId(userId);
//         } else {
//             users = await getAllUsers();            
//         }
//         res.json(users);    
//     } catch (error) {
//         const message = parseError(error);
//         res.status(400).json({ message });
//     }
// }); // eventually... ? // TEST!


module.exports = authController;