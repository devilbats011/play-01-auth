const express = require('express')
const router = express.Router()

const aboutme = require('./aboutme')
const facebookSignin = require('./facebook-signin')
const googleSignin = require('./google-signin')
const signin = require('./signin')
const signup = require('./signup')
const update = require('./update')
const view = require('./view')
const viewById = require('./view-by-id')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User auth
 */

router.use(aboutme)
router.use(facebookSignin)
router.use(googleSignin)
router.use(signin)
router.use(signup)
router.use(update)
router.use(view)
router.use(viewById)

module.exports = router
