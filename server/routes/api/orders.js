const models = require('../../models');

const jwt = require('express-jwt');
const express = require('express');
const router = express.Router();

// GET /api/orders (get all orders)
router.get('/', jwt({ secret: process.env.JWT_SECRET }), async (req, res) => {
    if (!req.user.staff) {
        return failure(res, 401, 'unauthorised');
    }

    const orders = await models.Order.find()
                                     .populate('entries.book')
                                     .populate('user');

    const cleanOrders = orders.map(order => order.toClient());

    return res.json(cleanOrders);
});

// POST /api/orders (checkout)
router.post('/', jwt({ secret: process.env.JWT_SECRET }), async (req, res) => {
    const entries = req.body;

    // Check entries are valid
    if (!Array.isArray(entries)) {
        return failure(res, 400, 'invalid_body');
    }

    if (entries.length === 0) {
        return failure(res, 400, 'no_entries');
    }

    const books = await models.Book.find();
    const booksMap = books.reduce((map, currentValue) => {
        map.set(currentValue.id, currentValue);
        return map;
    }, new Map());

    // Create the order and go through each entry from the client.
    const order = {
        entries: [],
        user: req.user.sub,
        totalPrice: 0
    };
    for (const entry of entries) {
        const book = booksMap.get(entry.book);

        if (entry.quantity > book.stock) {
            return failure(res, 400, 'missing_stock');
        } else {
            order.totalPrice += book.price * entry.quantity;

            order.entries.push({
                book: book.id,
                quantity: entry.quantity
            });

            book.stock -= entry.quantity;
        }
    }

    // Insert the new order
    const orderDoc = new models.Order(order);
    await models.Order.insertMany(orderDoc);

    // Save all the new book stocks
    await Promise.all(books.map(book => book.save()));

    return res.sendStatus(201);
});

function failure(response, code, reason) {
    response.status(code)
            .json({
                success: false,
                reason: reason
            });
}

module.exports = router;