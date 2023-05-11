const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-local').Strategy
const User = require('')
module.exports = app => {
  // ---------------------------------------------------------初始化設定
  app.use(passport.initialize())
  app.use(passport.session())
  // ---------------------------------------------------------LocalStrategy
  passport(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      await User
    }
  ))
  // ---------------------------------------------------------FacebookStrategy

  // ---------------------------------------------------------serialize & deserialize

}