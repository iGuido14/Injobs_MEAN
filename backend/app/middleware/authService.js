const jwt = require('jsonwebtoken');

// Generate Access Token (expires in 15 mins)
const generateAccessToken = (user) => {
    return jwt.sign(
        { user: { id: user._id, email: user.email } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
};

// Generate Refresh Token (expires in 7 days)
const generateRefreshToken = (user) => {
    return jwt.sign(
        { user: { id: user._id, email: user.email } },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

module.exports = { generateAccessToken, generateRefreshToken };
