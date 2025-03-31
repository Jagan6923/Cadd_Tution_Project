const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    guardianName: { type: String, required: true },
    guardianPhone: { type: String, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
    enrollmentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", StudentSchema);
