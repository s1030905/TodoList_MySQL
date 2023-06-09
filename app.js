if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
const routes = require('./routes/index')

// 模板引擎
app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
// 設置並啟用會話
app.use(session({
  resave: false,
  secret: 'No secret',
  saveUninitialized: true
}))
// 請求正文
app.use(express.urlencoded({ extended: true }))
// 轉換PUT或DELETE請求
app.use(methodOverride('_method'))
// 處理身份驗證
usePassport(app)
// 顯示Flash訊息
app.use(flash())
// 設置請求變量
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.message = req.flash('message')
  next()
})
//路由
app.use(routes)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})