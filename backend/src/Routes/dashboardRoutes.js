const express = require("express");
const User = require("../models/User");
const Course = require("../models/Course");
const Batch = require("../models/Batch");
const Enrollment = require("../models/Enrollment");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get Admin Dashboard Data
router.get("/", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const totalStudents = await User.countDocuments({ role: "user" });
        const totalCourses = await Course.countDocuments();
        const activeBatches = await Batch.countDocuments();

        const recentEnrollments = await Enrollment.find()
            .sort({ createdAt: -1 })
            .limit(3)
            .populate("student", "name")
            .populate("course", "name");

        const upcomingBatches = await Batch.find({ startDate: { $gte: new Date() } })
            .sort({ startDate: 1 })
            .limit(3);

        res.json({
            totalStudents,
            totalCourses,
            activeBatches,
            recentEnrollments: recentEnrollments.map((e) => ({
                name: e.student.name,
                course: e.course.name,
                enrolledDate: e.createdAt.toISOString().split("T")[0],
            })),
            upcomingBatches: upcomingBatches.map((b) => ({
                batch: b.name,
                startDate: b.startDate.toISOString().split("T")[0],
                seatsLeft: b.availableSeats,
            })),
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
