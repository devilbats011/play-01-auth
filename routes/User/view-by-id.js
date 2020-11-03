const express = require('express')
const { User } = require('../../db/models')
const NotFoundError = require('../../errors/not-found-error')

const router = express.Router()

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)

  if (!user) {
    throw new NotFoundError()
  }

  res.send(user)
})

module.exports = router
