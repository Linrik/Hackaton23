import mongoose from 'mongoose';
const { Schema } = mongoose,
    User = require('./userSchema'),
    Product = require('./productSchema')

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product
    },
    priceTotal: Number,
    orderAt: {type: Date, default: Date.now}

});

module.exports = mongoose.model("Order", orderSchema, "Order");