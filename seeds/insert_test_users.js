exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      const admin = { username: 'admin', password: '123' }
      const player = { username: 'player', password: '123' }
      let adminId, playerId
      return knex.transaction(async (trx) => {
        // insert admin
        const adminResultSet = await trx.raw(
          "INSERT INTO users (username, password) VALUES (?, crypt(?, gen_salt('bf'))) RETURNING id",
          [admin.username, admin.password]
        )
        adminId = adminResultSet.rows?.[0]?.id
        await trx('user_roles').insert({
          user_id: adminId,
          role_id: trx
            .select('id')
            .from('roles')
            .where({ name: 'admin' })
            .first(),
        })

        // insert player
        const playerResultSet = await trx.raw(
          "INSERT INTO users (username, password) VALUES (?, crypt(?, gen_salt('bf'))) RETURNING id",
          [player.username, player.password]
        )
        playerId = playerResultSet.rows?.[0]?.id
        await trx('user_roles').insert({
          user_id: playerId,
          role_id: trx
            .select('id')
            .from('roles')
            .where({ name: 'player' })
            .first(),
        })
      })
    })
}
