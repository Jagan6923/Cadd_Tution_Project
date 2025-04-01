const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Leave = require("../models/Leave");

const router = express.Router();

// Submit Leave Request
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { startDate, endDate, reason, type } = req.body;

        if (!startDate || !endDate || !reason || !type) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newLeave = new Leave({
            staffId: req.user.id,
            startDate,
            endDate,
            reason,
            type,
        });

        await newLeave.save();
        res.status(201).json({ message: "Leave request submitted successfully" });
    } catch (error) {
        console.error("Error submitting leave request:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get Leave Requests
router.get("/", authMiddleware, async (req, res) => {
    try {
        const query = req.user.role === "admin" ? {} : { staffId: req.user.id };
        const leaves = await Leave.find(query)
            .populate("staffId", "name")
            .exec();
        res.json(leaves);
    } catch (error) {
        console.error("Error fetching leave requests:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Admin: Approve/Reject Leave Request
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const { status } = req.body;
        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const leave = await Leave.findById(req.params.id);
        if (!leave) {
            return res.status(404).json({ message: "Leave request not found" });
        }

        leave.status = status;
        await leave.save();

        res.json({ message: `Leave request ${status} successfully` });
    } catch (error) {
        console.error("Error updating leave status:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;