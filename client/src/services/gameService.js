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
  joinGameById: async gameId => await axios.post(`/games/${gameId}/join`),
  updateCoordinates: async (gameId, latitude, longitude) => {
    const { data: coordinates } = await axios.post(`/games/${gameId}/updateCoordinates`, { latitude, longitude })
    return coordinates
  }
}

export default gameService