import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Container } from '@material-ui/core';
import NavBar from './features/navigation/NavBar'

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Container>
            <p>Home Route</p>
          </Container>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
