const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {validationResult} = require('express-validator');
const dotenv = require("dotenv");
// dotenv.config({ path: "./src/config.env" });
dotenv.config({ path: "./src/config.env" });
const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = (req, res) => {
// const errors = validationResult(req);
// return res.status(400).json({ errors: errors.array() })


  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });
    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "something went wrong",
        });
      }

      if (data) {
        return res.status(201).json({
          user: "user created Sucessfullly. . ",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
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


