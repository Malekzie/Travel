require('dotenv').config();
const validate = require('../utils/validator');
const userService = require('../services/userService');
const jwt = require('../utils/jwt');

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

        const token =  jwt.generateToken(user);
        const refreshToken = jwt.generateRefreshToken(user);
     
          res.cookie('token', token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               sameSite: 'strict'
          })

          res.cookie('refreshToken', refreshToken, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               sameSite: 'strict'
          })
          res.redirect('/profile')
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send('Internal server error');
    }
};

const refresh = async (req, res) => {
     const { refreshToken } = req.body;

     if (!refreshToken) {
          return res.status(400).send('Refresh token is required');
     }

     try {
          const user = await jwt.verifyRefreshToken(refreshToken);
          
          const newToken = jwt.generateToken(user);

          res.json({ token: newToken });
     } catch(error) {
          console.error("Refresh token error:", error);
          res.status(403).send('Invalid Refresh Token');
     }
}

module.exports = {
    register,
    login,
    refresh
};
