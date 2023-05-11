const router = require('express').Router()
const passport = require('passport')


// ---------------------------------------------------------login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login',
  // failureFlash:true
}))

module.exports = router