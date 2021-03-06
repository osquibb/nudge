import axios from 'axios'

const gameService = {
  getGames: async () => {
    const { data: games } = await axios.get('/games')
    return games
  },
  getGameById: async (gameId) => {
    const { data: game } = await axios.get(`/games/${gameId}`)
    return game
  },
  joinGameById: async (gameId) => {
    const { data: games } = await axios.post(`/games/${gameId}/join`)
    return games
  },
  nudge: async (gameId, direction) => {
    const { data: games } = await axios.post(`/games/${gameId}/nudge`, {
      direction,
    })
    return games
  },
}

export default gameService
