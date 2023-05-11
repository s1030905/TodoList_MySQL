const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes/index')

app.use(router)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})