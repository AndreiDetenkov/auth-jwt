export interface UserInterface {
  email: string
  isActivated: boolean
  id: string
}

export interface AuthResponseInterface {
  accessToken: string
  refreshToken: string
  user: UserInterface
}
