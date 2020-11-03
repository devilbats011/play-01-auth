const express = require('express')
const { body } = require('express-validator')
const jwt = require('jsonwebtoken')

const { User } = require('../../db/models/')
const validateRequest = require('../../middlewares/validate-request')
const BadRequestError = require('../../errors/bad-request-error')

const router = express.Router()

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters'),
  ],
  validateRequest,
  async (req, res) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ where: { email } })

    if (existingUser) {
      throw new BadRequestError('Email in use')
    }

    const user = await User.create({ email, password })

    // Generate JWT
    const token = JWT.generateToken(user.id, user.email)

    res.status(201).send({
      token,
      user,
    })
  }
)

module.exports = router
