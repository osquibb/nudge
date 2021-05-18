import React, { useState } from 'react'

export default function LoginForm(props) {

  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const onUsernameChange = username => setUser({
    ...user,
    username
  })
  

  const onPasswordChange = password => setUser({
    ...user,
    password
  })

  return(
    <div>
      <h3>Login</h3>
      <form>
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={e => onUsernameChange(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={e => onPasswordChange(e.target.value)}
        />
      </form>
    </div>
  )
}

