const jwt = require('jsonwebtoken')

const currentUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next()
  }

  try {
    const token = req.headers.authorization.replace('Bearer ', '')
    const payload = jwt.verify(token, process.env.JWT_KEY)
    req.user = payload
  } catch (err) {
    console.error(err)
  }

  next()
}

module.exports = currentUser
