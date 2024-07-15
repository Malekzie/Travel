const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
     return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
     return jwt.verify(token, process.env.JWT_SECRET);
};

const generateRefreshToken = (payload) => {
     return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

const verifyRefreshToken = (token) => {
     return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}


module.exports={
     generateToken,
     verifyToken,
     generateRefreshToken,
     verifyRefreshToken
}