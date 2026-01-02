import { getMenuListApi } from '@/api/menu'
import type { EditMenuParams, MenuItem } from '@/types/api'
import { Button, Form, Input, Select, Space, Table, type TableProps } from 'antd'
import dayjs from 'dayjs'
import { useCallback, useEffect, useRef, useState } from 'react'
import CreateMenu from './CreateMenu'
import type { IAction } from '@/types/modal'

const MenuList: React.FC = () => {
  const [form] = Form.useForm()

  const [data, setData] = useState<MenuItem[]>([])

  const getMenuList = useCallback(async () => {
    const data = await getMenuListApi(form.getFieldsValue())
    setData(data)
  }, [form])

  useEffect(() => {
    getMenuList()
  }, [getMenuList])

  const handleReset = () => {
    form.resetFields()
    getMenuList()
  }

  const menuRef = useRef<{
    open: (type: IAction, data?: EditMenuParams | { parentId: string }) => void
  }>(undefined)

  const columns: TableProps<MenuItem>['columns'] = [
    {
      title: '名称',
      dataIndex: 'menuName',
      key: 'menuName'
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      width: 150
    },
    {
      title: '类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render(value: number) {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面'
        }[value]
      }
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode'
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component'
    },
    {
      title: '状态',
      dataIndex: 'menuState',
      key: 'menuState',
      width: 150
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(value: string) {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '操作',
      key: 'action',
      render() {
        return (
          <Space>
            <Button color='primary' variant='link'>
              新增
            </Button>
            <Button variant='link' color='cyan'>
              编辑
            </Button>
            <Button type='link' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  const handleCreate = () => {
    menuRef.current?.open('create')
  }

  return (
    <div className='menu-list'>
      <Form form={form} className='searchForm' layout='inline'>
        <Form.Item label='菜单名称' name='MenuName'>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        <Form.Item label='菜单状态' name='MenuState'>
          <Select
            allowClear
            style={{ width: 120 }}
            placeholder='请选择状态'
            options={[
              { value: 1, label: '正常' },
              { value: 2, label: '停用' }
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' onClick={getMenuList}>
            搜索
          </Button>
          <Button type='default' style={{ marginLeft: 8 }} onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>部门列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table columns={columns} dataSource={data} pagination={false} bordered rowKey='_id' />
      </div>
      <CreateMenu mRef={menuRef} update={getMenuList} />
    </div>
  )
}

export default MenuList
