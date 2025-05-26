const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const verifyCallback = (req, resolve, reject, requiredRoles) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.status.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  if (requiredRoles.length) {
    const hasPermit = requiredRoles.includes(user.role);
    if (!hasPermit) {
      return reject(new ApiError(httpStatus.status.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth = (...requiredRoles) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRoles))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
