var AuthenticationController = require('./controllers/authentication'),
    characterController = require('./controllers/character');
express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false }),
    requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        charaterRoutes = express.Router();

    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    authRoutes.get('/protected', requireAuth, function (req, res) {
        res.send({ content: 'Success' });
    });

    apiRoutes.use('/characters', charaterRoutes);
    charaterRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['player', 'admin']), characterController.save);

    app.use('/api', apiRoutes);
}