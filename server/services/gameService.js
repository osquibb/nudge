const db = require('../../db')

module.exports = {
  listGames: async () => await db('games').select(),

  listGamesAndJoinedStatusByUserId: async user_id => {
    const resultSet = await db.raw(
      `
      SELECT
        id,
        title,
        latitude,
        longitude,
        expiration,
        last_nudge_at,
        user_id IS NOT NULL as is_joined
      FROM
        games
      LEFT OUTER JOIN
        user_games
      ON
        games.id = user_games.game_id
      WHERE
        user_id IS NULL OR user_id = ?
      `,
      [user_id]
    )
    return resultSet.rows
  },

  listGamesByUserId : async user_id =>
    await db('games').innerJoin('user_games', 'games.id', 'user_games.game_id').where({ user_id }),

  findGameAndJoinedStatusByGameIdAndUserId: async (game_id, user_id) => {
    const resultSet = await db.raw(
      `
      SELECT
        id,
        title,
        latitude,
        longitude,
        expiration,
        last_nudge_at,
        user_id IS NOT NULL as is_joined
      FROM
        games
      LEFT OUTER JOIN
        user_games
      ON
        games.id = user_games.game_id
      WHERE
        id = ? AND (user_id IS NULL OR user_id = ?)
      `,
      [game_id, user_id]
    )
    return resultSet.rows[0]
  },

  addGame: async ({ title, expiration = null }) => {
    const resultSet = await db('games').insert({ title, expiration }).returning('id')
    return resultSet[0]
  },

  deleteGameById: async id => await db('games').where({ id }).del(),

  addUserToGameByUserIdAndGameId: async (user_id, game_id) =>
    await db('user_games').insert({ user_id, game_id }),

  nudge: async (user_id, game_id, direction) =>
    await db.transaction(async trx => {
      let { latitude, longitude } = await trx.select('latitude', 'longitude').from('games').where({ id: game_id }).first()
      latitude = parseFloat(latitude)
      longitude = parseFloat(longitude)
      switch (direction) {
        case 'NORTH':
          latitude += 0.01
          break
        case 'SOUTH':
          latitude -= 0.01
          break
        case 'EAST':
          longitude += 0.01
          break
        case 'WEST':
          longitude -= 0.01
          break
      }
      const gameResultSet = await trx('games').where({ id: game_id }).update({ latitude, longitude }, ['id', 'latitude', 'longitude'])
      const lastNudgeResultSet = await trx('user_games').where({ user_id, game_id }).update({ last_nudge_at: new Date() }).returning(['last_nudge_at'])
      return { game: gameResultSet[0], last_nudge_at: lastNudgeResultSet[0].last_nudge_at }
    })
}
