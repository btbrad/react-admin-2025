import { MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Dropdown, Switch } from 'antd'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import storage from '@/utils/storage'

const NavHeader: React.FC = () => {
  const breadList = [
    {
      title: '首页'
    },
    {
      title: '工作台'
    }
  ]

  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: '邮箱：btbrad@163.com'
    },
    {
      key: 'logout',
      label: <a>退出</a>
    }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    console.log(key)
    if (key === 'logout') {
      storage.remove('token')
      location.href = '/#/login?callback=' + encodeURIComponent(location.href)
    }
  }

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <MenuFoldOutlined />
        <Breadcrumb items={breadList} style={{ marginLeft: '10px' }} />
      </div>
      <div className={styles.right}>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' style={{ marginRight: '10px' }} />
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <span className={styles.nickname}>BTBrad</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
