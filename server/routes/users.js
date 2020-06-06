// const models = require('../models');

const express = require('express');
const router = express.Router();

// GET /users/login
router.get('/login', (req, res) => {
    res.json([]);
});

// POST /users/register
router.post('/register', (req, res) => {
    res.json([]);
});

module.exports = router;