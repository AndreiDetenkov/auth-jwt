import { makeAutoObservable } from 'mobx'
import { UserInterface } from '../models/response/AuthResponse'
import AuthService from '../services/AuthService'

export default class Store {
  user = {} as UserInterface
  isAuth = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(val: boolean) {
    this.isAuth = val
  }

  setUser(user: UserInterface) {
    this.user = user
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password)
      const { accessToken, user } = response.data
      localStorage.setItem('token', accessToken)
      this.setAuth(true)
      this.setUser(user)
    } catch (e) {
      // @ts-ignore
      console.error(e.response?.data?.message)
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password)
      const { accessToken, user } = response.data
      localStorage.setItem('token', accessToken)
      this.setAuth(true)
      this.setUser(user)
    } catch (e) {
      // @ts-ignore
      console.error(e.response?.data?.message)
    }
  }

  async logout(email: string, password: string) {
    try {
      const response = await AuthService.logout()
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({} as UserInterface)
    } catch (e) {
      // @ts-ignore
      console.error(e.response?.data?.message)
    }
  }
}
