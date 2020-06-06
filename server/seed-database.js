require('./database');

const models = require('./models');

// Generate 10 books
const books = [];
for (let i = 0; i < 10; i++) {
    const newBook = new models.Book({
        title: 'Book ' + i,
        price: 45,
        author: 'Author ' + i,
        year: 1999,
        categories: [ 'Business' ],
        covers: [ 'https://placekitten.com/300/300' ],
        stock: 5
    });
    books.push(newBook);
}

models.Book.insertMany(books);

console.log("Seeding completed");