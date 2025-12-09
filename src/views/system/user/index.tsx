import type { UserItem } from '@/types/api'
import { Button, Form, Input, Select, Space, Table } from 'antd'
import type { TableProps } from 'antd'

const UserList: React.FC = () => {
  const dataSource: UserItem[] = [
    {
      createId: 1,
      deptId: '1',
      deptName: '开发部',
      role: 1,
      roleList: '1',
      state: 1,
      userEmail: 'zhangsan@example.com',
      userId: 1,
      userImg: 'https://example.com/avatar.png',
      userName: '张三',
      _id: '1',
      mobile: '13800000000',
      job: '前端开发'
    },
    {
      createId: 1,
      deptId: '1',
      deptName: '开发部',
      role: 1,
      roleList: '1',
      state: 1,
      userEmail: 'zhangsan@example.com',
      userId: 1,
      userImg: 'https://example.com/avatar.png',
      userName: '张三',
      _id: '1',
      mobile: '13800000000',
      job: '前端开发'
    }
  ]

  const columns: TableProps<UserItem>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'id'
    },
    {
      title: '名称',
      dataIndex: 'userName',
      key: 'name'
    },
    {
      title: '邮箱',
      dataIndex: 'userEmail',
      key: 'email'
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state'
    },
    {
      title: '注册时间',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '操作',
      key: 'operation',
      render() {
        return (
          <Space>
            <Button type='text'>编辑</Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  return (
    <div className='userList'>
      <Form className='searchForm' layout='inline' initialValues={{ state: 0 }}>
        <Form.Item name='userId' label='用户ID'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select
            allowClear
            style={{ width: 120 }}
            placeholder='请选择状态'
            options={[
              { label: '所有', value: 0 },
              { label: '在职', value: 1 },
              { label: '试用期', value: 2 },
              { label: '离职', value: 3 }
            ]}
          />
        </Form.Item>
        <Form.Item label={null}>
          <Button className='mr10' type='primary' htmlType='submit'>
            搜索
          </Button>
          <Button type='default'>重置</Button>
        </Form.Item>
      </Form>
      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary'>新增</Button>
            <Button type='primary' danger>
              批量删除
            </Button>
          </div>
        </div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  )
}

export default UserList
