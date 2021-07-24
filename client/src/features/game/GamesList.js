import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectGames, getGames } from '../game/gameSlice'
import { Container, Grid } from '@material-ui/core'
import GameCard from './GameCard'

export default function GamesList() {

  const dispatch = useDispatch();
  const games = useSelector(selectGames);

  useEffect(() => dispatch(getGames()), [dispatch])

  return(
    <Container>
      <h2>Games List</h2>
      <Grid container spacing='3'>
        {games?.map(game =>
          <Grid item key={game.id}>
            <GameCard game={game} />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
