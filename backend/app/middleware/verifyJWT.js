// const jwt = require('jsonwebtoken');
// const RefreshToken = require('../models/refreshToken.model');
// const RefreshBlacklist = require('../models/blacklistRefresh.model');
// const User = require('../models/user.model');
// const { generateAccessToken } = require('../middleware/authService');

// const verifyJWT = async (req, res, next) => {
//     const authHeader = req.headers.authorization || req.headers.Authorization;

//     if (!authHeader?.startsWith('Token ')) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const token = authHeader.split(' ')[1];

//     const loginUser = await User.findOne({ email: req.body.user.email }).exec();
//     const refresh_token = await RefreshToken.findOne({ userId: loginUser._id }).exec()

//     // return res.json({ message: refresh_token });

//     if (!refresh_token) {
//         return res.status(403).json({ message: 'Refresh token not found' });
//     } else {
//         if (refresh_token.expiryDate < Date.now()) {
//             await RefreshBlacklist.create({
//                 token: refresh_token.token,
//                 userId: loginUser._id,
//                 expiryDate: refresh_token.expiryDate
//             });
//             await RefreshToken.deleteOne({ _id: refresh_token.id });
//             return res.status(403).json({ message: 'Refresh sent to blacklist' });
//         } else {
//             jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//                 // return res.json({ message: decoded });
//                 if (err) {
//                     return res.status(403).json({ message: 'Forbidden' });
//                 }
//                 else if (decoded.expiryDate < Date.now()) {
//                     // generar uno nuevo
//                     const accessToken = generateAccessToken(loginUser);
//                     res.setHeader('Authorization', `Token ${accessToken}`);
//                     //mandar los pasos
//                     req.userId = loginUser.id;
//                     req.userEmail = loginUser.email;
//                     req.newAccessToken = accessToken;
//                     next();
//                 }
//                 else {
//                     req.userId = loginUser.id;
//                     req.userEmail = loginUser.email;
//                     next();
//                 }
//             });
//         }
//     }
// };

// module.exports = verifyJWT;


const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refreshToken.model');
const RefreshBlacklist = require('../models/blacklistRefresh.model');
const User = require('../models/user.model');
const { generateAccessToken } = require('../middleware/authService');

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // return res.json({ message: authHeader });

    if (!authHeader || !authHeader.startsWith('Token ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Check if user exists
        const loginUser = await User.findOne({ email: req.body.user.email }).exec();
        // return res.json({ message: loginUser });

        if (!loginUser) {
            return res.status(403).json({ message: 'User not found' });
        }

        // Find the refresh token associated with the user
        const refreshToken = await RefreshToken.findOne({ userId: loginUser._id }).exec();
        // return res.json({ message: refreshToken });

        if (!refreshToken) {
            return res.status(403).json({ message: 'Refresh token not found' });
        }

        // Check if refresh token has expired
        if (refreshToken.expiryDate < Date.now()) {
            await RefreshBlacklist.create({
                token: refreshToken.token,
                userId: loginUser._id,
                expiryDate: refreshToken.expiryDate
            });
            await RefreshToken.deleteOne({ _id: refreshToken.id });
            return res.status(403).json({ message: 'Refresh token has expired and sent to blacklist' });
        } else {
            let accessToken = token;
            // return res.json({ decoded_exp: decoded.exp, date_now: Date.now() / 1000 });

            if (decoded.exp < Date.now() / 1000) {
                // Token has expired, generate a new access token
                accessToken = generateAccessToken(loginUser);
                res.setHeader('Authorization', `Token ${accessToken}`);
                // return res.json({ message: decoded });
            }

            // Attach user information and access token to the request for further routes/middleware
            req.userId = loginUser.id;
            req.userEmail = loginUser.email;
            req.newAccessToken = accessToken;  // Attach the new or valid access token

            next(); // Proceed to the next middleware/route
        }
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden: Invalid token', error: error.message });
    }
};

module.exports = verifyJWT;
