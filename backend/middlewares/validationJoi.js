const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');

const checkUrl = (url) => {
  if (isURL(url)) { return url; }
  throw new Error('Невалидный URL.');
};

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(50),
    avatar: Joi.string().custom(checkUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(7),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(7),
  }),
});

const returnUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().required().length(24),
  }),
});

const userDataChangeValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(50).required(),
  }),
});

const userAvatarChangeValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(checkUrl).required(),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().custom(checkUrl).required(),
  }),
});

const paramsCardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
});

module.exports = {
  createUserValidation,
  loginValidation,
  returnUserByIdValidation,
  userDataChangeValidation,
  userAvatarChangeValidation,
  createCardValidation,
  paramsCardIdValidation,
};
