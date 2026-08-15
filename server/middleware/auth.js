// This middleware protects routes that should only work for logged-in users.
// It runs BEFORE the route handler and checks for a valid JWT token.
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // The frontend sends the token like: Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user's id to the request so route handlers know WHO is asking
    req.userId = decoded.userId;
    next(); // token is valid, let the request continue to the actual route
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

module.exports = protect;
