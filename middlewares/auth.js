const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

// authenticate requests by verifying JWT sent in authorization header
// if successful, allows request to proceed and attaches user info to the req object
// if invalid or missing, throws unauthorized error

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Authorization required');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret',
    );
  } catch (err) {
    throw new UnauthorizedError('Authorization required');
  }

  req.user = payload;
  next();
};