const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { findUser } = require('./services/userService')

const localStrategy = new LocalStrategy(async (username, password, done) => {
  const user = await findUser({ username, password })
  if (!!user) {
    console.log('authenticated')
    console.log('user: ', user)
    return done(null, user)
  } else {
    console.log('incorrect credentials')
    return done(null, false)
  }
})

passport.use(localStrategy)

passport.serializeUser((user, cb) => {
  console.log(`serializeUser ${user.id}`)
  cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  console.log(`deserializeUser ${id}`)
  cb(null, id)
})

module.exports = passport