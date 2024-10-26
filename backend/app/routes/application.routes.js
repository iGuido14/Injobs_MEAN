module.exports = (app) => {
    const applicationController = require('../controllers/application.controller');
    // const verifyJWT = require('../middleware/verifyJWT');

    app.get('/applications', applicationController.getAllApplications);

    app.post('/application/:slug/:username', applicationController.generateApplication);
}