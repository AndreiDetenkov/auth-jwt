import React, { FC, useContext, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import { Context } from './index'
import { observer } from 'mobx-react-lite'

const App: FC = () => {
  const { store } = useContext(Context)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      store.checkAuth()
    }
  }, [])

  if (!store.isAuth) {
    return <LoginForm />
  }

  return (
    <div className="App">
      <h3>{store.isAuth ? `User authorized: ${store.user.email}` : 'Login'}</h3>
      <button onClick={() => store.logout()}>Logout</button>
    </div>
  )
}

export default observer(App)
