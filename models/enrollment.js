const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    lesson: String,
    program: String,
    student: String,
    instructor: String,
    startdate: Date,
    enddate: Date,
    time: String,
    status: {type:String, default: 'For Confirmation'} 
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);


