import request from '@/utils/request'
import { useEffect } from 'react'

import './index.less'
import { Button, Form, Input } from 'antd'

type FieldType = {
  username?: string
  password?: string
}

const Login = () => {
  const onFinish = (values: unknown) => {
    console.log('Success:', values)
  }

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

  return (
    <div className='login'>
      <div className='login-wrapper'>
        <div className='title'>系统登录</div>
        <Form name='basic' wrapperCol={{ span: 24 }} onFinish={onFinish} autoComplete='off'>
          <Form.Item<FieldType> name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type='primary' htmlType='submit' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
