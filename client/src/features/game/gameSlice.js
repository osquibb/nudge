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
    setMyGames: (state, { payload: myGames }) => ({ ...state, myGames }),
    setGame: (state, { payload: game }) => ({ ...state, game })
  },
})

// Action creators are generated for each reducer function
export const { setGames, setMyGames, setGame } = gameSlice.actions

export const setGameById = gameId => async (dispatch, getState) => {
  const { game: { games } } = getState()
  const game = find(g => g.id === gameId, games)
  dispatch(setGame(game))
}

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
export const selectGame = state => state.game.game

export default gameSlice.reducer
