import request from '@/utils/request'
import { useEffect } from 'react'

const Login = () => {
  const handleLogin = () => {
    request
      .post('/login', {
        username: 'admin',
        password: '123456'
      })
      .then(data => {
        console.log('Login successful:', data)
      })
      .catch(error => {
        console.error('Login failed:', error)
      })
  }

  useEffect(() => {
    handleLogin()
  }, [])

  return <div>Login Page</div>
}

export default Login
