const router = require('express').Router()
const passport = require('../passport')
const { addUser, listUsers } = require('../services/userService')

router.post('/', async (req, res) => {
  const id = await addUser(req.body)
  res.json({ id })
})

router.get('/', passport.authenticate('local'), async (req, res) => {
  const users = await listUsers()
  res.json({ users })
})

module.exports = router