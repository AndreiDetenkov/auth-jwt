import $api from '../http/intex'
import { AxiosResponse } from 'axios'
import { UserInterface } from '../models/response/AuthResponse'

export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<UserInterface[]>> {
    return $api.get<UserInterface[]>('/users')
  }
}
