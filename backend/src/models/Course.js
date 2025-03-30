const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    instructor: { type: String, required: true },
    fees: { type: Number, required: true },
    technologies: { type: [String], required: true },
});

module.exports = mongoose.model("Course", courseSchema);