import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import NavBar from './components/navigation/NavBar'
import Clock from './components/Clock'
import Login from './components/Login'

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Container>
          <Route exact path="/">
            <Clock name="test" />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Container>
      </Switch>
    </Router>
  )
}

export default App;
