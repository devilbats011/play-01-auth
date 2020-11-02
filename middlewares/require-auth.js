const NotAuthorizedError = require('../errors/not-authorized-error')

const requireAuth = (req, res, next) => {
  if (!req.user) {
    throw new NotAuthorizedError()
  }

  next()
}

module.exports = requireAuth
