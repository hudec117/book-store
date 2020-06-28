const models = require('../../models');

const jwt = require('express-jwt');
const express = require('express');
const router = express.Router();

// GET /api/orders
router.get('/', jwt({ secret: process.env.JWT_SECRET }), (req, res) => {
    if (!req.user.staff) {
        return failure(res, 401, 'unauthorised');
    }

    models.Order.find({}).then(orders => {
        const ordersToReturn = orders.map(order => order.toClient());
        res.json(ordersToReturn);
    }).catch(console.error);
});

// POST /api/orders
router.post('/', jwt({ secret: process.env.JWT_SECRET }), async (req, res) => {

    // TODO: Does the stock allow for the requested quantity of books?

    const entries = req.body;

    if (!Array.isArray(entries)) {
        return failure(res, 400, 'invalid_body');
    }

    if (entries.length === 0) {
        return failure(res, 400, 'no_entries');
    }

    await models.Order.insertMany();

    res.sendStatus(201);
});

function failure(response, code, reason) {
    response.status(code)
            .json({
                success: false,
                reason: reason
            });
}

module.exports = router;