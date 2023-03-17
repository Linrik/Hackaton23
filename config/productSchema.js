import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  description: String,
  category: [String],
  price: Number,
  image: String,
  ingrediants: [String]
});

module.exports = mongoose.model("Product", productSchema, "product");