const router = require('express').Router()
const home = require('./modules/home')
const user = require('./modules/user')
const auth = require('./modules/auth')
const todo = require('./modules/todo')
const { authenticator } = require('../middleware/auth')

router.use('/user', user)
router.use('/auth', auth)
router.use('/todo', authenticator, todo)
router.use('/', authenticator, home)

module.exports = router