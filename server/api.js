const models = require('./models.js');

const express = require('express');

const router = express.Router();

router.get('/books', (req, res) => {
    models.Book.find({}, (err, books) => {
        res.json(books);
    });
});

router.get('/books/:id', (req, res) => {
    res.json([]);
});

module.exports = router;