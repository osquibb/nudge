module.exports = {
  isLoggedIn: user => user,
  
  isAdmin: user => user?.roles?.includes('admin'),

  isPlayer: user => user?.roles?.includes('player')
}