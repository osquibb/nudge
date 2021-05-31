const express = require('express')
const session = require('express-session')
const passport = require('./passport')
const authController = require('./controllers/authController')
const userController = require('./controllers/userController')

const app = express()

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

// Controllers
app.use('/auth', authController)
app.use('/user', userController)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening on port ${port}`))