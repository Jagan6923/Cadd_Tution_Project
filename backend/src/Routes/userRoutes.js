const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get All Users (Only Admins Can Access)
router.get("/", authMiddleware, async (req, res) => {
    try {
        // Ensure only admin can access this
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const users = await User.find().select("-password"); // Exclude password
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
