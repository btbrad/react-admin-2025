import { message } from 'antd'
import axios, { AxiosError } from 'axios'
import { hideLoading, showLoading } from './loading'
import storage from './storage'
import type { Result } from '@/types/api'

// 创建实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后重试',
  withCredentials: true
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    showLoading()
    const token = storage.get('token')
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: Result<any> = response.data
    if (data.code === 401) {
      message.error(data.msg)
      storage.remove('token')
      window.location.href = '/login'
    } else if (data.code !== 1) {
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
