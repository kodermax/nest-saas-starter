// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams } from './types'
import { authMe, login, logout } from 'src/@core/services/auth.service'
import { register, RegisterInput } from 'src/@core/services/accounts.service'
import { User } from 'src/@core/services/user.types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<User | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      if (localStorage.getItem('userData')) {
        setLoading(true)
        try {
          const response = await authMe()
          setUser({ ...response.data })
          setLoading(false)
        } catch {
          localStorage.removeItem('userData')
          setUser(null)
          setLoading(false)
          if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
            router.replace('/login')
          }
        }
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (params: LoginParams) => {
    const response = await login(params)
    if (response) {
      setUser({ ...response.data })
      window.localStorage.setItem('userData', JSON.stringify(response.data))
      const returnUrl = router.query.returnUrl as string
      const redirectURL = returnUrl && returnUrl !== '/' && returnUrl.indexOf('.') < 0 ? returnUrl : '/'
      router.replace(redirectURL as string)
    }
  }

  const handleLogout = async () => {
    await logout()
    setUser(null)
    window.localStorage.removeItem('userData')
    router.push('/login')
  }

  const handleRegister = async (params: RegisterInput) => {
    const response = await register(params)
    setUser({ ...response.data })
    window.localStorage.setItem('userData', JSON.stringify(response.data))
    router.replace('/')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
