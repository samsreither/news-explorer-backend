const Article = require('../models/article');
const { ForbiddenError } = require('../utils/errors/ForbiddenError');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { BadRequestError } = require('../utils/errors/BadRequestError');

// find article by id
module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
};

// add article to database
module.exports.addArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      res.send({ data: article });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid data'));
      } else {
        next(err);
      }
    });
};

// remove an article
module.exports.removeArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('+owner')
    // .orFail(new NotFoundError('No item with that id'))
    .then((article) => {
      if (article.owner.toString() === req.user._id) {
        Article.findByIdAndDelete(article._id)
          .orFail()
          .then(() => {
            res.send({ data: article });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        throw new ForbiddenError('Access denied');
      }
    })
    .catch((err) => {
      next(err);
    });
};