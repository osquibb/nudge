const hasRole = (user, role) => user?.roles?.map((r) => r.name).includes(role)

module.exports = {
  isLoggedIn: (user) => user,

  isAdmin: (user) => hasRole(user, 'admin'),

  isPlayer: (user) => hasRole(user, 'player'),
}
