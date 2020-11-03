const express = require('express')
const { User } = require('../../db/models')
const { body } = require('express-validator')
const validateRequest = require('../../middlewares/validate-request')
const JWT = require('../../services/jwt')

const router = express.Router()

router.post(
  '/facebook/signin',
  [
    body('facebookId').trim().notEmpty().withMessage('The facebookId must not be empty'),
    body('email').trim().isEmail().withMessage('The email must be valid'),
    body('name').trim().notEmpty().withMessage('The name must not be empty'),
  ],
  validateRequest,
  async (req, res) => {
    const { facebookId, email, name } = req.body

    const existingUser = await User.findOne({ where: { facebookId } })

    // If facebookId does not exist, create a new user
    if (!existingUser) {
      // Check if the email already exists
      const existingEmail = await User.findOne({ where: { email } })

      // If email exists, update the facebookId
      if (existingEmail) {
        await existingEmail.update({ facebookId })
        const token = JWT.generateToken(existingEmail.id, existingEmail.email)

        return res.status(200).send({ user: existingEmail, token })
      }

      const user = await User.create({ facebookId, email, name })
      const token = JWT.generateToken(user.id, user.email)

      return res.status(201).send({ user, token })
    }

    const token = JWT.generateToken(existingUser.id, existingUser.email)

    res.status(200).send({ user: existingUser, token })
  }
)

module.exports = router
