const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

module.exports.validateUserRegisterBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.empty': 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'The "password" field must be filled in',
    }),
    name: Joi.string().required().min(2).max(30).messages({
      'string.empty': 'The "name" field must be filled in',
      'string.min': 'The minimum length of the "name" field is 2',
      'string.max': 'The maximum length of the "name" field is 30',
    }),
  }),
});

module.exports.validateUserLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.empty': 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateArticleInfoBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      'string.empty': 'The "keyword" field must be filled in',
    }),
    title: Joi.string().required().messages({
      'string.empty': 'The "title" field must be filled in',
    }),
    text: Joi.string().required().messages({
      'string.empty': 'The "text" field must be filled in',
    }),
    date: Joi.string().required().messages({
      'string.empty': 'The "date" field must be filled in',
    }),
    source: Joi.string().required().messages({
      'string.empty': 'The "source" field must be filled in',
    }),
    link: Joi.string().required().custom(validateUrl).messages({
      'string.empty': 'The "link" field must be filled in',
      'string.uri': 'The "link" field must a valid URL',
    }),
    image: Joi.string().required().custom(validateUrl).messages({
      'string.empty': 'The "image" field must be filled in',
      'string.uri': 'The "image" field must a valid URL',
    }),
  }),
});

module.exports.validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().alphanum().length(24).messages({
      'string.empty': 'The "article id" field must be filled in',
      'string.alphanum': 'The "article id" field is invalid',
      'string.length': 'The "article id" field must be 24 characters long',
    }),
  }),
});