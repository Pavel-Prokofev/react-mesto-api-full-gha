const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');
const {
  statusCreatingOk,
  orFailFunction,
} = require('../utils/errorsHandler');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (password.length < 7) {
    const err = new Error();
    err.name = 'ValidationError';
    throw err;
  } else {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name, about, avatar, email, password: hash,
      }))
      .then((newUser) => {
        res.status(statusCreatingOk).send({
          name: newUser.name,
          about: newUser.about,
          avatar: newUser.avatar,
          email: newUser.email,
          _id: newUser._id,
        });
      })
      .catch(next);
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-superSecret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const returnAllUsers = (req, res, next) => {
  User.find({})
    .then((allUsers) => res.send(allUsers))
    .catch(next);
};

const returnThisUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw orFailFunction('NotFound'); })
    .then((user) => res.send(user))
    .catch(next);
};

const returnUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => { throw orFailFunction('NotFound'); })
    .then((user) => res.send(user))
    .catch(next);
};

const userDataChange = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => { throw orFailFunction('NotFound'); })
    .then((user) => res.send(user))
    .catch(next);
};

const userAvatarChange = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => { throw orFailFunction('NotFound'); })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  login,
  createUser,
  returnAllUsers,
  returnThisUser,
  returnUserById,
  userDataChange,
  userAvatarChange,
};
