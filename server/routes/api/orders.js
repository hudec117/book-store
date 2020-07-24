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
                                     .populate('book')
                                     .populate('user');

    const cleanOrders = orders.map(order => order.toClient());

    return res.json(cleanOrders);
});

// POST /api/orders (checkout)
router.post('/', jwt({ secret: process.env.JWT_SECRET }), async (req, res) => {

    // TODO: Does the stock allow for the requested quantity of books?
    // TODO: calculate total price
    // TODO: reduce each book's stock by quantity ordered

    const entries = req.body;

    if (!Array.isArray(entries)) {
        return failure(res, 400, 'invalid_body');
    }

    if (entries.length === 0) {
        return failure(res, 400, 'no_entries');
    }

    const entriesToInsert = entries.map(entry => {
        return {
            ...entry,
            user: req.user.sub,
            totalPrice: 0
        }
    });

    await models.Order.insertMany(entriesToInsert);

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