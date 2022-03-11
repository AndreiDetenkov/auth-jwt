import $api from '../http/intex'
import { AxiosResponse } from 'axios'
import { UserInterface } from '../components/models/response/AuthResponse'

export default class AuthService {
  static async fetchUsers(): Promise<AxiosResponse<UserInterface[]>> {
    return $api.get<UserInterface[]>('/users')
  }
}
