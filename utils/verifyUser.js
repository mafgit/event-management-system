const jwt = require("jsonwebtoken");
const db = require("../db.js"); 

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) return res.status(403).json({ message: 'Forbidden! Invalid token' });

        // Query the database to get isAdmin for the user
        const query = "SELECT isAdmin FROM users WHERE user_id = ?";
        db.query(query, [decodedToken.id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            const isAdmin = result[0].isAdmin; 

            req.user = {
                id: decodedToken.id,
                isAdmin: isAdmin || 0 
            };
            next();
        });
    });
};

const checkAdmin = (req, res, next) => {
    if (req.user.isAdmin !== 1) { 
        return res.status(403).json({ message: 'Forbidden! Admin access required' });
    }
    next(); 
};

module.exports = { verifyToken, checkAdmin };
