import { find, filter } from 'ramda'
import { createSlice } from '@reduxjs/toolkit'
import gameService from '../../services/gameService'

export const gameSlice = createSlice({
  name: 'games',
  initialState: [],
  reducers: {
    setGames: (state, { payload: games }) => games,
  }
})

// Action creators are generated for each reducer function
export const { setGames } = gameSlice.actions

// Async thunks
export const getGames = () => async dispatch => {
  try {
    const { games } = await gameService.getGames()
    dispatch(setGames(games))
  } catch (e) {
    console.error(e)
  }
}

export const joinGame = gameId => async dispatch => {
  try {
    const { games } = await gameService.joinGameById(gameId)
    dispatch(setGames(games))
  } catch (e) {
    console.error(e)
  }
}

export const selectGames = state => state.games
export const selectGameById = id => state => find(g => g.id === id, state.games)
export const selectJoinedGames = state => filter(g => g.is_joined, state.games)

export default gameSlice.reducer
