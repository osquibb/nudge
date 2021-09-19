const db = require('../../db')

const nudgeDelay = 10000
const nudgeAmount = 0.01

module.exports = {
  listGames: async () => await db('games').select(),

  listGamesAndJoinedStatusByUserId: async (user_id) => {
    const resultSet = await db.raw(
      `
      SELECT
      	id,
      	title,
      	latitude,
      	longitude,
      	expiration,
      	updated_at,
      	last_nudge_at,
      	COALESCE (is_joined, false) is_joined
      FROM
      	games
      LEFT OUTER JOIN (
      	SELECT
      		game_id,
      		last_nudge_at,
      		true AS is_joined
      	FROM
      		user_games
      	WHERE
      		user_id = ?
      ) joined_games
      	ON games.id = joined_games.game_id
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
      	last_nudge_at,
      	COALESCE (is_joined, false) is_joined
      FROM
      	games
      LEFT OUTER JOIN (
      	SELECT
      		game_id,
      		last_nudge_at,
      		true AS is_joined
      	FROM
      		user_games
      	WHERE
      		user_id = ?
      ) joined_games
      	ON games.id = joined_games.game_id
      WHERE
        id = ?
      `,
      [user_id, game_id]
    )
    return resultSet.rows[0]
  },

  findGameById: async (id) => await db('games').where({ id }).first(),

  addGame: async ({ title, expiration = null }) => {
    const resultSet = await db('games')
      .insert({ title, expiration })
      .returning('id')
    return resultSet[0]
  },

  deleteGameById: async (id) => await db('games').where({ id }).del(),

  addUserToGameByUserIdAndGameId: async (user_id, game_id) =>
    await db('user_games').insert({ user_id, game_id }),

  nudge: async (user_id, game_id, direction) =>
    await db.transaction(async (trx) => {
      let {
        latitude,
        longitude,
        last_nudge_at: prev_last_nudge_at,
      } = await trx
        .select('latitude', 'longitude', 'last_nudge_at')
        .from('games')
        .innerJoin('user_games', 'games.id', 'user_games.game_id')
        .where({ id: game_id })
        .first()

      if (new Date() - prev_last_nudge_at < nudgeDelay) {
        throw new Error(
          `Unable to nudge, try again later.  Nudge delay ${nudgeDelay}`
        )
      }

      latitude = parseFloat(latitude)
      longitude = parseFloat(longitude)
      switch (direction) {
        case 'NORTH':
          latitude += nudgeAmount
          break
        case 'SOUTH':
          latitude -= nudgeAmount
          break
        case 'EAST':
          longitude += nudgeAmount
          break
        case 'WEST':
          longitude -= nudgeAmount
          break
      }
      const gameResultSet = await trx('games')
        .where({ id: game_id })
        .update({ latitude, longitude }, [
          'id',
          'latitude',
          'longitude',
          'updated_at',
        ])
      const lastNudgeResultSet = await trx('user_games')
        .where({ user_id, game_id })
        .update({ last_nudge_at: new Date() })
        .returning(['last_nudge_at'])
      const [game, last_nudge_at] = [
        gameResultSet[0],
        lastNudgeResultSet[0].last_nudge_at,
      ]
      await trx.raw("SELECT pg_notify('nudge', ?)", [
        { ...game, last_nudge_at },
      ])

      return { game, last_nudge_at }
    }),

  listenForNudgeNotifications: async (cb) => {
    console.log('Listening for nudge notifications')
    const connection = await db.client.acquireConnection()
    connection.query('LISTEN nudge')
    connection.on('notification', ({ payload }) => cb(payload))
    await db.client.releaseConnection(connection)
  },
}
