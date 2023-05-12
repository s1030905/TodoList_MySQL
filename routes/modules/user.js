const router = require('express').Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../../models')
const User = db.User


// ---------------------------------------------------------login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login',
  failureFlash: true
}))

// ---------------------------------------------------------logout
router.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('user/login')
})

// ---------------------------------------------------------register
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不一致' })
      return res.render('register', { name, email, errors })
    }
    const user = await User.findOne({ where: { email } })
    if (user) {
      errors.push({ message: '此email已被註冊' })
      return res.render('register', { name, errors })
    }
    await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
      createdAt: new Date,
      updatedAt: new Date
    })
    return res.redirect('/')
  } catch (error) {
    console.log(error)
  }

})
module.exports = router