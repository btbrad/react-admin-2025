import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Select, Upload, type GetProp, type UploadProps } from 'antd'
import { useImperativeHandle, useState } from 'react'
import storage from '@/utils/storage'
import { message } from '@/utils/AntdGlobal'
import type { IAction, IModalProps } from '@/types/modal'
import type { UserItem } from '@/types/api'
import { createUserApi, editUserApi } from '@/api/user'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const CreateUser: React.FC<IModalProps> = props => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(false)

  useImperativeHandle(props.mRef, () => ({
    open
  }))

  const open = (type: IAction, data?: UserItem) => {
    setAction(type)
    setVisible(true)
    if (type === 'edit' && data) {
      form.setFieldsValue(data)
      setImg(data.userImg || '')
    }
  }

  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params = {
        ...form.getFieldsValue(),
        userImg: img
      }
      if (action === 'create') {
        await createUserApi(params)
        message.success('创建成功!')
        handleCancel()
        props.update()
      } else if (action === 'edit') {
        // 编辑用户接口待补充
        await editUserApi(params)
        message.success('编辑成功!')
        handleCancel()
        props.update()
      }
    }
  }

  const handleCancel = () => {
    setVisible(false)
    setImg('')
    form.resetFields()
  }

  // 上传之前，接口处理
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的图片!')
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小不能超过2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  // 上传后，图片处理
  const handleUploadChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log(info)
      if (info.file.response.code === 1) {
        const url = info.file.response.data.file
        setImg(url)
        setLoading(false)
        message.success('上传成功!')
      } else {
        message.error('上传失败!')
      }
    } else if (info.file.status === 'error') {
      setLoading(false)
      message.error('服务器异常，请稍后重试!')
    }
  }

  return (
    <Modal
      title='创建用户'
      width={800}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='确认'
      cancelText='取消'
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} labelAlign='right'>
        <Form.Item name='userId' hidden>
          <Input />
        </Form.Item>

        <Form.Item label='用户名称' name='userName' rules={[{ required: true, message: '请输入用户名称' }]}>
          <Input placeholder='请输入用户名称' />
        </Form.Item>

        <Form.Item label='用户邮箱' name='userEmail' rules={[{ required: true, message: '请输入用户邮箱' }]}>
          <Input placeholder='请输入用户邮箱' disabled={action === 'edit'} />
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

        <Form.Item label='用户头像'>
          <Upload
            listType='picture-circle'
            showUploadList={false}
            headers={{
              Authorization: 'Bearer ' + storage.get('token')
            }}
            action='http://localhost:3001/users/upload'
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
            style={{ overflow: 'hidden' }}
          >
            {img ? (
              <img src={img} alt='avatar' style={{ width: '100%' }} />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div>上传头像</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUser
