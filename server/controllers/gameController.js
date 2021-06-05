const router = require('express').Router()
const {
    listGames,
    listGamesByUserId,
    findGameById,
    addGame,
    deleteGameById,
    addUserToGameByUserIdAndGameId,
    updateCoordinatesByUserIdAndGameId
} = require('../services/gameService')

router.get('/', async (req, res) => {
  // auth
  // if (!req.user) {
  //   res.sendStatus(401)
  // }
  // operation
  const games = await listGames()
  res.json({ games })
})

router.get('/myList', async ({ user }, res) => {
  // auth
  // if (!req.user) {
  //   res.sendStatus(401)
  // }
  // operation
  const games = await listGamesByUserId(user.id)
  res.json(games)
})

router.get('/:id', async ({ params }, res) => {
  // auth
  // if (!req.user) {
  //   res.sendStatus(401)
  // }
  // operation
  const game = await findGameById(params.id)
  res.json(game)
})

router.post('/', async ({ body }, res) => {
  // auth
  // if (!req.user) {
  //   res.sendStatus(401)
  // }
  // operation
  const id = await addGame(
    { 
      title: body.title,
      expiration: body.expiration
    }
  )
  res.json({ id })
})

router.delete('/:id', async ({ params }, res) => {
  // auth
  // if (!req.user) {
  //   res.sendStatus(401)
  // }
  // operation
  await deleteGameById(params.id)
  res.sendStatus(200)
})

router.post('/:id/join', async ({ user, params, body }, res) => {
  // auth
  // if (!req.user) {
  //   res.sendStatus(401)
  // }
  // operation
  await addUserToGameByUserIdAndGameId(
    user.id,
    params.id,
    body.latitude,
    body.longitude
  )
  res.sendStatus(200)
})

router.post('/:id/updateCoordinates', async ({ user, params, body }, res) => {
  // auth
  // if (!req.user) {
  //   res.sendStatus(401)
  // }
  // operation
  const coordinates = await updateCoordinatesByUserIdAndGameId(
    user.id,
    params.id,
    body.latitude,
    body.longitude
  )
  res.json(coordinates)
})

module.exports = router