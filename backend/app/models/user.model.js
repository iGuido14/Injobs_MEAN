const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require("jsonwebtoken");
const { refreshToken } = require('../controllers/auth.controller');
const Product = require('../models/product.model.js');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    bio: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: "https://static.productionready.io/images/smiley-cyrus.jpg"
    },
    favouriteProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    followingUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followersUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},
    {
        timestamps: true
    });

userSchema.plugin(uniqueValidator);

userSchema.methods.toUserResponse = function (jwt_access) {
    return {
        username: this.username,
        email: this.email,
        bio: this.bio,
        image: this.image,
        accessToken: jwt_access,
        // refreshToken: jwt_refresh
    };
};

userSchema.methods.toProfileJSON = function (user) {
    return {
        username: this.username,
        bio: this.bio,
        image: this.image,
        following: user ? user.isFollowing(this._id) : false
    }
};

userSchema.methods.toSeeProfileUser = function (user_logged, followerList, n_followers, followList, n_follows, products) {
    if (user_logged) {
        return {
            username: this.username,
            bio: this.bio,
            image: this.image,
            followerList: followerList,
            n_followers: n_followers,
            followList: followList,
            n_follows: n_follows,
            following: user_logged.isFollowing(this._id),
            products: products
        }
    } else {
        return {
            username: this.username,
            bio: this.bio,
            image: this.image,
            followerList: followerList,
            n_followers: n_followers,
            followList: followList,
            n_follows: n_follows,
            following: false,
            products: products
        }
    }
};

// manejar el seguir a alguien (following)
userSchema.methods.isFollowing = function (id) {
    const idStr = id.toString();
    for (const followingUser of this.followingUsers) {
        if (followingUser.toString() === idStr) {
            return true;
        }
    }
    return false;
};

userSchema.methods.follow = function (id) {
    if (this.followingUsers.indexOf(id) === -1) {
        this.followingUsers.push(id);
    }
    return this.save();
};

userSchema.methods.unfollow = function (id) {
    if (this.followingUsers.indexOf(id) !== -1) {
        this.followingUsers.remove(id);
    }
    return this.save();
};

// manejar el que alguien te siga (follower)
userSchema.methods.isFollower = function (id) {
    const idStr = id.toString();
    for (const followerUser of this.followersUsers) {
        if (followerUser.toString() === idStr) {
            return true;
        }
    }
    return false;
};

userSchema.methods.addFollower = function (id) {
    if (this.followersUsers.indexOf(id) === -1) {
        this.followersUsers.push(id);
    }
    return this.save();
};

userSchema.methods.removeFollower = function (id) {
    if (this.followersUsers.indexOf(id) !== -1) {
        this.followersUsers.remove(id);
    }
    return this.save();
};


// manejar likes
userSchema.methods.isFavourite = function (id) {
    const idStr = id.toString();
    for (const product of this.favouriteProducts) {
        if (product.toString() === idStr) {
            return true;
        }
    }
    return false;
}

userSchema.methods.favorite = function (id) {
    if (this.favouriteProducts.indexOf(id) === -1) {
        this.favouriteProducts.push(id);
    }

    // const product = await Product.findById(id).exec();
    //
    // product.favouritesCount += 1;
    //
    // await product.save();

    return this.save();
}

userSchema.methods.unfavorite = function (id) {
    if (this.favouriteProducts.indexOf(id) !== -1) {
        this.favouriteProducts.remove(id);
    }

    // const product = await Product.findById(id).exec();
    //
    // product.favouritesCount -= 1;
    //
    // await product.save();

    return this.save();
};

module.exports = mongoose.model('User', userSchema);
