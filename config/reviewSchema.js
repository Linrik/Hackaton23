const mongoose = require("mongoose"),
      User = require('./userSchema')

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
     },
    rating: Number,
    comment: {
        String,
        required: false
    },
    postedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Comment", reviewSchema, "comment");