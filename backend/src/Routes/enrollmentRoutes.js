const express = require("express");
const Enrollment = require("../models/Enrollment");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new enrollment
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { courseId, batchId } = req.body;

        // Ensure the user is logged in and has a valid role
        if (!req.user || req.user.role !== "user") {
            return res.status(403).json({ message: "Access denied." });
        }

        const newEnrollment = new Enrollment({
            student: req.user._id,
            course: courseId,
            batch: batchId,
        });

        await newEnrollment.save();
        res.status(201).json(newEnrollment);
    } catch (error) {
        console.error("Error creating enrollment:", error);
        res.status(500).json({ message: "Failed to create enrollment." });
    }
});

// Get enrollments for a specific student
router.get("/", authMiddleware, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(403).json({ message: "Access denied." });
        }

        const enrollments = await Enrollment.find({ student: req.user._id })
            .populate("course", "name")
            .populate("batch", "name");

        res.json(enrollments);
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        res.status(500).json({ message: "Failed to fetch enrollments." });
    }
});

module.exports = router;