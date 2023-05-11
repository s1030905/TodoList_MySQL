const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
module.exports = app => {
  // ---------------------------------------------------------初始化設定
  app.use(passport.initialize())
  app.use(passport.session())
  // ---------------------------------------------------------LocalStrategy
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    // { usernameField: 'email', passReqToCallback: true },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } })
        if (!user) { return done(null, false) }
        // if (!user) { return done(null, user, req.flash('warning', '此用戶尚未註冊')) }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) { return done(null, false) }
        // if (!isMatch) { return done(null, false, req.flash('warning', '密碼錯誤')) }

        return done(null, user)
      } catch (error) {
        console.log(error)
      }
    }
  ))
  // ---------------------------------------------------------FacebookStrategy

  // ---------------------------------------------------------serialize & deserialize
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id)
    return done(null, user)
  })
}