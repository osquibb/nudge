module.exports = {
  isAnonymous: user => !user,
  
  isAdmin: user => user.roles?.includes('admin'),

  isPlayer: user => user.roles?.includes('player')
}