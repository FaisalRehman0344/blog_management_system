import { ReactNode, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { AuthContext, SignInCredentials } from '../../contexts'
import { paths } from '../../router'
import { api, setAuthorizationHeader } from '../../services'
import { createSessionCookies, getRefreshToken, getToken, removeSessionCookies } from '../../utils'
import { User } from 'types'
import { RegisterProps } from 'contexts/AuthContext/AuthContext'

type Props = {
  children: ReactNode
}

function AuthProvider(props: Props) {
  const { children } = props

  const [user, setUser] = useState<User>()
  const [loadingUserData, setLoadingUserData] = useState(true)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const token = getToken()
  const isAuthenticated = Boolean(token)

  async function signIn(params: SignInCredentials) {
    const { email, password } = params

    try {
      const response = await api.post('/auth/login', { email, password })
      const { user, tokens } = response.data

      createSessionCookies({ token: tokens.access.token, refreshToken: tokens.refresh.token })
      setUser(user)
      setAuthorizationHeader({ request: api.defaults, token: tokens.access.token })
    } catch (error) {
      const err = error as AxiosError
      return err
    }
  }

  async function register(details: RegisterProps,cb:any) {

    try {
      const response = await api.post('/auth/register', details)
      const { user, tokens } = response.data

      createSessionCookies({ token: tokens.access.token, refreshToken: tokens.refresh.token })
      setUser(user)
      setAuthorizationHeader({ request: api.defaults, token: tokens.access.token })
      cb();
    } catch (error) {
      const err = error as AxiosError
      return err
    }
  }

  async function signOut() {

    const refreshToken = getRefreshToken();

    try {
      await api.post('/auth/logout', { refreshToken });
    } catch (error) {
      const err = error as AxiosError
      return err
    }

    removeSessionCookies()
    setUser(undefined)
    setLoadingUserData(false)
    navigate(paths.LOGIN_PATH)
  }

  useEffect(() => {
    if (!token) {
      removeSessionCookies()
      setUser(undefined)
      setLoadingUserData(false)
    }
  }, [navigate, pathname, token])

  useEffect(() => {
    const token = getToken()

    async function getUserData() {
      setLoadingUserData(true)

      try {
        const response = await api.get('/me')

        if (response?.data) {
          const { user } = response.data
          setUser(user)
        }
      } catch (error) {
        /**
         * an error handler can be added here
         */
      } finally {
        setLoadingUserData(false)
      }
    }

    if (token) {
      setAuthorizationHeader({ request: api.defaults, token })
      getUserData()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loadingUserData,
        signIn,
        register,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
