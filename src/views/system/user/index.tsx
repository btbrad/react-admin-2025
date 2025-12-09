import { getUserListApi } from '@/api/user'
import type { PageParams, UserItem } from '@/types/api'
import { Button, Form, Input, Select, Space, Table } from 'antd'
import type { TableProps } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'

const UserList: React.FC = () => {
  const [form] = Form.useForm()

  const [data, setData] = useState<UserItem[]>([])
  const [total, setTotal] = useState<number>(0)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })

  const getUserList = useCallback(
    async (params: PageParams) => {
      const values = form.getFieldsValue()
      const res = await getUserListApi({
        ...values,
        ...params
      })
      // 假数据
      const list = new Array(50).fill({}).map(item => {
        item = { ...res.list[0] }
        item.userId = Math.floor(Math.random() * 100000)
        return item
      })
      setData(list)
      setTotal(res.page.total)
      setPagination({
        current: res.page.pageNum,
        pageSize: res.page.pageSize
      })
    },
    [form]
  )

  useEffect(() => {
    getUserList({ pageNum: 1, pageSize: pagination.pageSize })
  }, [pagination.pageSize, getUserList])

  const columns: TableProps<UserItem>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render(value: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[value]
      }
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render(value: number) {
        return {
          1: '在职',
          2: '试用期',
          3: '离职'
        }[value]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(value: string) {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      }
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
      <Form className='searchForm' form={form} layout='inline' initialValues={{ state: 0 }}>
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
        <Table rowKey='userId' dataSource={data} columns={columns} bordered rowSelection={{ type: 'checkbox' }} />
      </div>
    </div>
  )
}

export default UserList
