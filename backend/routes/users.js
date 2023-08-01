const usersRouter = require('express').Router();
const usersRouterSign = require('express').Router();

const {
  login,
  createUser,
  returnAllUsers,
  returnThisUser,
  returnUserById,
  userDataChange,
  userAvatarChange,
} = require('../controllers/users');
const {
  createUserValidation,
  loginValidation,
  returnUserByIdValidation,
  userDataChangeValidation,
  userAvatarChangeValidation,
} = require('../middlewares/validationJoi');

usersRouterSign.post('signup', createUserValidation, createUser);

usersRouterSign.post('signin', loginValidation, login);

usersRouter.get('/', returnAllUsers);

usersRouter.get('/me', returnThisUser);

usersRouter.get('/:userId', returnUserByIdValidation, returnUserById);

usersRouter.patch('/me', userDataChangeValidation, userDataChange);

usersRouter.patch('/me/avatar', userAvatarChangeValidation, userAvatarChange);

module.exports = {
  usersRouter,
  usersRouterSign,
};
