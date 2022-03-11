import React, { FC, useState } from 'react'

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Email"
        type="text"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
        type="password"
      />
      <button>Login</button>
      <button>Registration</button>
    </div>
  )
}

export default LoginForm
