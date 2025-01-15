// to store functions
const bcrypt = require('bcryptjs'); // library hash user passwords before storing in a database
const jwt = require('jsonwebtoken'); // library for creating and verifying JSON Web Tokens for user auth
const User = require('../models/user'); // model for interacting with users collection in mongoose database
const { ConflictError } = require('../utils/errors/ConflictError');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { BadRequestError } = require('../utils/errors/BadRequestError');

const { NODE_ENV, JWT_SECRET } = process.env;

// retrieves currently authenticated user's info
module.exports.getCurrentUser = (req, res, next) => {
  console.log('Authenticated user:', req.user); //log the user ID

  User.findById(req.user._id)
    // .orFail(new NotFoundError('No user with that id'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.error('Error finding user:', err.message);
      console.error(err.stack); // log the error
      next(err);
    });
};

// create new user account with hashed passwords
module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      const newUser = {
        name: user.name,
        email: user.email,
      };
      res.send({ data: newUser });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Email already in use'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid data'));
      } else {
        next(err);
      }
    });
};


// login a user by validating credentials and issuing a JWT
module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret',
        {
          expiresIn: '1d',
        },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};