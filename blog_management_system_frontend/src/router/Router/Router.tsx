import { Routes, Route } from 'react-router-dom'
import { useRoutePaths } from '../..//hooks'
import { Home, Login, Register } from '../../pages'
import { PrivateRoute } from '../PrivateRoute'
import { PublicRoute } from '../PublicRoute'

function Router() {
  const {
    LOGIN_PATH,
    REGISTER_PATH,
    ROOT_PATH,
  } = useRoutePaths()

  return (
    <Routes>
      <Route
        path={ROOT_PATH}
        element={
          <Home />
        }
      />

      <Route
        path={LOGIN_PATH}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route path={REGISTER_PATH} element={<Register />} />

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  )
}

export default Router
