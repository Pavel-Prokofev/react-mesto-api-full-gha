const ValidationError = require('./errors/ValidationError');
const InvalidAuthorization = require('./errors/InvalidAuthorization');
const Forbidden = require('./errors/Forbidden');
const NotFoundError = require('./errors/NotFoundError');
const EmailNotUnique = require('./errors/EmailNotUnique');

const statusCreatingOk = 201;

const orFailFunction = (errMessage) => new Error(errMessage);

const identificationError = (err) => {
  if (err.name === 'ValidationError') {
    return new ValidationError('Переданы некорректные данные.');
  }
  if (err.name === 'CastError') {
    return new ValidationError('Передан некорректнй id.');
  }
  if (err.message === 'InvalidAuthorization') {
    return new InvalidAuthorization('Неверные почта или пароль.');
  }
  if (err.message === 'InvalidAuthorizationJwt') {
    return new InvalidAuthorization('Необходима авторизация');
  }
  if (err.message === 'Forbidden') {
    return new Forbidden('У вас нет прав на удаление этой карточки');
  }
  if (err.message === 'NotFound') {
    return new NotFoundError('По указанному _id ничего не найдено.');
  }
  if (err.message === 'NotFoundUrl') {
    return new NotFoundError('Неверный URl запроса.');
  }
  if (err.code === 11000) {
    return new EmailNotUnique('Такая почта уже зарегистрирована.');
  }
  return err;
};

module.exports = {
  statusCreatingOk,
  orFailFunction,
  identificationError,
};
