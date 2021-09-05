const router = require('express').Router()
const passport = require('../passport')
const { isLoggedIn } = require('../utils/authUtils')

router.post('/login', passport.authenticate('local'), ({ user }, res) => {
  res.json(user)
})

router.get('/logout', (req, res) => {
  if (!isLoggedIn(req.user)) {
    return res.sendStatus(401)
  }
  req.logOut()
  res.sendStatus(200)
})

router.get('/user', ({ user }, res) => {
  if (!isLoggedIn(user)) {
    return res.sendStatus(401)
  }
  res.json(user)
})

module.exports = router
