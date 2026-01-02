import type { MenuItem } from '@/types/api'
import type { IAction, IModalProps } from '@/types/modal'
import { Form, Input, Modal } from 'antd'
import { useImperativeHandle, useState } from 'react'

const CreateMenu: React.FC<IModalProps<MenuItem>> = props => {
  const [form] = Form.useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)

  useImperativeHandle(props.mRef, () => ({
    open
  }))

  const open = (action: IAction, data?: MenuItem) => {
    setAction(action)
    if (data) {
      form.setFieldsValue(data)
    }
    setVisible(true)
  }

  const handleOK = () => {}

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <Modal title={action === 'create' ? '创建菜单' : '编辑菜单'} open={visible} onOk={handleOK} onCancel={handleCancel}>
      <Form form={form}>
        <Form.Item label='菜单名称'>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateMenu
