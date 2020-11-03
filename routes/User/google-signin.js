const express = require('express')
const { User } = require('../../db/models')
const { body } = require('express-validator')
const validateRequest = require('../../middlewares/validate-request')
const JWT = require('../../services/jwt')

const router = express.Router()

router.post(
  '/google/signin',
  [
    body('googleId').trim().notEmpty().withMessage('The googleId must not be empty'),
    body('email').trim().isEmail().withMessage('The email must be valid'),
    body('name').trim().notEmpty().withMessage('The name must not be empty'),
  ],
  validateRequest,
  async (req, res) => {
    const { googleId, email, name } = req.body

    const existingUser = await User.findOne({ where: { googleId } })

    // If googleId does not exist, create a new user
    if (!existingUser) {
      // Check if the email already exists
      const existingEmail = await User.findOne({ where: { email } })

      // If email exists, update the googleId
      if (existingEmail) {
        await existingEmail.update({ googleId })
        const token = JWT.generateToken(existingEmail.id, existingEmail.email)

        return res.status(200).send({ user: existingEmail, token })
      }
      const user = await User.create({ googleId, email, name })
      const token = JWT.generateToken(user.id, user.email)

      return res.status(201).send({ user, token })
    }

    const token = JWT.generateToken(existingUser.id, existingUser.email)

    res.status(200).send({ user: existingUser, token })
  }
)

module.exports = router
