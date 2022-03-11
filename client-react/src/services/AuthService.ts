import $api from '../http/intex'
import { AxiosResponse } from 'axios'
import { AuthResponseInterface } from '../models/response/AuthResponse'

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponseInterface>> {
    return $api.post<AuthResponseInterface>('/login', { email, password })
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponseInterface>> {
    return $api.post('/registration', { email, password })
  }

  static async logout(): Promise<void> {
    return $api.post('/logout')
  }
}
