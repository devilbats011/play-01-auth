const CustomError = require('./custom-error')

class NotFoundError extends CustomError {
  statusCode = 404

  constructor() {
    super('Route not found')
  }

  serializeErrors() {
    return [{ message: 'Not Found' }]
  }
}

module.exports = NotFoundError
