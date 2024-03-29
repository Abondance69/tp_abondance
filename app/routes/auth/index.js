const authRoute = require('express').Router(),
    authController = require('../../controllers/auth');

module.exports = (app) => {
    authRoute.post('/sign-in', authController.signIn)
    app.use('/api/v1', authRoute)
}
