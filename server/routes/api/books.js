const models = require('../../models');

const { v4: uuidv4 } = require('uuid');
const path = require('path');

const fileUpload = require('express-fileupload');
const jwt = require('express-jwt');
const express = require('express');
const router = express.Router();

const COVERS_FOLDER = 'covers';

const MIME_TO_EXT_MAP = {
    'image/jpeg': '.jpg',
    'image/png': '.png'
};

// GET /api/books (get all books)
router.get('/', (req, res) => {
    models.Book.find({}).then(books => {
        const booksToReturn = books.map(book => book.toClient());
        res.json(booksToReturn);
    }).catch(console.error);
});

// GET /api/books/:id (get specific book)
router.get('/:id', (req, res) => {
    models.Book.findById(req.params.id).then(book => {
        res.json(book.toClient());
    }).catch(console.error);
});

// POST /api/books (create book)
router.post('/', fileUpload(), jwt({ secret: process.env.JWT_SECRET }), async (req, res) => {
    // Create new Book object
    const bookObj = JSON.parse(req.body.book);
    let newBook = new models.Book(bookObj);

    // Validate the book
    try {
        await newBook.validate();
    } catch (error) {
        return failure(res, 400, error.message);
    }

    // Validate the covers
    const covers = Array.isArray(req.files) ? req.files.covers : [req.files.covers];
    if (covers.length < 1) {
        return failure(res, 400, 'invalid_covers');
    }

    // Attempt to upload covers
    try {
        for (const cover of covers) {
            const mimeType = cover.mimetype;
            const fileName = `${uuidv4()}${MIME_TO_EXT_MAP[mimeType]}`;

            const clientPath = `${COVERS_FOLDER}/${fileName}`;
            const serverPath = path.join('public', COVERS_FOLDER, fileName);

            await cover.mv(serverPath);
            newBook.covers.push(clientPath);
        }
    } catch (error) {
        console.error(error);
        return failure(res, 500, 'server_upload_error');
    }

    // Insert book
    try {
        newBook = await newBook.save();
    } catch (error) {
        console.error(error);
        return failure(res, 500, 'server_error');
    }

    return res.json(newBook.toClient());
});

// PUT /api/books/:id (update book)
router.put('/:id', jwt({ secret: process.env.JWT_SECRET }), async (req, res) => {
    if (!req.user.staff) {
        return failure(res, 401, 'unauthorised');
    }

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