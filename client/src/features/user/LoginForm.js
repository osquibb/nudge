import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../user/userSlice'
import { Container, TextField, Button } from '@material-ui/core'

export default function LoginForm({ onSignIn }) {
  const dispatch = useDispatch()

  const initialUser = { username: '', password: '' }
  const [user, setUser] = useState(initialUser)

  const onUsernameChange = username => setUser(prevUser =>
    ({ ...prevUser, username })
  )

  const onPasswordChange = password => setUser(prevUser =>
    ({ ...prevUser, password })
  )

  const signIn = () => {
    dispatch(login(user.username, user.password))
    onSignIn()
  }

  return(
    <Container>
      <TextField
        value={user.username}
        label="Username"
        required
        onChange={e => onUsernameChange(e.target.value)}
      />
      <TextField
        value={user.password}
        label="Password"
        required
        type="password"
        onChange={e => onPasswordChange(e.target.value)}
      />
      <Button onClick={signIn}>
        Sign In
      </Button>
    </Container>
  )

}
