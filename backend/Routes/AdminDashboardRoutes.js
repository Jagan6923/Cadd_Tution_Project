// Routes/enrollmentRoutes.js
const express = require("express");
const User = require("../models/User");
const Course = require("../models/Course");
const Batch = require("../models/Batch");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
        const totalStudents = await User.countDocuments({ role: "user" });
        const totalCourses = await Course.countDocuments();
        const activeBatches = await Batch.countDocuments();
        res.json({
            totalStudents,
            totalCourses,
            activeBatches,
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
