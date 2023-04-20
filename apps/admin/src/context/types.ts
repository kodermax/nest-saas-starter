import { RegisterInput } from "src/@core/services/accounts.service"
import { User } from "src/@core/services/user.types"

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
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
  register: (params: RegisterInput, errorCallback?: ErrCallbackType) => void
}
