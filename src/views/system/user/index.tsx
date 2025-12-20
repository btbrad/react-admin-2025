import { deleteUserApi, getUserListApi } from '@/api/user'
import type { PageParams, UserItem } from '@/types/api'
import { Button, Form, Input, Modal, Select, Space, Table } from 'antd'
import type { TableProps } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import CreateUser from './CreateUser'
import type { IAction } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'

const UserList: React.FC = () => {
  const [form] = Form.useForm()

  const [data, setData] = useState<UserItem[]>([])
  const [total, setTotal] = useState<number>(0)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })

  const [userIds, setUserIds] = useState<number[]>([])

  const userRef = useRef<{
    open: (type: IAction, data?: UserItem) => void
  }>(undefined)

  const getUserList = useCallback(
    async (params: PageParams) => {
      const values = form.getFieldsValue()
      const res = await getUserListApi({
        ...values,
        ...params,
        pageSize: params.pageSize || pagination.pageSize
      })
      // 假数据
      // const list = new Array(50).fill({}).map(item => {
      //   item = { ...res.list[0] }
      //   item.userId = Math.floor(Math.random() * 100000)
      //   return item
      // })
      setData(res.list)
      // setData(list)
      setTotal(res.page.total)
      // setTotal(list.length)
      // setPagination({
      //   current: res.page.pageNum,
      //   pageSize: res.page.pageSize
      // })
    },
    [form]
  )

  useEffect(() => {
    getUserList({ pageNum: pagination.current, pageSize: pagination.pageSize })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageSize, getUserList, pagination.current])

  const handleSearch = () => {
    getUserList({ pageNum: 1, pageSize: pagination.pageSize })
  }

  const handleRest = () => {
    form.resetFields()
    getUserList({ pageNum: 1, pageSize: pagination.pageSize })
  }

  // 创建用户
  const handleCreate = () => {
    userRef.current?.open('create')
  }

  // 编辑用户
  const handleEdit = (record: UserItem) => {
    userRef.current?.open('edit', record)
  }

  const handleDeleteUser = async (ids: number[]) => {
    await deleteUserApi({ userIds: ids })
    message.success('删除成功')
    setUserIds([])
    getUserList({ pageNum: 1, pageSize: pagination.pageSize })
  }

  // 删除用户
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '提示',
      content: '确定要删除该用户吗？',
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        handleDeleteUser([id])
      }
    })
  }

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    console.log(111, selectedRowKeys)
    setUserIds(selectedRowKeys.map(item => Number(item)))
  }

  // 批量删除
  const handleBatchDelete = () => {
    if (!userIds.length) {
      message.warning('请选择要删除的用户')
      return
    }
    Modal.confirm({
      title: '提示',
      content: '确定要删除选中的用户吗？',
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        handleDeleteUser(userIds)
      }
    })
  }

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
          2: '离职',
          3: '试用期'
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
      render(_, record: UserItem) {
        return (
          <Space>
            <Button variant='text' color='cyan' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDelete(record.userId)}>
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
          <Button className='mr10' type='primary' htmlType='submit' onClick={handleSearch}>
            搜索
          </Button>
          <Button type='default' onClick={handleRest}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
            <Button type='primary' danger onClick={handleBatchDelete}>
              批量删除
            </Button>
          </div>
        </div>
        <Table
          rowKey='userId'
          dataSource={data}
          columns={columns}
          bordered
          rowSelection={{ type: 'checkbox', onChange: onSelectChange, selectedRowKeys: userIds }}
          pagination={{
            current: pagination.current,
            showSizeChanger: true,
            pageSize: pagination.pageSize,
            total,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 条`,
            onChange(page, pageSize) {
              setPagination({ current: page, pageSize })
            }
          }}
        />
      </div>
      <CreateUser mRef={userRef} update={() => getUserList({ pageNum: 1, pageSize: pagination.pageSize })} />
    </div>
  )
}

export default UserList
