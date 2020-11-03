/**
|--------------------------------------------------
| Swagger set up
|--------------------------------------------------
*/
const express = require('express')
const router = express.Router()
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const models = ['./db/models/*.js']

const routes = ['./routes/**/*.js']

const apis = [...routes, ...models]

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'One Company Closer Auth Server API Doc',
      version: '1.0.0',
      description: 'A descriptive API documentation for One Company Closer Auth Server ',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'Amar Hafizuddeen',
        url: 'https://www.linkedin.com/in/amar-hafizuddeen/',
        email: 'amarhafizuddeen@gmail.com',
      },
    },
    servers: [],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis,
}

const specs = swaggerJsdoc(options)

router.use('/docs', swaggerUi.serve)
router.get(
  '/docs',
  swaggerUi.setup(specs, {
    explorer: false,
  })
)

module.exports = router
