const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
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
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } })
        if (!user) { return done(null, false, { type: 'message', message: 'That email is not registered!' }) }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) { return done(null, false, { type: 'message', message: 'Email or Password incorrect.' }) }
        return done(null, user)
      } catch (error) {
        console.log(error)
      }
    }
  ))
  // ---------------------------------------------------------FacebookStrategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ["email", "displayName"]
  },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile)
        let { name, email } = profile._json
        const user = await User.findOne({ where: { email } })
        if (user) { return done(null, user) }
        const randomPassword = Math.random().toString(36).slice(-8)
        let userCreate = await User.create({
          name,
          email,
          password: bcrypt.hashSync(randomPassword, bcrypt.genSaltSync(10), null),
          createdAt: new Date(),
          updatedAt: new Date()
        })
        return done(null, userCreate)
      } catch (error) {
        console.log(error)
      }
    }
  ))

  // ---------------------------------------------------------serialize & deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id)
      return done(null, user.get())
    } catch (error) {
      console.log(error)
    }

  })
}