var AuthenticationController = require('./controllers/authentication'),
    characterController = require('./controllers/character'),
    raceController = require('./controllers/race');
    classController = require('./controllers/classes');
express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false }),
    requireLogin = passport.authenticate('local', { session: false });


module.exports = function(app) {
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        charaterRoutes = express.Router(),
        raceRoutes = express.Router();
        classesRoutes = express.Router();

    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    authRoutes.get('/protected', requireAuth, function(req, res) {
        res.send({ content: 'Success' });
    });

    apiRoutes.use('/characters', charaterRoutes);
    charaterRoutes.post('/getPlayerCharacters', requireAuth, AuthenticationController.roleAuthorization(['player', 'admin']), characterController.getCharactersForUser);
    charaterRoutes.post('/createCharacter', requireAuth, AuthenticationController.roleAuthorization(['player', 'admin']), characterController.save);
    charaterRoutes.post('/validateName', requireAuth, AuthenticationController.roleAuthorization(['player', 'admin']), characterController.validateCharacterName);

    apiRoutes.use('/races', raceRoutes);
    raceRoutes.post('/getAllRaces', requireAuth, AuthenticationController.roleAuthorization(['player', 'admin']), raceController.getAll);
    raceRoutes.post('/getByType', requireAuth, AuthenticationController.roleAuthorization(['player', 'admin']), raceController.getByType);

    apiRoutes.use('/classes', classesRoutes);
    classesRoutes.post('/getAll', requireAuth,AuthenticationController.roleAuthorization(['player','admin']),classController.getAll);

    app.use('/api', apiRoutes);
}