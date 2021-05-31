const router = require('express').Router()
const passport = require('../passport')
const { addUser, listUsers } = require('../services/userService')

router.post('/', async (req, res) => {
  const id = await addUser(req.body)
  res.json({ id })
})

router.get('/', async (req, res) => {
  // auth
  if (!req.user) {
    res.sendStatus(401)
  }
  // operation
  const users = await listUsers()
  res.json({
    test: 'hello',
    users
  })
})

module.exports = router