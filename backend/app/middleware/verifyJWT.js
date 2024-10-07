const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refreshToken.model');

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Token ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    const refresh_token = await RefreshToken.findOne({ userId: req.user._id }).exec();

    if (refresh_token.expiryDate < Date()) {
        //aquí mandar a la blacklist ====================================
        return res.status(403).json({ message: 'Refresh depricated' });
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.userId = decoded.user.id;
            req.userEmail = decoded.user.email;
            next();
        });
    }
};

module.exports = verifyJWT;
