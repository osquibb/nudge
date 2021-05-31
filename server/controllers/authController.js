const router = require('express').Router()
const passport = require('../passport')

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({
    isAuthenticated: true,
    user: req.user
  })
})

router.get('/logout', (req, res) => {
  req.logOut()
  res.sendStatus(200)
})

router.get('/status', (req, res) => {
  res.json({
    isAuthenticated: !!req.user,
    user: req.user,
    sessionId: !!req.user ? req.session?.id : undefined
  })
})

module.exports = router