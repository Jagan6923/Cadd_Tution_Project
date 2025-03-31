// routes/courseRoutes.js (Express example)
const express = require("express");
const router = express.Router();
const Course = require("../models/Course"); // Assuming you have a Course model

// Get all courses
router.get("/", async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

// Add a new course
router.post("/", async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.json(newCourse);
    } catch (error) {
        res.status(500).json({ error: "Failed to add course" });
    }
});

// Edit a course
router.put("/:id", async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: "Failed to update course" });
    }
});

// Delete a course
router.delete("/:id", async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);

        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json({ message: "Course deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete course" });
    }
});


module.exports = router;
