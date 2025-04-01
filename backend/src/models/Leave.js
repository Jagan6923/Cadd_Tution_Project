const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    type: { type: String, enum: ["casual", "sick", "vacation"], required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    appliedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Leave", LeaveSchema);
