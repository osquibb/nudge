import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, selectUser } from '../user/userSlice'
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
      {!authenticatedUser.id && <span>
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
      </span>}
      <Button
        color="primary"
        onClick={() => dispatch(authenticatedUser.id ? logout() : login(user.username, user.password))}
      >
        {`Sign ${authenticatedUser.id ? 'Out' : 'In'}`}
      </Button>
      {authenticatedUser.id && <div>
        <p>
          Current User: {authenticatedUser.username}
        </p>
        <h4>
          Roles
        </h4>
        <ul>
          {authenticatedUser.roles?.map(role => <li key={role.name}>{role.name}</li>)}
        </ul>
      </div>}
    </Container>
  )

}