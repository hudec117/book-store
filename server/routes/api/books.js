const models = require('../../models');

const express = require('express');
const router = express.Router();

// GET /api/books
router.get('/', (req, res) => {
    models.Book.find({}).then(books => {
        const booksToReturn = books.map(book => book.toClient());
        res.json(booksToReturn);
    }).catch(console.error);
});

// GET /api/books/:id
router.get('/:id', (req, res) => {
    models.Book.findById(req.params.id).then(book => {
        res.json(book.toClient());
    }).catch(console.error);
});

// PUT /api/books/:id
router.put('/:id', async (req, res) => {
    const bookId = req.params.id;
    const newStock = req.body.stock;
    
    // Validate request body
    if (!Number.isInteger(newStock)) {
        return failure(res, 400, 'invalid_stock');
    }

    const query = { _id: bookId };
    const bookToUpdate = {
        _id: bookId,
        stock: newStock
    };

    // Update book in database
    try {
        await models.Book.findOneAndUpdate(query, bookToUpdate).exec();
    } catch (error) {
        console.error(error);
        return failure(res, 500, 'server_error');
    }

    return res.sendStatus(204);
});

function failure(response, code, reason) {
    response.status(code)
            .json({
                success: false,
                reason: reason
            });
}

module.exports = router;