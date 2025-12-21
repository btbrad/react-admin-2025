import { getDeptListApi } from '@/api/user'
import type { DeptItem } from '@/types/api'
import { Button, Form, Input, Space, Table, type TableProps } from 'antd'
import { useForm } from 'antd/es/form/Form'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'

const DeptList: React.FC = () => {
  const [form] = useForm()

  const [data, setData] = useState<DeptItem[]>([])

  const getDeptList = useCallback(async () => {
    const res = await getDeptListApi(form.getFieldsValue())
    setData(res)
  }, [form])

  useEffect(() => {
    getDeptList()
  }, [getDeptList])

  const handleRest = () => {
    form.resetFields()
    getDeptList()
  }

  const columns: TableProps<DeptItem>['columns'] = [
    {
      title: '名称',
      dataIndex: 'deptName',
      key: 'deptName',
      width: 200
    },
    {
      title: '负责人',
      dataIndex: 'userName',
      key: 'userName',
      width: 150
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(value: string) {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      }
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
            <Button type='text'>新增</Button>
            <Button variant='text' color='cyan'>
              编辑
            </Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  return (
    <div className='dept-list'>
      <Form className='searchForm' layout='inline' form={form}>
        <Form.Item label='部门名称' name='deptName'>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' onClick={getDeptList}>
            搜索
          </Button>
          <Button type='default' style={{ marginLeft: 8 }} onClick={handleRest}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>部门列表</div>
          <div className='action'>
            <Button type='primary'>新增</Button>
          </div>
        </div>
        <Table columns={columns} dataSource={data} pagination={false} bordered rowKey='_id' />
      </div>
    </div>
  )
}
export default DeptList
