// src/Routes/studentEnrollmentRoutes.js
const express = require("express");
const StudentEnrollment = require("../models/StudentEnrollment");

const router = express.Router();

router.get("/:studentId", async (req, res) => {
    try {
        const studentEnrollments = await StudentEnrollment.find({ studentId: req.params.studentId })
            .populate("courseId", "name description documents")
            .populate("batchId", "name");

        res.json(studentEnrollments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching enrolled courses" });
    }
});

router.post("/", async (req, res) => {
    try {
        const newEnrollment = new StudentEnrollment(req.body);
        await newEnrollment.save();
        res.json(newEnrollment);
    } catch (error) {
        res.status(500).json({ message: "Failed to add enrollment" });
    }
});


module.exports = router;