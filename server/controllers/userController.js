const router = require('express').Router()
const passport = require('../passport')
const { addUser, listUsers } = require('../services/userService')

router.post('/', passport.authenticate('local'), async (req, res) => {
  const id = await addUser(req.user)
  res.json({ id })
})

router.get('/', passport.authenticate('local'), async (req, res) => {
  const users = await listUsers()
  res.json({ users })
})

module.exports = router