// src/Routes/studentEnrollmentRoutes.js
const express = require("express");
const StudentEnrollment = require("../models/StudentEnrollment");
const Batch = require("../models/Batch");

const router = express.Router();

router.get("/:email", async (req, res) => {
    try {
        const studentEnrollments = await StudentEnrollment.find({ email: req.params.email })
            .populate("courseId", "name description")
            .populate("batchId", "name startDate endDate capacity enrolled schedule");

        res.json(studentEnrollments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching enrolled courses" });
    }
});

router.post("/", async (req, res) => {
    try {
        const batch = await Batch.findById(req.body.batchId);

        if (!batch) {
            return res.status(404).json({ message: "Batch not found" });
        }

        if (batch.enrolled >= batch.capacity) {
            return res.status(400).json({ message: "Batch is already full" });
        }

        const newEnrollment = new StudentEnrollment(req.body);
        await newEnrollment.save();

        await Batch.findByIdAndUpdate(
            req.body.batchId,
            { $inc: { enrolled: 1 } },
            { new: true }
        );

        res.json(newEnrollment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add enrollment" });
    }
});

module.exports = router;
