const router = require('express').Router()
const passport = require('../passport')
const { isAnonymous } = require('../utils/authUtils')

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({
    isAuthenticated: true,
    user: req.user
  })
})

router.get('/logout', ({ user }, res) => {
  if (isAnonymous(user)) {
    res.sendStatus(401)
  }
  req.logOut()
  res.sendStatus(200)
})

router.get('/status', ({ user, session }, res) => {
  if (isAnonymous(user)) {
    res.sendStatus(401)
  }
  res.json({
    isAuthenticated: !!user,
    user,
    sessionId: !!user ? session?.id : undefined
  })
})

module.exports = router