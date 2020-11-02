class CustomError extends Error {
  statusCode

  constructor(message) {
    super(message)
    if (this.constructor === CustomError) {
      throw new Error("Can't instantiate abstract class!")
    }
  }

  serializeErrors() {
    throw new Error("Method 'serializeErrors()' must be implemented.")
  }
}

module.exports = CustomError
