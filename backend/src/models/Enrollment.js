const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Enrollment", EnrollmentSchema);