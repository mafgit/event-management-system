const jwt = require("jsonwebtoken");
const db = require("../db.js");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err)
      return res.status(403).json({ message: "Forbidden! Invalid token" });

    // Query the database to get is_admin for the user
    const query = "SELECT is_admin FROM users WHERE user_id = ?";
    db.query(query, [decodedToken.id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const is_admin = result[0].is_admin;

      req.user = {
        id: decodedToken.id,
        is_admin: is_admin || 0,
      };
      next();
    });
  });
};

const verifyAdmin = (req, res, next) => {
  if (req.user.is_admin !== 1) {
    return res
      .status(403)
      .json({ message: "Forbidden! Admin access required" });
  }
  next();
};

const verifyOrganizer = (req, res, next) => {
  const q = `select event_id from events where organized_by = ? and event_id = ?;`;
  console.log("u:", req.user.id);
  console.log("e:", req.params.id);

  db.query(q, [req.user.id, req.params.id], (err, result) => {
    console.log("result: ", result);
    if (result != undefined && result.length > 0) return next();
    else
      res
        .status(403)
        .json({ message: "Forbidden! Admin and organizer are allowed only" });
  });
};

const verifyAdminOrOrganizer = (req, res, next) => {
  if (req.user.is_admin) return next();

  const q = `select event_id from events where organizer_id = ? and event_id = ?`;
  db.query(q, [req.user.id, req.params.id], (err, result) => {
    console.log("result: ", result);
    if (result != undefined && result.length > 0) return next();
    else
      res
        .status(403)
        .json({ message: "Forbidden! Admin and organizer are allowed only" });
  });
};

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyOrganizer,
  verifyAdminOrOrganizer,
};
