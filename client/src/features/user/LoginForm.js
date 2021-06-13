import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { login, selectUser } from '../user/userSlice'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function LoginForm() {
  const authenticatedUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const initialUser = { username: '', password: '' }
  const [user, setUser] = useState(initialUser)

  const onUsernameChange = username => setUser(prevUser => 
    ({ ...prevUser, username })
  )

  const onPasswordChange = password => setUser(prevUser =>
    ({ ...prevUser, password })
  )

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
      <Button
        color="primary"
        onClick={() => dispatch(login(user.username, user.password))}
      >
        Sign In
      </Button>
      <p>
        {authenticatedUser.username && `Current User: ${authenticatedUser.username}`}
      </p>
    </Container>
  )

}