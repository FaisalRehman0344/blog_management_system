import React, { FormEvent, useState } from 'react'
import { useSession } from '../../hooks'
import { Button, createTheme, TextField, ThemeProvider } from '@mui/material'
import { useNavigate } from 'react-router-dom'


function Login() {
  const [values, setValues] = useState({ email: '', password: '' })
  const [loginRequestStatus, setLoginRequestStatus] = useState('success')
  const { signIn } = useSession()
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function register() {
    navigate('/register')
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    setLoginRequestStatus('loading')

    try {
      await signIn(values)
      setLoginRequestStatus('success')
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <div className='d-flex w-100 h-screen-full align-items-center justify-content-center'>
        <div style={{ width: '700px', height: '800px', color: 'white', backgroundColor: '#6f6f77', opacity: 5, borderRadius: '15px', padding: '1.5rem' }} className='d-center flex-column gap-5'>
          <h2>Blog Management System</h2>
          <h3>Signup</h3>
          <form onSubmit={handleSubmit} className='w-100 d-flex flex-column align-items-center justify-content-center gap-4'>
            <TextField required id="outlined-basic" fullWidth value={values.email} onChange={handleChange} label="Email" name='email' variant="outlined" />
            <TextField required id="outlined-basic" fullWidth value={values.password} onChange={handleChange} label="Password" name='password' variant="outlined" />
            <div className='d-flex gap-3'>
              <Button style={{ padding: '1rem 3rem' }} variant='outlined' onClick={register} disabled={loginRequestStatus === 'loading'}>
                {loginRequestStatus === 'loading' ? 'Loading...' : 'Register'}
              </Button>
              <Button style={{ padding: '1rem 3rem' }} variant='contained' type="submit" disabled={loginRequestStatus === 'loading'}>
                {loginRequestStatus === 'loading' ? 'Loading...' : 'Login'}
              </Button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Login
