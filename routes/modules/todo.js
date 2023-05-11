const router = require('express').Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const UserId = req.user.id
    let todos = await Todo.findByPk(id)
    res.render('index', { todos })
  } catch (error) {
    console.log(error)
  }

})

module.exports = router