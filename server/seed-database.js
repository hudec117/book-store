require('./database');

const models = require('./models');

// Generate 10 books
const books = [];
for (let i = 0; i < 10; i++) {
    const newBook = new models.Book({
        title: 'Book ' + i,
        price: 45,
        authors: [ 'Author ' + i ],
        year: 1999,
        categories: [ 'Business' ],
        covers: [ 'https://m.media-amazon.com/images/I/51h7OAdsBYL.SX316.SY316.jpg', 'https://m.media-amazon.com/images/I/5130XwQUcTL.jpg' ],
        stock: 5
    });
    books.push(newBook);
}

models.Book.insertMany(books).then(() => {
    console.log("Seeding completed");
});

// Generate test users
const regularUser = new models.User({
    name: 'Myrtle Smith',
    email: 'user@test.com',
    passwordHash: '$2y$08$lrg/H1E1xadlJPCOxj9.2ejtWKxNciip5XaeRDN5lmqRmTR1QrlBS'
});

const staffUser = new models.User({
    name: 'Liam Woods',
    email: 'staff@test.com',
    passwordHash: '$2y$08$lrg/H1E1xadlJPCOxj9.2ejtWKxNciip5XaeRDN5lmqRmTR1QrlBS',
    staff: true
});

models.User.insertMany([ regularUser, staffUser ]);