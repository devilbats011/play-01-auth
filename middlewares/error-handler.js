const CustomError = require('../errors/custom-error')

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }

  console.error(err)
  res.status(500).send({
    errors: [
      {
        message: 'Something went wrong',
      },
    ],
  })
}

module.exports = errorHandler
