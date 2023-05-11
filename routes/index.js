const router = require('express').Router()
const home = require('./modules/home')
const user = require('./modules/user')
const { authenticator } = require('../middleware/auth')

router.use('/user', user)
router.use('/', authenticator, home)

module.exports = router