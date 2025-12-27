import type { DeptItem } from '@/types/api'
import type { IAction } from '@/types/modal'
import { Form, Input, Modal, Select, TreeSelect } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'

const CreateDept: React.FC = () => {
  const [form] = useForm()
  const [action, setAction] = useState<IAction>('create')
  const [deptList, setDeptList] = useState<DeptItem[]>([])

  const handleSubmit = () => {
    console.log('提交')
  }

  const handleCancel = () => {
    console.log('取消')
  }

  return (
    <Modal
      title={action === 'create' ? '创建部门' : '编辑部门'}
      width={800}
      open={true}
      okText='确认'
      cancelText='取消'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} labelAlign='right'>
        <Form.Item label='上级部门' name='parentId'>
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            styles={{
              popup: {
                root: { maxHeight: 400, overflow: 'auto' }
              }
            }}
            placeholder='请选择上级部门'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'deptName', value: '_id' }}
            treeData={deptList}
          />
        </Form.Item>
        <Form.Item label='部门名称' name='deptName'>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item label='负责人' name='userName'>
          <Select
            placeholder='请选择负责人'
            style={{ width: '100%' }}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true }
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default CreateDept
