import { useNavigate } from 'react-router-dom'
import { useSession } from '../../hooks'
import { Button } from '@mui/material'

function NavBar() {
  const { signOut, isAuthenticated } = useSession()
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ backgroundColor: '#6f6f77', height: '80px' }} className='d-flex align-items-center justify-content-between w-100 px-3'>
        <h2 style={{ color: 'white' }}>Blog Management System</h2>
        {isAuthenticated && <div>
          <Button size='large' variant='outlined' onClick={signOut}>Logout</Button>
        </div>}
        {!isAuthenticated && <div>
          <Button size='large' variant='outlined' onClick={() => {navigate('/login')}}>Login</Button>
        </div>}
      </div>
    </div>
  )
}

export default NavBar
