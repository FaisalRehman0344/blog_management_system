import { TextField, Button, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import { useSession } from "hooks";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [values, setValues] = useState({ email: '', password: '', name: '', role: '' })
  const [loginRequestStatus, setLoginRequestStatus] = useState('success')
  const { register } = useSession()
  const navigate = useNavigate();

  function handleChange(event: any) {
    const { name, value } = event.target

    setValues({
      ...values,
      [name]: value
    })
  }

  function signin() {
    navigate('/login')
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    setLoginRequestStatus('loading')

    try {
      register(values, () => {
        setLoginRequestStatus('success')
        navigate('/')
      })
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
          <TextField required fullWidth value={values.name} onChange={handleChange} label="Name" name='name' variant="outlined" />
          <TextField required fullWidth value={values.email} onChange={handleChange} label="Email" name='email' variant="outlined" />
          <TextField required fullWidth value={values.password} onChange={handleChange} label="Password" name='password' variant="outlined" />

          <FormControl fullWidth required>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={values.role}
              label="Role"
              name="role"
              onChange={handleChange}
            >
              <MenuItem value='author'>Author</MenuItem>
              <MenuItem value='admin'>Admin</MenuItem>
            </Select>
          </FormControl>

          <div className="d-flex gap-3">
            <Button style={{ padding: '1rem 3rem' }} variant='outlined' onClick={signin} disabled={loginRequestStatus === 'loading'}>
              {loginRequestStatus === 'loading' ? 'Loading...' : 'Login'}
            </Button>
            <Button style={{ padding: '1rem 3rem' }} variant='contained' type="submit" disabled={loginRequestStatus === 'loading'}>
              {loginRequestStatus === 'loading' ? 'Loading...' : 'Signup'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
