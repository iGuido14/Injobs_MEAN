const asyncHandler = require('express-async-handler');
const Application = require('../models/application.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');

const getAllApplications = asyncHandler(async (req, res) => {

    const applications = await Application.find();

    return res.json(applications);
});

const generateApplication = asyncHandler(async (req, res) => {
    const slug = req.params.slug;
    const username = req.params.username;

    const product = await Product.findOne({ slug }).exec();
    const user = await User.findOne({ username }).exec();

    const application_data = {
        product: product._id,
        user: user._id,
        status: 'pending',
        isUserAccepted: false
    };

    const newApplication = await new Application(application_data).save();
    return res.json(newApplication);
});

module.exports = {
    getAllApplications,
    generateApplication
}