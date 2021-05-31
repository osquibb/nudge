const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const DUMMY_USER = {
  id: 1,
  username: "john",
}

const localStrategy = new LocalStrategy((username, password, done) => {
  if (username === 'john' && password === 'doe') {
    console.log('authenticated')
    return done(null, DUMMY_USER)
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
  cb(null, DUMMY_USER)
})

module.exports = passport