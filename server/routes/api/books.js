const models = require('../../models');

const express = require('express');
const router = express.Router();

// GET /api/books
router.get('/', (req, res) => {
    models.Book.find({}).then(books => {
        const returnedBooks = books.map(book => book.toClient());
        res.json(returnedBooks);
    }).catch(console.error);
});

// GET /api/books/:id
router.get('/:id', (req, res) => {
    models.Book.findById(req.params.id).then(book => {
        res.json(book.toClient());
    }).catch(console.error);
});

module.exports = router;