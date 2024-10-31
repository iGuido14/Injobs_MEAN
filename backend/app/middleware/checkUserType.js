const mongoose = require('mongoose');
const axios = require('axios');
const User = require('../models/user.model');

const checkUserType = async (req, res, next) => {
    const email = req.body.user.email;
    const user = await User.findOne({ email }).exec();

    if (user.userType === 'client') {
        next();
    }

    try {
        if (user.userType === 'company') {
            // Forward POST request to backend on port 3002
            const response = await axios.post('http://localhost:3002/login', req.body);
            return res.status(response.status).json(response.data);
        }

        if (user.userType === 'admin' || user.userType === 'recruiter') {
            // Forward POST request to backend on port 3003
            const response = await axios.post('http://localhost:3003/login', req.body);
            return res.status(response.status).json(response.data);
        }
    } catch (error) {
        // Handle errors from the target server
        return res.status(500).json({ message: 'Error forwarding request', error: error.message });
    }
}

module.exports = checkUserType;