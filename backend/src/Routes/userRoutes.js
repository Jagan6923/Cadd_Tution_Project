const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get All Users (Only Admins Can Access)
router.get("/", authMiddleware, async (req, res) => {
    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// PUT /api/users/:id/role - Admin can update user role
router.put("/:id/role", authMiddleware, async (req, res) => {
    const { role } = req.body;
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied." });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select("-password");

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json(updatedUser);
    } catch (err) {
        console.error("Error updating role:", err);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
