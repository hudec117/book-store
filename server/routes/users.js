const models = require('../models');

const validator = require('validator');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const SALT_ROUNDS = 8;

// TODO: Refactor User related queries and operations into a repository class? i.e. exists, create, get etc

// POST /users/login
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Validate inputs
    if (!validator.isEmail(email)) {
        return failure(res, 400, 'email_invalid');
    } else if (validator.isEmpty(password, { ignore_whitespace: true })) {
        return failure(res, 400, 'password_invalid');
    }

    // Try and find existing user, matching by email.
    let user;
    try {
        user = await models.User.findOne({ email: email }).exec();
    } catch (error) {
        console.error(error);
        return failure(res, 500, 'server_error');
    }

    if (user == null) {
        // User not found or incorrect login
        return failure(res, 401, 'unauthorised');
    }

    // Compare password with stored hash
    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
        return failure(res, 401, 'unauthorised');
    }

    // User found and correct login
    return success(res, 'logged_in');
});

// POST /users/register
router.post('/register', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // Validate inputs
    if (validator.isEmpty(name, { ignore_whitespace: true })) {
        return failure(res, 400, 'name_invalid');
    } else if (!validator.isEmail(email)) {
        return failure(res, 400, 'email_invalid');
    } else if (validator.isEmpty(password, { ignore_whitespace: true })) {
        return failure(res, 400, 'password_invalid');
    }

    // Try and find existing user, matching by email.
    let user;
    try {
        user = await models.User.findOne({ email: email }).exec();
    } catch (error) {
        console.error(error);
        return failure(res, 500, 'server_error');
    }

    // If existing user found, return 400.
    if (user != null) {
        return failure(res, 400, 'user_exists');
    }

    // Hash password
    let hash;
    try {
        hash = await bcrypt.hash(password, SALT_ROUNDS);
    } catch (error) {
        console.error(error);
        return failure(res, 500, 'server_error');
    }

    // Create new User object.
    const newUser = new models.User({
        name: name,
        email: email,
        passwordHash: hash
    });

    // Insert new user into database
    try {
        await newUser.save();
    } catch (error) {
        console.error(error);
        return failure(res, 500, 'server_error');
    }

    return success(res, 'created');
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