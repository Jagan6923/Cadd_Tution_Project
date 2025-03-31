const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("../models/Staff");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new staff member (Admin only)
router.post("/register", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const { name, email, phone, role, password } = req.body;
        const existingStaff = await Staff.findOne({ email });

        if (existingStaff) {
            return res.status(400).json({ message: "Staff member already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newStaff = new Staff({ name, email, phone, role, password: hashedPassword });

        await newStaff.save();
        res.status(201).json({ message: "Staff registered successfully" });
    } catch (error) {
        console.error("Error registering staff:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get all staff members (Admin only)
router.get("/", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const staffMembers = await Staff.find().populate("assignedBatches", "name");
        res.json(staffMembers);
    } catch (error) {
        console.error("Error fetching staff members:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Assign a batch to a staff member
router.put("/assign-batch/:staffId", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const { batchId } = req.body;
        const staff = await Staff.findById(req.params.staffId);

        if (!staff) {
            return res.status(404).json({ message: "Staff member not found" });
        }

        if (!staff.assignedBatches.includes(batchId)) {
            staff.assignedBatches.push(batchId);
            await staff.save();
        }

        res.json({ message: "Batch assigned successfully", staff });
    } catch (error) {
        console.error("Error assigning batch:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete a staff member (Admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        await Staff.findByIdAndDelete(req.params.id);
        res.json({ message: "Staff deleted successfully" });
    } catch (error) {
        console.error("Error deleting staff:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
