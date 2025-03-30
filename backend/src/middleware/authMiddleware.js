// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    if (!process.env.JWT_SECRET) {
        console.error("❌ JWT_SECRET is missing! Authentication will fail.");
        return res.status(500).json({ message: "Server misconfiguration. Contact admin." });
    }

    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token." });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
