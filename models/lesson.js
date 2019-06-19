const mongoose = require('mongoose');


const lessonSchema = new mongoose.Schema({
    instrument: String,
    image: String,
    programs: [
        {name: String, duration: Number}
    ]
});

module.exports = mongoose.model("Lesson", lessonSchema);


