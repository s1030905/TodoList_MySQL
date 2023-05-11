const router = require('express').Router()
const home = require('./modules/home')
const user = require('./modules/user')

router.use('/user', user)
router.use('/', home)

module.exports = router