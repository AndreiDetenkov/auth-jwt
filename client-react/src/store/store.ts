import { makeAutoObservable } from 'mobx'
import {
  AuthResponseInterface,
  UserInterface,
} from '../models/response/AuthResponse'
import AuthService from '../services/AuthService'
import axios from 'axios'
import { API_URL } from '../http/intex'

export default class Store {
  user = {} as UserInterface
  isAuth = false
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(val: boolean) {
    this.isAuth = val
  }

  setUser(user: UserInterface) {
    this.user = user
  }

  setLoading(val: boolean) {
    this.isLoading = val
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password)
      console.log(response.data)
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

  async logout() {
    try {
      await AuthService.logout()
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({} as UserInterface)
    } catch (e) {
      // @ts-ignore
      console.error(e.response?.data?.message)
    }
  }

  async checkAuth() {
    try {
      this.setLoading(true)
      const response = await axios.get<AuthResponseInterface>(
        `${API_URL}/refresh`,
        { withCredentials: true }
      )
      const { accessToken, user } = response.data

      localStorage.setItem('token', accessToken)
      this.setAuth(true)
      this.setUser(user)
    } catch (e) {
      // @ts-ignore
      console.error(e.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }
}
