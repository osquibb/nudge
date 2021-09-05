const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { findUser, findUserById } = require('./services/userService')

const localStrategy = new LocalStrategy(async (username, password, done) => {
  const user = await findUser({ username, password })
  if (!!user) {
    console.log('authenticated')
    return done(null, user)
  } else {
    console.log('incorrect credentials')
    return done(null, false)
  }
})

passport.use(localStrategy)

passport.serializeUser((user, done) => {
  console.log(`serializeUser ${user.id}`)
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await findUserById(id)
  console.log(`deserializeUser ${user.id}`)
  done(null, user)
})

module.exports = passport
