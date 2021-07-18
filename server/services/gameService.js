const db = require('../../db')

module.exports = {
  listGames: async () => await db('games').select(),

  listGamesAndJoinedStatusByUserId: async user_id => {
  const resultSet = await db.raw('SELECT id, title, expiration, user_id IS NOT NULL as is_joined FROM games LEFT OUTER JOIN user_games ON games.id = user_games.game_id WHERE user_id IS NULL OR user_id = ?', [user_id])
  return resultSet.rows
  },

  listGamesByUserId : async user_id =>
    await db('games').innerJoin('user_games', 'games.id', 'user_games.game_id').where({ user_id }),
  
  findGameById: async id => await db('games').where('id', id).first(),

  addGame: async ({ title, expiration = null }) => {
    const resultSet = await db('games').insert({ title, expiration }).returning('id')
    return resultSet[0]
  },

  deleteGameById: async id => await db('games').where({ id }).del(),

  addUserToGameByUserIdAndGameId: async (user_id, game_id, latitude = 0.0, longitude = 0.0) =>
    await db('user_games').insert({ user_id, game_id, latitude, longitude }),

  updateCoordinatesByUserIdAndGameId: async (user_id, game_id, latitude, longitude) => {
    const resultSet = await db('user_games').update({ latitude, longitude }).where({ user_id, game_id }).returning('*')
    return resultSet[0]
  }
}