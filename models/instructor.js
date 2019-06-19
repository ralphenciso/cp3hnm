const mongoose = require('mongoose');


const instructorSchema = new mongoose.Schema({
    name: String,
    profile: String,
    instruments: [String],
    image: String,
    videos: {type: [String], default: null}
});

module.exports = mongoose.model("Instructor", instructorSchema);


