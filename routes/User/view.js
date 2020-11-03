const express = require('express')
const { User } = require('../../db/models/')

const router = express.Router()

/**
 * @swagger
 *  /users:
 *    get:
 *      summary: Get all users
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: An array of user objects
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.send(users)
})

module.exports = router
