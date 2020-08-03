require('./database');

const bodyParser = require('body-parser');
const users = require('./routes/users.js');
const booksAPI = require('./routes/api/books.js');
const ordersAPI = require('./routes/api/orders.js');

// Configure all the API routes for the app
module.exports = app => {
    app.use(bodyParser.json());
    app.use('/users', users);
    app.use('/api/books', booksAPI);
    app.use('/api/orders', ordersAPI);
    // eslint-disable-next-line no-unused-vars
    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401).json({
                success: false,
                reason: 'unauthorised'
            });
        }
    });
};