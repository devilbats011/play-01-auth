const express = require('express')
const { User } = require('../../db/models')
const NotFoundError = require('../../errors/not-found-error')

const router = express.Router()

/**
 * @swagger
 *  /users/{userId}:
 *    get:
 *      summary: View user's own profile
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the user
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
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)

  if (!user) {
    throw new NotFoundError()
  }

  res.send(user)
})

module.exports = router
