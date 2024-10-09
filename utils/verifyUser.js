const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) return res.status(403).json({ message: 'Forbidden! Invalid token' });
      req.user = decodedToken.id;
      next();
    });
};

module.exports = verifyToken;