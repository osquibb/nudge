import './App.css'
import Clock from './components/Clock.js'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <div className="App">
      <Clock name="My Clock" />
      <LoginForm />
    </div>
  );
}

export default App;
