const jwt = require('jsonwebtoken')

class JWT {
  static generateToken(id, email) {
    const token = jwt.sign(
      {
        id,
        email,
      },
      process.env.JWT_KEY
    )

    return token
  }
}

module.exports = JWT
