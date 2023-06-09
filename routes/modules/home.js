const router = require('express').Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/', async (req, res) => {
  try {
    const UserId = req.user.id
    let todos = await Todo.findAll({ where: { UserId }, raw: true, nest: true })
    res.render('index', { todos })
  } catch (error) {
    console.log(error)
  }

})

module.exports = router