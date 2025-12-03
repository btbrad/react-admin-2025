import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import logo from '../../assets/images/react.svg'

import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const SideMenu: React.FC = () => {
  const items: MenuItem[] = [
    { key: '1', icon: <DesktopOutlined />, label: '工作台' },
    {
      key: '2',
      icon: <SettingOutlined />,
      label: '系统管理',
      children: [
        {
          key: '3',
          label: '用户管理',
          icon: <TeamOutlined />
        }
      ]
    }
  ]

  const navigate = useNavigate()
  const backHome = () => {
    navigate('/')
  }

  return (
    <div>
      <div className={styles.logo} onClick={backHome}>
        <img src={logo} alt='logo' />
        <span>React Admin</span>
      </div>
      <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode='inline' theme='dark' items={items} />
    </div>
  )
}
export default SideMenu
