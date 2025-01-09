const router = require('express').Router();
const userRoutes = require('./users');
const articleRoutes = require('./articles');
const { createUser, loginUser } = require('../controllers/users');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const {
  validateUserRegisterBody,
  validateUserLoginBody,
} = require('../middlewares/validation');

router.post('/signup', validateUserRegisterBody, createUser);
router.post('/signin', validateUserLoginBody, loginUser);
router.use('/users', userRoutes);
router.use('/articles', articleRoutes);
router.use(() => {
  throw new NotFoundError('Address does not exist');
});

module.exports = router;