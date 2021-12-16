let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let itemSchema = new Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String },
        quantity: { type: Number, default: 0 },
        image: { String },
    },
    { timestamps: true }
);

let Item = mongoose.model('Item', itemSchema);

module.exports = Item;