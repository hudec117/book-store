const models = require('../models');

const validator = require('validator');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const SALT_ROUNDS = 8;

// POST /users/login
router.post('/login', (req, res) => {
    res.json([]);
});

// POST /users/register
router.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // Validate inputs
    if (validator.isEmpty(name, { ignore_whitespace: true })) {
        failure(res, 400, 'name_invalid');
    } else if (!validator.isEmail(email)) {
        failure(res, 400, 'email_invalid');
    } else if (validator.isEmpty(password, { ignore_whitespace: true })) {
        failure(res, 400, 'password_invalid');
    } else {
        // Check if user already exists by email
        models.User.findOne({ email: email }, (err, user) => {
            if (err != null) {
                // Failed to query database
                console.error(err);
                failure(res, 500, 'server_error');
            } else if (user != null) {
                // Existing user found
                failure(res, 400, 'user_exists');
            } else {
                // Existing user not found, generate password hash
                bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
                    if (err != null) {
                        console.error(err);
                        failure(res, 500, 'server_error');
                    } else {
                        const newUser = new models.User({
                            name: name,
                            email: email,
                            passwordHash: hash
                        });

                        // Insert new user into database
                        newUser.save().then(() => {
                            success(res, 'created');
                        }).catch((err) => {
                            console.error(err);
                            failure(res, 500, 'server_error');
                        });
                    }
                });
            }
        });
    }
});

function success(response, reason) {
    response.json({
        success: true,
        reason: reason
    });
}

function failure(response, code, reason) {
    response.status(code)
            .json({
                success: false,
                reason: reason
            });
}

module.exports = router;