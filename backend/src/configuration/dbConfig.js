// configuration/dbConfig.js
const mongoose = require("mongoose");

const DB_URI = process.env.MONGO_URI || "mongodb+srv://caddproject:cadd1234@caddproject.ptzatgt.mongodb.net/mydatabase?retryWrites=true&w=majority";

mongoose
    .connect(DB_URI)  
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

module.exports = mongoose;
