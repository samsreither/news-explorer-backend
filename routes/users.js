const router = require('express').Router();
const auth = require('../middlewares/auth'); // need to add auth file, check if user is authenticated
const { getCurrentUser } = require('../controllers/users');

router.get('/me', auth, getCurrentUser); // if auth middleware allows request to proceed, getCurrentUser will execute
// will retrieve and return info about currently authenticated user
// get CurrentUser queries database for user's details using the user ID stored in token or session

module.exports = router;