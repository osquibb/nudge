const dotenv = require('dotenv')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { findUser, findUserById, findOrAddUserByGoogleId } = require('./services/userService')

dotenv.config()

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

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.SERVER_PORT}/auth/google/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = await findOrAddUserByGoogleId(profile.id)
    console.log('authenticated')
    return done(null, user)
  }
)

passport.use(localStrategy)
passport.use(googleStrategy)

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
