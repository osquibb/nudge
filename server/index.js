const express = require('express')
const session = require('express-session')
const passport = require('./passport')
const WebSocket = require('ws')
const http = require('http')
const authController = require('./controllers/authController')
const userController = require('./controllers/userController')
const gameController = require('./controllers/gameController')
const { listenForNudgeNotifications } = require('./services/gameService')

const app = express()
const port = process.env.PORT || 5000
const server = http.createServer(app)

const wss = new WebSocket.Server({ server })

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

// Controllers
app.use('/auth', authController)
app.use('/users', userController)
app.use('/games', gameController)

listenForNudgeNotifications((payload) => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(payload))
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
