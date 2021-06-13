const router = require('express').Router()
const passport = require('../passport')
const { isAnonymous } = require('../utils/authUtils')

router.post('/login', passport.authenticate('local'), ({ user }, res) => {
  res.json({
    ...user,
    isAuthenticated: !!user
  })
})

router.get('/logout', (req, res) => {
  if (isAnonymous(req.user)) {
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