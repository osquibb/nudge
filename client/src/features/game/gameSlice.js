import { find } from 'ramda'
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
    setGames: (state, { payload: games }) => ({ ...state, games}),
    setMyGames: (state, { payload: myGames }) => ({ ...state, myGames })
  }
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

export const joinGame = gameId => async dispatch => {
  try {
    const { games } = await gameService.joinGameById(gameId)
    dispatch(setGames(games))
  } catch (e) {
    console.error(e)
  }
}

export const selectGames = state => state.game.games
export const selectGameById = id => state => find(g => g.id === id, state.game.games)

export default gameSlice.reducer
