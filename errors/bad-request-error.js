const CustomError = require('./custom-error')

class BadRequestError extends CustomError {
  statusCode = 400

  constructor(message) {
    super(message)
  }

  serializeErrors() {
    return [{ message: 'Not authorized' }]
  }
}

module.exports = BadRequestError
