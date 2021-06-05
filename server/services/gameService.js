const db = require('../../db')

module.exports = {
  listGames: async () => await db('games').select(),

  listGamesByUserId : async userId =>
    await db('games').innerJoin('coordinates', 'games.id', 'coordinates.game_id').where({ user_id: userId }),
  
  findGameById: async id => await db('games').where('id', id).first(),

  addGame: async ({ title, expiration = null }) => {
    const resultSet = await db('games').insert({ title, expiration }).returning('id')
    return resultSet[0]
  },

  deleteGameById: async id => await db('games').where({ id }).del(),

  addUserToGameByUserIdAndGameId: async (userId, gameId, latitude = 0.0, longitude = 0.0) =>
    await db('coordinates').insert({ user_id: userId, game_id: gameId, latitude, longitude }),

  updateCoordinatesByUserIdAndGameId: async (userId, gameId, latitude, longitude) => {
    const resultSet = await db('coordinates').update({ latitude, longitude }).where({ user_id: userId, game_id: gameId }).returning('*')
    return resultSet[0]
  }
}