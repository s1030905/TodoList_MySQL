const router = require('express').Router()
const db = require('../../models')
const Todo = db.Todo
// -------------------------------------------------detail
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    let todo = await Todo.findByPk(id)
    res.render('detail', { todo: todo.toJSON() })
  } catch (error) {
    console.log(error)
  }
})

// -------------------------------------------------edit
router.get('/:id/edit', async (req, res) => {
  try {
    const id = req.params.id
    let todo = await Todo.findByPk(id)
    res.render('edit', { todo: todo.toJSON() })
  } catch (error) {
    console.log(error)
  }
})
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    let { name, isDone } = req.body
    isDone = isDone === 'on' ? true : false
    await Todo.update({ name, isDone, updateAt: new Date() }, { where: { id } })
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

// -------------------------------------------------delete
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    await Todo.destroy({ where: { id } })
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})
module.exports = router