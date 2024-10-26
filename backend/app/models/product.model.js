const mongoose = require('mongoose');
const slugify = require('slugify');
const uniqueValidator = require('mongoose-unique-validator');
const User = require('./user.model.js');
const { log } = require('console');

const ProductSchema = mongoose.Schema({
    slug: {
        type: String,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [],
    img: {
        type: String,
        required: true
    },
    id_cat: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    favouritesCount: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    isClosed: {
        type: Boolean,
        default: false
    },
    isAccepted: {
        type: Boolean,
        default: false
    }
});

ProductSchema.plugin(uniqueValidator, { msg: "already taken" });

ProductSchema.pre('validate', async function (next) {
    if (!this.slug) {
        console.log('dentro del if');
        await this.slugify();
    }
    console.log(this.slug);
    next();
});

ProductSchema.methods.slugify = async function () {
    this.slug = slugify(this.name) + '-' + (Math.random() * Math.pow(36, 10) | 0).toString(36);
};

// ================================================================

ProductSchema.methods.toProductResponse = async function (user) {
    const User = mongoose.model('User');  // Lazy loading User model
    const authorObj = await User.findById(this.author).exec();

    // return authorObj;
    return {
        slug: this.slug,
        name: this.name,
        price: this.price,
        description: this.description,
        id_cat: this.id_cat,
        img: this.img,
        images: this.images,
        favorited: user ? user.isFavourite(this._id) : false,
        favoritesCount: this.favouritesCount,
        author: authorObj.toProfileJSON(user),
        isClosed: this.isClosed
    }
}

ProductSchema.methods.toProductCarouselResponse = async function () {
    return {
        images: this.images
    }
}

ProductSchema.methods.updateFavoriteCount = async function () {
    // return "hola2";
    const User = mongoose.model('User');
    const favoriteCount = await User.count({
        favouriteProducts: { $in: [this._id] }
    });

    this.favouritesCount = favoriteCount;

    return this.save();
}

ProductSchema.methods.addComment = function (commentId) {
    if (this.comments.indexOf(commentId) === -1) {
        this.comments.push(commentId);
    }
    return this.save();
};

ProductSchema.methods.removeComment = function (commentId) {
    if (this.comments.indexOf(commentId) !== -1) {
        this.comments.remove(commentId);
    }
    return this.save();
};

module.exports = mongoose.model('Product', ProductSchema);