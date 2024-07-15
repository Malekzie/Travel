require('dotenv').config();
const validate = require('../utils/validator');
const userService = require('../services/userService');

const register = async (req, res) => {
    const data = req.body;
    console.log(data);

    const rules = {
        username: 'required',
        email: 'required|email',
        password: 'required|min:8',
        confirmPassword: 'required|string|min:8|same:password'
    };

    const { passes, errors } = validate(data, rules);

    if (passes) {
        try {
            await userService.register(data);
            res.redirect('/auth/login');
        } catch (error) {
            console.error("Registration error:", error);
            if (error.message === 'User already exists') {
                res.status(400).send('User already exists with this email.');
            } else {
                res.status(500).send('Internal server error');
            }
        }
    } else {
        res.status(400).send(errors);
    }
};

const login = async (req, res) => {
    const data = req.body;
    try {
        const user = await userService.login(data);

        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        // Implement session handling or token generation here

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send('Internal server error');
    }
};

module.exports = {
    register,
    login
};
