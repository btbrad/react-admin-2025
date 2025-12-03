import request from '@/utils/request'
import type { LoginParams } from '@/types/api'

// 登录
export const login = (data: LoginParams) => request.post('/login', data, { showLoading: false })
