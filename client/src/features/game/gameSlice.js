import { map, find, filter } from 'ramda'
import { createSlice } from '@reduxjs/toolkit'
import gameService from '../../services/gameService'

export const gameSlice = createSlice({
  name: 'games',
  initialState: [],
  reducers: {
    setGames: (state, { payload: games }) => games,
  },
})

// Action creators are generated for each reducer function
const { setGames } = gameSlice.actions

// Async thunks
export const getGames = () => async (dispatch) => {
  try {
    const { games } = await gameService.getGames()
    dispatch(setGames(games))
  } catch (e) {
    console.error(e)
  }
}

export const getGameById = (gameId) => async (dispatch, getState) => {
  try {
    const game = await gameService.getGameById(gameId)
    const { games } = getState()
    dispatch(setGames(map((g) => (g.id === game.id ? game : g), games)))
  } catch (e) {
    console.error(e)
  }
}

export const joinGame = (gameId) => async (dispatch) => {
  try {
    const { games } = await gameService.joinGameById(gameId)
    dispatch(setGames(games))
  } catch (e) {
    console.error(e)
  }
}

export const nudge = (gameId, direction) => async (dispatch, getState) => {
  try {
    const {
      game: { id, latitude, longitude, updated_at },
      last_nudge_at,
    } = await gameService.nudge(gameId, direction)
    const { games } = getState()
    dispatch(
      setGames(
        map(
          (g) =>
            g.id === id
              ? { ...g, latitude, longitude, updated_at, last_nudge_at }
              : g,
          games
        )
      )
    )
  } catch (e) {
    console.error(e)
  }
}

export const selectGames = (state) => state.games
export const selectGameById = (id) => (state) =>
  find((g) => g.id === id, state.games)
export const selectJoinedGames = (state) =>
  filter((g) => g.is_joined, state.games)

export default gameSlice.reducer
