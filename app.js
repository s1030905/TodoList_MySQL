const express = require('express')
const app = express()
const PORT = 3000
const handlebars = require('express-handlebars')
const routes = require('./routes/index')


app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})