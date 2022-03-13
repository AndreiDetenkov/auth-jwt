import axios from 'axios'
import { AuthResponseInterface } from '../models/response/AuthResponse'

export const API_URL = 'http://localhost:9000/api'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('token')
    // @ts-ignore
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : ''
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

$api.interceptors.response.use(
  function (config) {
    return config
  },
  async function (error) {
    const originalRequest = error.config

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true

      try {
        const {
          data: { accessToken },
        } = await axios.get<AuthResponseInterface>(`${API_URL}/refresh`, {
          withCredentials: true,
        })
        localStorage.setItem('token', accessToken)
        return $api.request(originalRequest)
      } catch (e) {
        console.error('Not authorized')
      }
    }

    return Promise.reject(error)
  }
)

export default $api
