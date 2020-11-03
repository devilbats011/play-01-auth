const express = require('express')

const { User } = require('../../db/models')
const { body } = require('express-validator')
const NotAuthorizedError = require('../../errors/not-authorized-error')
const currentUser = require('../../middlewares/current-user')
const requireAuth = require('../../middlewares/require-auth')
const validateRequest = require('../../middlewares/validate-request')

const router = express.Router()

/**
 * @swagger
 *  /users/{userId}:
 *    put:
 *      summary: User update profile
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *            example:
 *              name: John Doe
 *              phoneNumber: 0198877463
 *      responses:
 *        "200":
 *          description: Update successful
 */
router.put(
  '/:id',
  currentUser,
  requireAuth,
  [
    body('name')
      .trim()
      .isLength({ min: 3, max: 40 })
      .withMessage('Password must be between 3 and 40 characters'),
    body('phoneNumber')
      .trim()
      .isLength({ min: 10, max: 15 })
      .withMessage('phoneNumber must be between 10 and 15 characters'),
  ],
  validateRequest,
  async (req, res) => {
    const { name, phoneNumber } = req.body

    const user = await User.findByPk(req.user.id)

    if (!user) {
      throw new NotAuthorizedError()
    }

    await user.update({ name, phoneNumber })

    res.send(user)
  }
)

module.exports = router
