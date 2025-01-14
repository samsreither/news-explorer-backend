// models are for storing files with described schemas and models

const mongoose = require("mongoose");
const validator = require('validator');


// defining what properties a user should have
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator(value) {
            return validator.isEmail(value);
          },
          message: 'Email already in use',
        },
      },
      password: {
        type: String,
        required: true,
        select: false,
      },
})

userSchema.statics.findUserByCredentials = function findUserByCredentials(
    email,
    password,
  ) {
    if (!email || !password) {
      return Promise.reject(new UnauthorizedError('Incorrect email or password'));
    }
    return this.findOne({ email })
      .select('+password')
      .then((user) => {
        if (!user) {
          return Promise.reject(
            new UnauthorizedError('Incorrect email or password'),
          );
        }
        return bcrypt.compare(password, user.password).then((matched) => {
          if (!matched) {
            return Promise.reject(
              new UnauthorizedError('Incorrect email or password'),
            );
          }
          return user;
        });
      });
  };

module.exports = mongoose.model("user", userSchema);