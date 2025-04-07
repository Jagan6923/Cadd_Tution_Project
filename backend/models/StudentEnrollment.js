// src/models/StudentEnrollment.js
const mongoose = require("mongoose");

const StudentEnrollmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    guardianName: { type: String, required: true },
    guardianPhone: { type: String, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
});

module.exports = mongoose.model("StudentEnrollment", StudentEnrollmentSchema);