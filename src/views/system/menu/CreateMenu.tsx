import { createMenuApi, editMenuApi, getMenuListApi } from '@/api/menu'
import type { EditMenuParams, MenuItem } from '@/types/api'
import type { IAction, IModalProps } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Form, Input, InputNumber, Modal, Radio, TreeSelect } from 'antd'
import type { CheckboxGroupProps } from 'antd/es/checkbox'
import { useImperativeHandle, useState } from 'react'

const CreateMenu: React.FC<IModalProps<MenuItem>> = props => {
  const [form] = Form.useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [menuList, setMenuList] = useState<MenuItem[]>([])

  const menuTypeOptions: CheckboxGroupProps<number>['options'] = [
    {
      label: '菜单',
      value: 1
    },
    {
      label: '按钮',
      value: 2
    },
    {
      label: '页面',
      value: 3
    }
  ]

  const menuStateOptions: CheckboxGroupProps<number>['options'] = [
    {
      label: '正常',
      value: 1
    },
    {
      label: '禁用',
      value: 2
    }
  ]

  const getMenuList = async () => {
    const res = await getMenuListApi()
    setMenuList(res)
  }

  useImperativeHandle(props.mRef, () => ({
    open
  }))

  const open = (action: IAction, data?: EditMenuParams | { parentId: string }) => {
    getMenuList()
    setAction(action)
    if (data) {
      form.setFieldsValue(data)
    }
    setVisible(true)
  }

  const handleOK = async () => {
    const valid = await form.validateFields()
    if (!valid) return
    const values = form.getFieldsValue()
    if (action === 'create') {
      await createMenuApi(values)
      message.success('创建成功!')
    } else {
      await editMenuApi(values)
      message.success('编辑成功!')
    }
    handleCancel()
    props.update()
  }

  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  return (
    <Modal
      title={action === 'create' ? '创建菜单' : '编辑菜单'}
      width={800}
      open={visible}
      onOk={handleOK}
      onCancel={handleCancel}
      okText='确认'
      cancelText='取消'
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        labelAlign='right'
        initialValues={{
          _id: '',
          menuName: '',
          menuType: 1,
          menuState: 1,
          menuCode: '',
          parentId: '',
          path: '',
          component: '',
          sort: 3,
          icon: ''
        }}
      >
        <Form.Item name='_id' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='父级菜单' name='parentId'>
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            styles={{
              popup: {
                root: { maxHeight: 400, overflow: 'auto' }
              }
            }}
            placeholder='请选择父级菜单'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'menuName', value: '_id' }}
            treeData={menuList}
          />
        </Form.Item>
        <Form.Item label='菜单类型' name='menuType'>
          <Radio.Group options={menuTypeOptions} />
        </Form.Item>
        <Form.Item label='菜单名称' name='menuName' rules={[{ required: true, message: '请输入菜单名称' }]}>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() => {
            return form.getFieldValue('menuType') === 2 ? (
              <Form.Item label='权限标识' name='menuCode' rules={[{ required: true, message: '请输入权限标识' }]}>
                <Input placeholder='权限标识' />
              </Form.Item>
            ) : (
              <>
                <Form.Item label='菜单图标' name='icon'>
                  <Input placeholder='请输入菜单图标' />
                </Form.Item>
                <Form.Item label='路由地址' name='path'>
                  <Input placeholder='请输入路由地址' />
                </Form.Item>
              </>
            )
          }}
        </Form.Item>
        <Form.Item label='组件名称' name='component'>
          <Input placeholder='请输入组件名称' />
        </Form.Item>
        <Form.Item label='排序' name='sort' tooltip={{ title: '数字越小越靠前', icon: <InfoCircleOutlined /> }}>
          <InputNumber min={0} max={10} defaultValue={3} />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Radio.Group options={menuStateOptions} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateMenu
