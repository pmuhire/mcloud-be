const _ = require("lodash");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const cloudinary = require('cloudinary').v2;
const {
  validateUserRegisteration,
  validateUserAuthenatication,
} = require("../validators/user.validator");
const fs = require('fs')

dotenv.config();

exports.addUser = async (req, res) => {
  try {
    const user = req.body;
    console.log(req.body);
    const validateUserInput = validateUserRegisteration(user);

    if (validateUserInput.error) {
      return res.status(400).json(validateUserInput.error.details[0].message);
    }
    const duplicateEmail = await User.findOne({ where: { email: user.email } });
    if (duplicateEmail) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "This email address has already been used!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.verificationToken = jwt.sign(
      {
        firstName: user.firstName,
        email: user.email,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "365d" }
    );
    // }, process.env.TOKEN_SECRET, { expiresIn: '365d' });

    // UPLOAD PROFILE TO CLOUDINARY
    const filePath = user.profile_picture;

    cloudinary.config({
      cloud_name: process.env.CLOUDNAME,
      api_key: process.env.APIKEY,
      api_secret: process.env.APISECRET
    });
    const randomNumber = Math.floor(Math.random() * 10000);
    await cloudinary.uploader.upload(filePath,
      { public_id: `MCLOUD/profile_picture/${user.lastName}/${user.lastName+user.firstName}${randomNumber}` },
      function (error, result) { 
        if(!error){
          user.profile_picture=result.secure_url;
        }else{
          console.log(error);
        }
       }
    );

    const newUser = await User.create(
      _.pick(user, [
        "firstName",
        "lastName",
        "email",
        "password",
        "profile_picture"
      ])
    );

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Account created. Please verify via email!",
      data: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, password } =
      req.body;
    const id = req.params.uuid;
    await User.findOne({ where: { uuid: id } }).then(async (user) => {
      if (user) {
        await user
          .update(
            { password, firstName, lastName, profile_picture },
            { where: { uuid: req.params.uuid } }
          )
          .then(() =>
            res.status(200).json({
              status: "success",
              message: "User with id: " + id + " " + "UPDATED",
            })
          );
      } else
        res.status(404).send({ message: "User with that id doesn't exist" });
    });
  } catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
};

exports.getUsers = async (req, res) => {
  try {
    await User.findAll().then((users) => res.status(200).json(users));
  } catch (err) {
    return res.status(500).send(err);
  }
};
exports.getUser = async (req, res) => {
  const { uuid } = req.params;
  try {
    const user = await User.findOne({ where: { uuid } }).then((user1) => {
      res.status(200).json(user1);
    });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.signIn = async (req, res) => {
  try {
    console.log(req.body);
    const validateUserInput = validateUserAuthenatication(req.body);

    if (validateUserInput.error) {
      return res.status(400).json(validateUserInput.error.details[0].message);
    }

    const user = await User.findOne({ where: { email: req.body.email } });
    console.log("user is here");

    if (!user) {
      return res.status(404).send({ message: "Invalid Email or Password!" });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Email or Password!" });
    }
    // if (!user.verified) {
    //   return res.status(400).send({ message: 'Please first verify your account!' });
    // }

    const token = jwt.sign(
      {
        uuid: user.uuid,
        email: user.email,
        roleId: user.roleId,
      },
      process.env.TOKEN_SECRET
      // ,
      // {
      //   expiresIn: 86400, // 24 hours
      // }
    );
    // req.session.email = user.email;
    // req.session.uuid = user.uuid;
    // req.session.roleId = user.roleId;
    // req.session.pass = req.body.password;
    // console.log(`password ${req.session.email}`);
    res.status(200).send({ token, user });
  } catch (error) {
    res.status(404);
    res.send(error.toString());
    console.log(error);
  }
};