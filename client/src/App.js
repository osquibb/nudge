import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import NavBar from './features/navigation/NavBar'

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Container>
          <Route exact path="/">
            <p>Home Route</p>
          </Route>
          <Route path="/test">
            <p>Test Route</p>
          </Route>
        </Container>
      </Switch>
    </Router>
  )
}

export default App;
