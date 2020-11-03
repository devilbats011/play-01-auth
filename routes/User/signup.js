const express = require('express')
const { body } = require('express-validator')
const jwt = require('jsonwebtoken')

const { User } = require('../../db/models/')
const validateRequest = require('../../middlewares/validate-request')
const BadRequestError = require('../../errors/bad-request-error')
const JWT = require('../../services/jwt')

const router = express.Router()

/**
 * @swagger
 *  /users/signup:
 *    post:
 *      summary: User registration
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *            example:
 *              name: John Smith
 *              email: johnsmith@email.com
 *              password: supersafepassword
 *              phoneNumber: 0112345678
 *      responses:
 *        "201":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.post(
  '/signup',
  [
    body('name')
      .trim()
      .isLength({ min: 3, max: 40 })
      .withMessage('Password must be between 3 and 40 characters'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters'),
    body('phoneNumber')
      .trim()
      .isLength({ min: 10, max: 15 })
      .withMessage('phoneNumber must be between 10 and 15 characters'),
  ],
  validateRequest,
  async (req, res) => {
    const { name, email, password, phoneNumber } = req.body

    const existingUser = await User.findOne({ where: { email } })

    if (existingUser) {
      throw new BadRequestError('Email in use')
    }

    const user = await User.create({ name, email, password, phoneNumber })

    // Generate JWT
    const token = JWT.generateToken(user.id, user.email)

    res.status(201).send({
      token,
      user,
    })
  }
)

module.exports = router
