const express = require('express')
const { body } = require('express-validator')
const jwt = require('jsonwebtoken')

const { User } = require('../../db/models/')
const validateRequest = require('../../middlewares/validate-request')
const BadRequestError = require('../../errors/bad-request-error')
const Password = require('../../services/password')
const JWT = require('../../services/jwt')

const router = express.Router()

/**
 * @swagger
 *  /users/signin:
 *    post:
 *      summary: User signin
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *            example:
 *              email: johnsmith@email.com
 *              password: supersafepassword
 *      responses:
 *        "200":
 *          description: A JWT token
 */
router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req, res) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ where: { email } })
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials')
    }

    const passwordMatch = await Password.compare(existingUser.password, password)
    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials')
    }

    // Generate JWT
    const token = JWT.generateToken(existingUser.id, existingUser.email)

    res.status(200).send({
      token,
      user: existingUser,
    })
  }
)

module.exports = router
