require('dotenv').config();
const validate = require('../utils/validator');
const userService = require('../services/userService');
const jwt = require('../utils/jwt');

const register = async (req, res) => {
    const data = req.body;


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

        const token = jwt.generateToken(user);
        const refreshToken = jwt.generateRefreshToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.redirect('/profile');
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send('Internal server error');
    }
};


const refresh = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token required' });
    }

    try {
        const user = await jwt.verifyRefreshToken(refreshToken);

        // Check if the user still exists
        const existingUser = await userService.findUserById(user.id);
        if (!existingUser) {
            return res.status(401).json({ message: 'User not found' });
        }

        const newToken = jwt.generateToken(existingUser);
        const newRefreshToken = jwt.generateRefreshToken(existingUser);

        res.cookie('token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.json({ token: newToken });
    } catch (error) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
}


const uploadProfilePictureHandler = async (req, res) => {
    try {
        const result = await uploadImageToS3(req.file);
        const imageUrl = result.Location; // URL of the uploaded image

        // Save imageUrl to your database associated with the user
        await saveImageUrlToDatabase(req.user.id, imageUrl);

        res.json({ imageUrl });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

const logout = (req, res) => {
    // Clear the cookies
    res.clearCookie('token');
    res.clearCookie('refreshToken');

    // Redirect to login page or home page
    res.redirect('/auth/login');
};

module.exports = {
    register,
    login,
    refresh,
    uploadProfilePictureHandler,
    logout
};
