import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectGames, getGames } from '../game/gameSlice'

import { Container } from '@material-ui/core'

export default function GamesList(props) {

  const dispatch = useDispatch();
  const games = useSelector(selectGames);

  useEffect(() => dispatch(getGames()), [dispatch])

  return(
    <Container>
      <h2>Games List</h2>
      <ul>
        {games.map(game => <li>{game.title}</li>)}
      </ul>
    </Container>
  )
}