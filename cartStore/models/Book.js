let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let bookSchema = new Schema(
    {
        title: String,
        price: { type: Number, required: true },
        description: { type: String },
        quantity: { type: Number, default: 0 },
        image: [String],
        price: [Number],
        quantity: [Number],
    },
    { timestamps: true }
);

let Book = mongoose.model('Book', bookSchema);

module.exports = Book;