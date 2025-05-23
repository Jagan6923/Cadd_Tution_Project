// src/index.js (Backend Entry Point)
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./configuration/dbConfig");
const authRoutes = require("./Routes/authRoutes");
const coursesRoutes = require("./Routes/courseRoutes");
const batchRoutes = require("./Routes/batchRoutes");
const userRoutes = require("./Routes/userRoutes");
const dashboardRoutes = require("./Routes/AdminDashboardRoutes");
const leaveRoutes = require("./Routes/leaveRoutes");
const StudentEnrollmentRoutes = require("./Routes/studentEnrollmentRoutes");


const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://cadd-tution-project-rnoe.vercel.app/"
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"]
    })
  );
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/enrollments", StudentEnrollmentRoutes);


app.get("/", (req, res) => {
    res.send("Welcome to the backend server!");
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});