const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { orFailFunction } = require('../utils/errorsHandler');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(orFailFunction('InvalidAuthorizationJwt'));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-superSecret-key');
      req.user = payload;
      next();
    } catch (error) {
      next(orFailFunction('InvalidAuthorizationJwt'));
    }
  }
};
