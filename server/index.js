const express = require('express')
const session = require('express-session')
const passport = require('./passport')
const ws = require('express-ws')
const authController = require('./controllers/authController')
const userController = require('./controllers/userController')
const gameController = require('./controllers/gameController')

const app = express()

// WebSocket
ws(app)

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

// Controllers
app.use('/auth', authController)
app.use('/users', userController)
app.use('/games', gameController)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening on port ${port}`))
