const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./src/config.env" });
const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "admin already registered",
      });
    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
      role: "admin",
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "something went wrong",
        });
      }

      if (data) {
        return res.status(201).json({
          user: "admin created Sucessfullly. . ",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password) && user.role === "admin") {
        const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
          expiresIn: "1h",
        });
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({ message: "something went wrong" });
    }
  });
};
