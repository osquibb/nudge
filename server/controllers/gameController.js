const router = require('express').Router()
const {
    listGames,
    listGamesAndJoinedStatusByUserId,
    listGamesByUserId,
    findGameById,
    addGame,
    deleteGameById,
    addUserToGameByUserIdAndGameId,
    updateCoordinatesByUserIdAndGameId
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

router.get('/myGames', async ({ user }, res) => {
  // auth
  if (!isPlayer(user)) {
    return res.sendStatus(401)
  }
  // operation
  const games = await listGamesByUserId(user.id)
  res.json(games)
})

router.get('/:gameId', async ({ user, params }, res) => {
  // auth
  if (!isLoggedIn(user)) {
    return res.sendStatus(401)
  }
  // operation
  const game = await findGameById(params.gameId)
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

router.post('/:gameId/updateCoordinates', async ({ user, params, body }, res) => {
  // auth
  if (!isPlayer(user)) {
    return res.sendStatus(401)
  }
  // operation
  const coordinates = await updateCoordinatesByUserIdAndGameId(
    user.id,
    params.gameId,
    body.latitude,
    body.longitude
  )
  res.json(coordinates)
})

module.exports = router