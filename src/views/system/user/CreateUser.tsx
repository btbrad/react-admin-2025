import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Select, Upload, type GetProp, type UploadProps } from 'antd'
import { useState } from 'react'
import storage from '@/utils/storage'
import { message } from '@/utils/AntdGlobal'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const CreateUser: React.FC = () => {
  const [form] = Form.useForm()

  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOk = async () => {
    await form.validateFields()
  }

  const handleCancel = () => {}

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
