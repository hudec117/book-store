import { Book, User, Order } from './models.js';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/book-store', { useNewUrlParser: true });

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.on('open', () => {
    console.log('Connected!');
});