const bcrypt = require('bcryptjs')

const saltRounds = 10

class Password {
  static async toHash(password) {
    return bcrypt.hashSync(password, saltRounds)
  }

  static async compare(storedPassword, suppliedPassword) {
    return bcrypt.compareSync(suppliedPassword, storedPassword)
  }
}

module.exports = Password
