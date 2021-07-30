import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectGames, selectJoinedGames, getGames } from '../game/gameSlice'
import { Container, Grid } from '@material-ui/core'
import GameCard from './GameCard'

export default function GameList({ joinedOnly }) {

  let history = useHistory()

  const dispatch = useDispatch()
  const allGames = useSelector(selectGames)
  const joinedGames = useSelector(selectJoinedGames)

  useEffect(() => dispatch(getGames()), [dispatch])

  const goToGame = gameId => {
    history.push(`/games/${gameId}`)
  }

  return(
    <Container>
      <h2>Games List</h2>
      <Grid container spacing={3}>
        {(joinedOnly ? joinedGames : allGames)?.map(game =>
          <Grid item key={game.id}>
            <GameCard game={game} onClick={() => goToGame(game.id)} />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
