const jwt = require('jsonwebtoken');

const verifyJWTOptional = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader || !authHeader?.startsWith('Token ') || !authHeader.split(' ')[1].length) {
        req.loggedin = false;
        return next();
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        // return res.json({ message: decoded })
        if (err) {
            return res.status(403).json({ message: err });
        }
        req.loggedin = true;
        req.userId = decoded.user.id;
        req.userEmail = decoded.user.email;
        // req.userHashedPwd = decoded.user.password;
        // return res.json({ message: req.userEmail })
        // return res.json({ message: req.userId });
        next();
    })
};

module.exports = verifyJWTOptional;
