import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const NoAuth: React.FC = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <Result
      status='403'
      title='403'
      subTitle='抱歉，您没有访问权限。'
      extra={
        <Button type='primary' onClick={handleClick}>
          回到首页
        </Button>
      }
    />
  )
}

export default NoAuth
