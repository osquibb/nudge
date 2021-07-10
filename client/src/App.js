import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import NavBar from './features/navigation/NavBar'

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <p>Home Route</p>
        </Route>
        <Route path="/test">
          <p>Test Route</p>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
