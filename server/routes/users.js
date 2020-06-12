const models = require('../models');

const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const SALT_ROUNDS = 8;

// TODO: store securely
const JWT_SECRET = 'secret_key';

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

    const token = createToken(user);

    // User found and correct login
    return success(res, 'logged_in', token);
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
    let newUser = new models.User({
        name: name,
        email: email,
        passwordHash: hash
    });

    // Insert new user into database
    try {
        newUser = await newUser.save();
    } catch (error) {
        console.error(error);
        return failure(res, 500, 'server_error');
    }

    const token = createToken(newUser);

    return success(res, 'created', token);
});

function createToken(user) {
    return jwt.sign({
        sub: user._id,
        name: user.name,
        staff: user.staff
    }, JWT_SECRET, {
        algorithm: 'HS256'
    });
}

function success(response, reason, token) {
    response.json({
        success: true,
        reason: reason,
        token: token
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