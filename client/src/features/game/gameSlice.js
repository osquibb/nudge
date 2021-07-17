import { createSlice } from '@reduxjs/toolkit'
import gameService from '../../services/gameService'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    games: [],
    myGames: [],
    game: {}
  },
  reducers: {
    setGames: (state, { payload }) => { state.games = payload },
    setMyGames: (state, { payload }) => { state.myGames = payload },
    setGame: (state, { payload }) => { state.game = payload }
  },
})

// Action creators are generated for each reducer function
export const { setGames, setMyGames, setGame } = gameSlice.actions

// Async thunks
export const getGames = () => async dispatch => {
  try {
    const { games } = await gameService.getGames()
    dispatch(setGames(games))
  } catch (e) {
    console.error(e)
  }
}

export const getMyGames = () => async dispatch => {
  try {
    const myGames = await gameService.getMyGames()
    dispatch(setMyGames(myGames))
  } catch (e) {
    console.error(e)
  }
}

export const getGame = gameId => async dispatch => {
  try {
    const game = await gameService.getGameById(gameId)
    dispatch(setGame(game))
  } catch (e) {
    console.error(e)
  }
}

export const selectGames = state => state.game.games
export const selectMyGames = state => state.game.myGames
export const selectGame = state => state.game.game

export default gameSlice.reducer