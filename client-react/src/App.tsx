import React, { FC, useContext, useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import { Context } from './index'
import { observer } from 'mobx-react-lite'
import { UserInterface } from './models/response/AuthResponse'
import UserService from './services/UserService'

const App: FC = () => {
  const { store } = useContext(Context)
  const [users, setUsers] = useState<UserInterface[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (e) {
      console.error(e)
    }
  }

  if (store.isLoading) {
    return <div>Loading...</div>
  }

  if (!store.isAuth) {
    return <LoginForm />
  }

  return (
    <div className="App">
      <h3>{store.isAuth ? `User authorized: ${store.user.email}` : 'Login'}</h3>
      <button onClick={() => store.logout()}>Logout</button>

      <div>
        <button onClick={getUsers}>get users</button>
      </div>
      {users.map((user) => (
        <p key={user.id}>{user.email}</p>
      ))}
    </div>
  )
}

export default observer(App)
