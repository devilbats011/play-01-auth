require('dotenv').config()
require('./db/models')
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { json } = require('body-parser')

const routes = require('./routes')
const errorHandler = require('./middlewares/error-handler')
const NotFoundError = require('./errors/not-found-error')

const app = express()
app.use(json())

if (process.env.NODE_ENV === 'production') {
  app.use(cors())
} else {
  app.use(helmet())
}

//temporary solution -- todo: study what the use of helmet() for..
app.use(cors())
//--------temporary solution----------------

app.use(routes)

app.get('/', (req, res) => {
  res.send(
    'API server is up and running... <a href="/docs">Click here</a> to access the API documentations.'
  )
})

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}...`)
})
