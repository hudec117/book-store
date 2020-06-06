require('./database');

const bodyParser = require('body-parser');
const users = require('./routes/users');
const booksAPI = require('./routes/api/books');

module.exports = app => {
    app.use(bodyParser.json());
    app.use('/users', users);
    app.use('/api/books', booksAPI);
};