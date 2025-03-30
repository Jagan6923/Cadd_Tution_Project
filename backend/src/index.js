// src/index.js (Backend Entry Point)
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./configuration/dbConfig");
const authRoutes = require("./routes/authRoutes");
const coursesRoutes = require("./Routes/courseRoutes");
const batchRoutes = require("./Routes/batchRoutes");
const userRoutes = require("./Routes/userRoutes");
const dashboardRoutes = require("./Routes/dashboardRoutes");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});