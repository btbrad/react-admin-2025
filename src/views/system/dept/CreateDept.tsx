import { createDeptApi, editDeptApi, getAllUserListApi, getDeptListApi } from '@/api/user'
import type { DeptItem, EditDeptParams } from '@/types/api'
import type { IAction, IModalProps } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { Form, Input, Modal, Select, TreeSelect } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useImperativeHandle, useState } from 'react'

const CreateDept: React.FC<IModalProps<EditDeptParams | { parentId: string }>> = props => {
  const [form] = useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [deptList, setDeptList] = useState<DeptItem[]>([])
  const [userList, setUserList] = useState<{ label: string; value: string }[]>([])

  useImperativeHandle(props.mRef, () => ({ open }))

  const open = (type: IAction, data?: EditDeptParams | { parentId: string }) => {
    setAction(type)
    getDeptList()
    if (data) {
      form.setFieldsValue(data)
    }
    setVisible(true)
  }
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      if (action === 'edit') {
        await editDeptApi(form.getFieldsValue())
        message.success('编辑成功!')
      } else if (action === 'create') {
        await createDeptApi(form.getFieldsValue())
        message.success('创建成功!')
      }
      handleCancel()
      props.update()
    }
  }

  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  const getDeptList = async () => {
    const res = await getDeptListApi({})
    setDeptList(res)
  }

  const getAllUserList = async () => {
    const res = await getAllUserListApi()
    const data = res.map(item => ({
      label: item.userName,
      value: item.userName
    }))
    setUserList(data)
  }

  useEffect(() => {
    getAllUserList()
  }, [])

  return (
    <Modal
      title={action === 'create' ? '创建部门' : '编辑部门'}
      width={800}
      open={visible}
      okText='确认'
      cancelText='取消'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} labelAlign='right'>
        <Form.Item name='_id' hidden>
          <Input />
        </Form.Item>
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
        <Form.Item label='部门名称' name='deptName' rules={[{ required: true, message: '请输入部门名称' }]}>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item label='负责人' name='userName' rules={[{ required: true, message: '请选择负责人' }]}>
          <Select placeholder='请选择负责人' style={{ width: '100%' }} options={userList} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default CreateDept
