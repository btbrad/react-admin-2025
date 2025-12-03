import { MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Dropdown, Switch } from 'antd'
import styles from './index.module.less'

const NavHeader: React.FC = () => {
  const breadList = [
    {
      title: '首页'
    },
    {
      title: '工作台'
    }
  ]

  const items = [
    {
      key: '1',
      label: '邮箱：btbrad@163.com'
    },
    {
      key: '2',
      label: <a>退出</a>
    }
  ]

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <MenuFoldOutlined />
        <Breadcrumb items={breadList} style={{ marginLeft: '10px' }} />
      </div>
      <div className={styles.right}>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' style={{ marginRight: '10px' }} />
        <Dropdown menu={{ items }} trigger={['click']}>
          <span className={styles.nickname}>BTBrad</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
