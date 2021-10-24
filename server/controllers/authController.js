require('dotenv').config()
const router = require('express').Router()
const passport = require('../passport')
const { isLoggedIn } = require('../utils/authUtils')

router.post('/login', passport.authenticate('local'), ({ user }, res) => {
  res.json(user)
})

router.get('/google/login', passport.authenticate('google', { scope: ['profile'] }))

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  ({ user }, res) => {
    res.json(user)
    // res.redirect(`http://localhost:${process.env.CLIENT_PORT}`)
  }
)

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
