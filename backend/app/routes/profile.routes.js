module.exports = (app) => {
    const profileController = require('../controllers/profile.controller');
    const verifyJWT = require('../middleware/verifyJWT');
    const verifyJWTOptional = require('../middleware/verifyJWTOptional');

    // Get profile - authentication optional
    // app.get('/profile/:username', verifyJWTOptional, profileController.getProfile);
    app.get('/profile/:username', verifyJWTOptional, profileController.getProfile_User);

    // Follow a user
    app.post('/profile/:username/follow', verifyJWT, profileController.followUser);

    // unfollow a user
    app.delete('/profile/:username/follow', verifyJWT, profileController.unFollowUser);
}