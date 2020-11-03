const express = require('express')
const { User } = require('../../db/models')
const NotAuthorizedError = require('../../errors/not-authorized-error')
const currentUser = require('../../middlewares/current-user')
const requireAuth = require('../../middlewares/require-auth')

const router = express.Router()

router.get('/aboutme', currentUser, requireAuth, async (req, res) => {
  const user = await User.findByPk(req.user.id)

  if (!user) {
    throw new NotAuthorizedError()
  }

  res.send(user)
})

module.exports = router
