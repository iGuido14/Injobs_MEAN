const mongoose = require('mongoose');
const User = require('../models/user.model');

const checkUserType = async (req, res, next) => {
    const email = req.body.user.email;
    const user = await User.findOne({ email }).exec();

    if (user.userType === 'client') {
        next();
    }

    if (user.userType === 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    if (user.userType === 'company') {
        return res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = checkUserType;