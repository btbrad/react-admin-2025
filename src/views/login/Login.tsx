import { login } from '@/api/login'
import type { LoginParams } from '@/types/api'
import { Button, Form, Input, App } from 'antd'
import storage from '@/utils/storage'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.less'
import { useState } from 'react'

type FieldType = {
  username?: string
  password?: string
}

const Login = () => {
  const navigate = useNavigate()
  const { message } = App.useApp()

  const [loading, setLoading] = useState(false)

  const onFinish = async (values: LoginParams) => {
    setLoading(true)
    const params = {
      username: values.username,
      password: values.password
    }
    const data = await login(params)
    setLoading(false)
    storage.set('token', data)
    message.success('登录成功')
    const searchParams = new URLSearchParams(window.location.search)
    const redirect = searchParams.get('callback') || '/'
    navigate(redirect)
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>系统登录</div>
        <Form name='basic' wrapperCol={{ span: 24 }} onFinish={onFinish} autoComplete='off'>
          <Form.Item<FieldType> name='username' rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input placeholder='请输入用户名' />
          </Form.Item>

          <Form.Item<FieldType> name='password' rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password placeholder='请输入密码' />
          </Form.Item>

          <Form.Item label={null}>
            <Button type='primary' htmlType='submit' block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
