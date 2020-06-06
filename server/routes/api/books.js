const models = require('../../models');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    models.Book.find({}).then(books => {
        const returnedBooks = books.map(book => book.toClient());
        res.json(returnedBooks);
    }).catch(err => {
        console.log(err);
    });
});

router.get('/:id', (req, res) => {
    models.Book.findById(req.params.id).then(book => {
        res.json(book.toClient());
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;