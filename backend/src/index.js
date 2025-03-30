// src/index.js (Backend Entry Point)
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("./configuration/dbConfig");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});