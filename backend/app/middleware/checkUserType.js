const mongoose = require('mongoose');

const checkUserType = (req, res, next) => {
    const { user } = req.body;
    const { userType } = user;

    if (userType === 'client') {
        next();
    }

    if (userType === 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    if (userType === 'company') {
        return res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = checkUserType;