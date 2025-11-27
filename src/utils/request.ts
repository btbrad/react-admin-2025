import { message } from 'antd'
import axios, { AxiosError } from 'axios'
import { hideLoading, showLoading } from './loading'
import { useNavigate } from 'react-router-dom'

// 创建实例
const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后重试',
  withCredentials: true
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    showLoading()
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return {
      ...config
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    hideLoading()
    const data = response.data
    if (data.code === 401) {
      message.error(data.msg)
      localStorage.removeItem('token')
      useNavigate()('/login')
    } else if (data.code !== 200) {
      message.error(data.msg)
      return Promise.reject(data)
    }
    return data.data
  },
  (error: AxiosError) => {
    hideLoading()
    message.error(error.message)
    return Promise.reject(error)
  }
)

export default {
  get<T>(url: string, params: unknown): Promise<T> {
    return instance.get(url, { params })
  },
  post<T>(url: string, data: unknown): Promise<T> {
    return instance.post(url, data)
  }
}
