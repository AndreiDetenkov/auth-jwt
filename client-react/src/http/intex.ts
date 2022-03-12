import axios from 'axios'

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
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default $api
