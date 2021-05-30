const express = require('express')
const session = require('express-session')
const knex = require('knex')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const db = knex({
  client: 'pg',
  debug: true,
  connection: {
    host: '127.0.0.1',
    port: '5432',
    user : 'nudge_admin',
    password : 'password',
    database : 'nudge'
  }
})

const app = express()

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

const port = process.env.PORT || 5000

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`))

try {
  db('users').insert({ username: 'john_doe', password: '12345' })
} catch (e) {
  console.error(e)
}

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

app.get('/health', (req, res) => {
  const isAuthenticated = !!req.user
  if (isAuthenticated) {
    console.log(`user is authenticated, session is ${req.session.id}`)
    res.json({
      health: 'OK'
    })
  } else {
    res.send(401)
  }
})

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({
    authenticated: true,
    user: req.user
  })
})

app.get('/logout', (req, res) => {
  req.logOut()
  res.send(200)
})