import { MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Dropdown, Switch } from 'antd'

const NavHeader: React.FC = () => {
  const breadList = [
    {
      title: '首页'
    },
    {
      title: '工作台'
    }
  ]

  return (
    <div className='nav-header'>
      <div className='left'>
        <MenuFoldOutlined />
        <Breadcrumb items={breadList} />;
      </div>
      <div className='right'>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' />
        <Dropdown menu={{ items }}>
          <span>BTBrad</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
