import { MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Dropdown, Switch } from 'antd'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import storage from '@/utils/storage'
import { useUserStore } from '@/store'

const NavHeader: React.FC = () => {
  const store = useUserStore()

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
      label: `邮箱：${store.userInfo.userEmail}`
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
          <span className={styles.nickname}>{store.userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
