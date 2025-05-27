import { ReactNode } from 'react'
import { useSession } from '../../hooks'
import { validateUserPermissions } from '../../utils'

type Props = {
  children: ReactNode
  roles?: string[]
}

function CanAccess(props: Props) {
  const { children, roles } = props
  const { isAuthenticated, user } = useSession()
  const { hasRole } = validateUserPermissions({
    user,
    roles
  })

  if (!isAuthenticated || !hasRole) {
    return null
  }

  return <>{children}</>
}

export default CanAccess
