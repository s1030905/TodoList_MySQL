const express = require('express')
const app = express()
const PORT = 3000
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const routes = require('./routes/index')


app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  resave: false,
  secret: 'No secret',
  saveUninitialized: true
}))

// app.use(flash())
// app.use((req, res, next) => {
//   res.locals.isAuthenticate = req.isAuthenticate()
//   res.locals.user = req.user
//   res.flash.message = req.flash('message')
//   next()
// })
app.use(routes)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})