// models/Batch.js
const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    courseId: { type: String, required: true },
    instructorId: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    capacity: { type: Number, required: true },
    enrolled: { type: Number, default: 0 },
    schedule: {
        days: { type: [String], required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
    },
});

module.exports = mongoose.model("Batch", batchSchema);