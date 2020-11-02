const express = require('express')
const { User } = require('../../db/models/')

const router = express.Router()

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.send(users)
})

module.exports = router
