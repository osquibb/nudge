const db = require('../../db')

module.exports = {
  listGames: async () => await db('games').select(),

  listGamesByUserId : async user_id =>
    await db('games').innerJoin('coordinates', 'games.id', 'coordinates.game_id').where({ user_id }),
  
  findGameById: async id => await db('games').where('id', id).first(),

  addGame: async ({ title, expiration = null }) => {
    const resultSet = await db('games').insert({ title, expiration }).returning('id')
    return resultSet[0]
  },

  deleteGameById: async id => await db('games').where({ id }).del(),

  addUserToGameByUserIdAndGameId: async (user_id, game_id, latitude = 0.0, longitude = 0.0) =>
    await db('coordinates').insert({ user_id, game_id, latitude, longitude }),

  updateCoordinatesByUserIdAndGameId: async (user_id, game_id, latitude, longitude) => {
    const resultSet = await db('coordinates').update({ latitude, longitude }).where({ user_id, game_id }).returning('*')
    return resultSet[0]
  }
}