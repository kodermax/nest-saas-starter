import { User } from "src/@core/services/auth.service"

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type UserDataType = {
  id: number
  role: string
  email: string
  firstName: string
  lastName: string
  middleName: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: User | null
  setLoading: (value: boolean) => void
  setUser: (value: User | null) => void
  login: (params: LoginParams) => Promise<void>
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}
