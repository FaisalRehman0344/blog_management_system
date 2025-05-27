import { AxiosError } from 'axios'
import { createContext } from 'react'
import { User } from 'types'

export type SignInCredentials = {
  email: string
  password: string
}

export type RegisterProps = {
  name: string
  email: string
  password: string
}

export type AuthContextData = {
  user?: User
  isAuthenticated: boolean
  loadingUserData: boolean
  signIn: (credentials: SignInCredentials) => Promise<void | AxiosError>
  signOut: () => void
  register: (details: RegisterProps,cb:any) => void
}

const AuthContext = createContext({} as AuthContextData)

export default AuthContext
