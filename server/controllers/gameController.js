const router = require('express').Router()
const {
    listGames,
    findGameById,
    listGamesAndJoinedStatusByUserId,
    findGameAndJoinedStatusByGameIdAndUserId,
    addGame,
    deleteGameById,
    addUserToGameByUserIdAndGameId,
    nudge
} = require('../services/gameService')
const { isLoggedIn, isAdmin, isPlayer } = require('../utils/authUtils')

router.get('/', async ({ user }, res) => {
  // auth
  if (!isLoggedIn(user)) {
    return res.sendStatus(401)
  }
  // operation
  const games = await listGamesAndJoinedStatusByUserId(user.id)
  res.json({ games })
})

router.get('/:gameId', async ({ user, params }, res) => {
  // auth
  if (!isLoggedIn(user)) {
    return res.sendStatus(401)
  }
  // operation
  const game = await findGameAndJoinedStatusByGameIdAndUserId(params.gameId, user.id)
  res.json(game)
})

router.post('/', async ({ user, body }, res) => {
  // auth
  if (!isAdmin(user)) {
    return res.sendStatus(401)
  }
  // operation
  const id = await addGame(
    {
      title: body.title,
      expiration: body.expiration
    }
  )
  res.json({ id })
})

router.delete('/:gameId', async ({ user, params }, res) => {
  // auth
  if (!isAdmin(user)) {
    return res.sendStatus(401)
  }
  // operation
  await deleteGameById(params.gameId)
  res.sendStatus(200)
})

router.post('/:gameId/join', async ({ user, params }, res) => {
  // auth
  if (!isPlayer(user)) {
    return res.sendStatus(401)
  }
  // operation
  await addUserToGameByUserIdAndGameId(user.id, params.gameId)
  const games = await listGamesAndJoinedStatusByUserId(user.id)
  res.json({ games })
})

router.post('/:gameId/nudge', async ({ user, params, body, app }, res) => {

  // auth
  if (!isPlayer(user)) {
    return res.sendStatus(401)
  }
  // operation
  const game = await findGameAndJoinedStatusByGameIdAndUserId(params.gameId, user.id)
  if (!game.is_joined) {
    return res.sendStatus(401)
  }
  const resp = await nudge(
    user.id,
    params.gameId,
    body.direction
  )
  // send nudged game via WebSocket
  app.ws(`/games/${params.gameId}`, async ws => {
    const game = await findGameById(params.gameId)
    ws.send(JSON.stringify(game))
  })

  res.json(resp)
})

module.exports = router
