import { ReactNode, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorState, Loader } from '../../components'
import { useSession } from '../../hooks'
import { validateUserPermissions } from '../../utils'

type Props = {
  roles?: string[]
  redirectTo?: string
  children: ReactNode
}

function PrivateRoute(props: Props) {
  const { roles, redirectTo = '/login', children } = props

  const { isAuthenticated, user, loadingUserData } = useSession()
  const { hasRole } = validateUserPermissions({
    user,
    roles
  })

  if (loadingUserData) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />
  }

  if (!hasRole) {
    return <Navigate to="/" />
  }

  return (
    <ErrorBoundary
      fallback={<ErrorState text="An error occurred in the application." />}
    >
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default PrivateRoute
