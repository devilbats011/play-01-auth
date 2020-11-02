const express = require('express')
const router = express.Router()

const aboutme = require('./aboutme')
const signin = require('./signin')
const signup = require('./signup')
const update = require('./update')
const view = require('./view')
const viewById = require('./viewById')

router.use(aboutme)
router.use(signin)
router.use(signup)
router.use(update)
router.use(view)
router.use(viewById)

module.exports = router
