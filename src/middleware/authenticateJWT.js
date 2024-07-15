// middlewares/authenticateJWT.js
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                req.user = null;
            } else {
                req.user = user;
            }
            next();
        });
    } else {
        req.user = null;
        next();
    }
};

module.exports = authenticateJWT;
