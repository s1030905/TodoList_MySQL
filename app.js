const express = require('express')
const app = express()
const PORT = 3000
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes/index')


app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})