const router = require('express').Router();
const auth = require('../middlewares/auth');


const {
  getArticles,
  addArticle,
  removeArticle,
} = require('../controllers/articles');

const {
  validateArticleInfoBody,
  validateArticleId,
} = require('../middlewares/validation');


router.get('/', auth, getArticles); // retrieve all articles
router.post('/', auth, validateArticleInfoBody, addArticle); // add a new article
router.delete('/:articleId', auth, validateArticleId, removeArticle); // remove an article

module.exports = router;