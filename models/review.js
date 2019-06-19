const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    instructor: String,
    lesson: String,
    rating: Number,
    review: String,
    student: String
});

module.exports = mongoose.model("Review", reviewSchema);


