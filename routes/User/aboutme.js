const express = require('express')
const { User } = require('../../db/models')
const NotAuthorizedError = require('../../errors/not-authorized-error')
const currentUser = require('../../middlewares/current-user')
const requireAuth = require('../../middlewares/require-auth')

const router = express.Router()

/**
 * @swagger
 *  /users/aboutme:
 *    get:
 *      summary: View user's own profile
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        "200":
 *          description: A user object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        "404":
 *          description: User with the id provided does not exist
 */
router.get('/aboutme', currentUser, requireAuth, async (req, res) => {
  const user = await User.findByPk(req.user.id)

  if (!user) {
    throw new NotAuthorizedError()
  }

  res.send(user)
})

module.exports = router
