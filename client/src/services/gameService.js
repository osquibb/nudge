import axios from 'axios'

const gameService = {
  getGames: async () => {
    const { data: games } = await axios.get('/games')
    return games
  },
  getMyGames: async () => {
    const { data: myGames } = await axios.get('/games/myGames')
    return myGames
  },
  getGameById: async gameId => {
    const { data: game } = await axios.get(`/games/${gameId}`)
    return game
  },
  joinGameById: async gameId => {
    const { data: games } = await axios.post(`/games/${gameId}/join`)
    return games
  },
}

export default gameService
