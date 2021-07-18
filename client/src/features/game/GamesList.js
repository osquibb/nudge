import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectGames, getGames, joinGame } from '../game/gameSlice'

import { Container, Button } from '@material-ui/core'

export default function GamesList(props) {

  const dispatch = useDispatch();
  const games = useSelector(selectGames);

  useEffect(() => dispatch(getGames()), [dispatch])

  const onJoin = gameId => dispatch(joinGame(gameId))

  return(
    <Container>
      <h2>Games List</h2>
      <ul>
        {games?.map(game =>
          <li key={game.id}>
            {game.title}
            {game.is_joined
              ? ' - Already Joined'
              : <Button color="primary" variant="outlined" onClick={() => onJoin(game.id)}>Join</Button>}
          </li>
        )}
      </ul>
    </Container>
  )
}