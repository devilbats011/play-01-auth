const express = require('express')
const router = express.Router()

const userRoutes = require('./User/')
router.use('/users', userRoutes)
router.use(require('./swagger'))

module.exports = router
