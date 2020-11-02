const express = require('express')
const router = express.Router()

const userRoutes = require('./User/')
router.use('/users/', userRoutes)

module.exports = router
