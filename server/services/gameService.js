const db = require('../../db')

module.exports = {
  listGames: async () => await db('games').select(),
  
  findGameById: async id => {
    const resultSet = await db('games').where('id', id)
    return resultSet[0]
  },

  addGame: async ({ title, expiration = null }) => {
    const resultSet = await db('games').insert({ title, expiration }).returning('id')
    return resultSet[0]
  },

  deleteGameById: async id => await db('games').where({ id }).del(),

  addUserToGameByUserIdAndGameId: async (userId, gameId, latitude = 0.0, longitude = 0.0) =>
    await db('coordinates').insert({ userId, gameId, latitude, longitude }),

  updateCoordinatesByUserIdAndGameId: async (userId, gameId, latitude, longitude) => {
    const resultSet = await db('coordinates').where({ userId, gameId }).update({ latitude, longitude }).returning('*')
    return resultSet[0]
  }
}