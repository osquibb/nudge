import './App.css'
import { React, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getUser } from './features/user/userSlice'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Container } from '@material-ui/core'
import NavBar from './features/navigation/NavBar'
import GameList from './features/game/GameList'
import GameDetails from './features/game/GameDetails'

function App() {
  const dispatch = useDispatch()
  useEffect(() => dispatch(getUser()), [dispatch])

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Container>
            <p>Home Route</p>
          </Container>
        </Route>
        <Route exact path="/games">
          <GameList />
        </Route>
        <Route path="/games/:id">
          <GameDetails />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
