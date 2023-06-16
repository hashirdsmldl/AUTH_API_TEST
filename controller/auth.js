const User = require("../Schema/userschema");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      phone: req.body.phone,
      password: hashedPassword,
    });

    const result = await user.save();
    res.status(201).send({
      message: "User Created Successfully",
      result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating user",
      error,
    });
  }
};

exports.loginUser = (req, res) => {
  User.findOne({ phone: req.body.phone })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(req.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return res.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
             userName:user.username,
              userPhone: user.phone,
            },
           process.env.SECRET_KEY,
            { expiresIn: "24h" }
          );

          //   return success response
          res.status(200).send({
            message: "Login Successful",
            phone: user.phone,
            username:user.username,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          res.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      res.status(404).send({
        message: "Email not found",
        e,
      });
    });
};