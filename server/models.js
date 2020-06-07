const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    authors: {
        type: [String],
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    categories: {
        type: [String],
        enum: ['Computing', 'Business', 'Languages']
    },
    covers: {
        type: [String],
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    }
});

bookSchema.method('toClient', function() {
    var obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;

    return obj;
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    staff: {
        type: Boolean,
        default: false
    }
});

userSchema.method('toClient', function() {
    var obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;

    return obj;
});

const orderSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

orderSchema.method('toClient', function() {
    var obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;

    return obj;
});

const Book = mongoose.model('Book', bookSchema);
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = {
    Book,
    User,
    Order
};