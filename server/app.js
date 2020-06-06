const models = require('./models.js');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/book-store', { useNewUrlParser: true });

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.on('open', () => {
    console.log('Connected to book-store database.');
});

router.get('/api/books', function(req, res) {
    models.Book.find({}, (err, books) => {
        res.json(books);
    });
});

app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server listening on port ' + port)
});