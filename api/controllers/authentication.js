/**
@class authentication
@module api
*/


var jwt = require('jsonwebtoken');
var User = require('../models/user');
//var authConfig = require('../../config/auth');
var configProvider = require('../../configProvider');
var config = new configProvider();

/**
 *  generate a JWT Token
 * @method generateToken
 * @param {user} user
 * @return CallExpression
 */
function generateToken(user) {
    config.load().then((config) => {
        return jwt.sign(user, config.secret, {
            expiresIn: 10080
        });
    });

}

/**
 *  creates new user object
 * @method setUserInfo
 * @param {User} request
 * @return ObjectExpression
 */
function setUserInfo(request) {
    return {
        _id: request._id,
        email: request.email,
        role: request.role
    };
}

function countUsers(callback) {
    User.find({}, function (err, users) {
        callback(users.length);
    });
}

/**
 * logs the user in
 * @method login
 * 
 * @param {req} req
 * @param {} res
 * @param {} next
 */
exports.login = function (req, res, next) {

    var userInfo = setUserInfo(req.user);
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });

}

/**
 * registers the user
 * @method register
 * @param {} req
 * @param {} res
 * @param {} next
 */
exports.register = function (req, res, next) {

    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;

    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address' });
    }

    if (!password) {
        return res.status(422).send({ error: 'You must enter a password' });
    }

    User.findOne({ emai: email }, function (err, existingUser) {
        if (err) {
            return next(err);
        }

        if (existingUser) {
            return res.status(422).send({ error: 'That email address is already in use' });
        }

        var user = new User({
            email: email,
            password: password,
            role: role
        });

        user.save(function (err, user) {
            registeredUsers++;
            if (err) {
                return next(err);
            }

            var userInfo = setUserInfo(user);
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })
        });
    });
}

/**
 * checks the roles passed in on an api call
 * @method roleAuthorization
 * @param {} roles
 * @return FunctionExpression
 */
exports.roleAuthorization = function (roles) {
    return function (req, res, next) {

        var user = req.user;

        User.findById(user._id, function (err, foundUser) {

            if (err) {
                res.status(422).json({ error: 'No user found.' });
                return next(err);
            }

            if (roles.indexOf(foundUser.role) > -1) {
                return next();
            }

            res.status(401).json({ error: 'You are not authorized to view this content' });
            return next('Unauthorized');

        });

    }

}
