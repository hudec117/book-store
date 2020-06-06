// const models = require('../models');

const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.json([]);
});

router.post('/register', (req, res) => {
    res.json([]);
});

module.exports = router;