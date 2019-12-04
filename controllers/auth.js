const bcrypt = require ('bcryptjs');
const db = require('../models');

// POST REGISTEr - CREATE NEW USER

const register = (req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
    return res.status(400).json({ status: 400, message: 'Please fill out all the information'});
  }
  //Verify Account Does Not Already Exist
  db.User.findOne({email: req.body.email }, (err, foundUser) => {
    if (err) return res.status(500).json({ status: 500, message: "Somethign went wrong. Please try again"});

    if (foundUser) return res.status(400).json({ status: 400, message: "Email address has already been registered. Please try again" });

    // Generate Salt
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again'});
      // Hash User Password
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again'});

        const newUser = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
        }

        db.User.create(newUser, (err, savedUser) => {
          if (err) return res.status(500).json({
            status: 500, message: err
          });
          res.status(201).json({
            message: 'user created',
            user: savedUser
          });
        });
      });
    });
  });
};


// POST LOGIN - AUTHENTICATE USER, Create Session

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({status: 400, message: "Please enter your email and password"});    
  }
  db.User.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) return res.status(500).json({status:500, message: 'Something went wrong. Please try again'});

    if (!foundUser) {
      return res.status(400).json({status: 400, message: "Email or password is incorrect"});
    }
    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return res.status(500).json({ status: 500, message: 'Somethign went wrong. Please try again'});

      if (isMatch) {
        req.session.currentUser = {id: foundUser._id};
        console.log(req.session)
        return res.status(200).json({ status: 200, message: 'Success', data: foundUser._id });
      } else {
        return res.status(400).json({ status: 400, message: 'Email or password is incorrect'});
      }
    });
  });
};

module.exports = {
  register,
  login,
};