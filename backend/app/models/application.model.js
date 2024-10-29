const mongoose = require('mongoose');
const User = require("./user.model");
const Product = require('./product.model');

const ApplicationSchema = mongoose.Schema({
    slug: {
        type: String,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    asignedRecruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    isUserAccepted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Application', ApplicationSchema);