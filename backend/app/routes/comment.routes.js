module.exports = (app) => {
    const verifyJWT = require('../middleware/verifyJWT');
    const verifyJWTOptional = require('../middleware/verifyJWTOptional');
    const commentController = require('../controllers/comment.controller');
    // const User = require('../models/user.model');

    app.post('/:slug/comments', verifyJWT, commentController.addCommentsToProduct);

    app.get('/:slug/comments', verifyJWTOptional, commentController.getCommentsFromProduct);

    app.delete('/:slug/comments/:id', verifyJWT, commentController.deleteComment);
}