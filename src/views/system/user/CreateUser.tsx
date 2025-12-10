import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'

const CreateUser: React.FC = () => {
  const [form] = Form.useForm()

  const handleOk = async () => {
    await form.validateFields()
  }

  const handleCancel = () => {}

  return (
    <Modal
      title='创建用户'
      width={800}
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='确认'
      cancelText='取消'
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} labelAlign='right'>
        <Form.Item label='用户名称' name='userName' rules={[{ required: true, message: '请输入用户名称' }]}>
          <Input placeholder='请输入用户名称' />
        </Form.Item>

        <Form.Item label='用户邮箱' name='userEmail' rules={[{ required: true, message: '请输入用户邮箱' }]}>
          <Input placeholder='请输入用户邮箱' />
        </Form.Item>

        <Form.Item label='手机号' name='mobile'>
          <Input type='number' placeholder='请输入手机号' />
        </Form.Item>

        <Form.Item label='部门' name='deptId' rules={[{ required: true, message: '请选择部门' }]}>
          <Input placeholder='请输入部门' />
        </Form.Item>

        <Form.Item label='岗位' name='job'>
          <Input placeholder='请输入岗位' />
        </Form.Item>

        <Form.Item label='状态' name='state'>
          <Select
            allowClear
            placeholder='请选择状态'
            options={[
              { label: '在职', value: 1 },
              { label: '离职', value: 2 },
              { label: '试用期', value: 3 }
            ]}
          />
        </Form.Item>

        <Form.Item label='角色' name='roleList'>
          <Input placeholder='请输入角色' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUser
