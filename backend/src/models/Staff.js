const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["instructor", "admin", "support"], required: true },
    assignedBatches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Batch" }],
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Staff", StaffSchema);
