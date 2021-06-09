const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./src/config.env" });
const JWT_SECRET = process.env.JWT_SECRET;

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "authoraizatrion required" });
  }

  next();
};

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(400).json({ message: "User Access denied" });
      }
      next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "admin Access denied" });
  }
  next();
};
