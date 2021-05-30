module.exports = {

  development: {
    client: 'pg',
    debug: true,
    connection: {
      host: '127.0.0.1',
      port: '5432',
      user : 'nudge_admin',
      password : 'password',
      database : 'nudge'
    }
  },

  staging: {
    // TODO
  },

  production: {
    // TODO
  }

}
