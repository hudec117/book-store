const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/aston-book-store', { useNewUrlParser: true });

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.on('open', () => {
    console.log('Connected to aston-book-store database.');
});