import { User } from "types"


type Params = {
  user?: User
  permissions?: string[]
  roles?: string[]
}

export function validateUserPermissions(params: Params) {
  const { user, roles } = params

  let hasRole = true

  if (roles?.length && !!user) {
    hasRole = roles.includes(user.role)
  }

  return { hasRole }
}
