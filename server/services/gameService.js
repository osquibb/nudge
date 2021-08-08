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
        updated_at,
        id IN (
      		SELECT game_id
      		FROM user_games
      		WHERE user_id = ?
      	) is_joined
      FROM
        games
      `,
      [user_id]
    )
    return resultSet.rows
  },

  findGameAndJoinedStatusByGameIdAndUserId: async (game_id, user_id) => {
    const resultSet = await db.raw(
      `
      SELECT
        id,
        title,
        latitude,
        longitude,
        expiration,
        updated_at,
        id IN (
      		SELECT game_id
      		FROM user_games
      		WHERE user_id = ?
      	) is_joined
      FROM
        games
      WHERE id = ?
      `,
      [user_id, game_id]
    )
    return resultSet.rows[0]
  },

  findGameById: async id => await db('games').where({ id }).first(),

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
      const gameResultSet = await trx('games').where({ id: game_id }).update({ latitude, longitude }, ['id', 'latitude', 'longitude', 'updated_at'])
      const lastNudgeResultSet = await trx('user_games').where({ user_id, game_id }).update({ last_nudge_at: new Date() }).returning(['last_nudge_at'])
      return { game: gameResultSet[0], last_nudge_at: lastNudgeResultSet[0].last_nudge_at }
    })
}
