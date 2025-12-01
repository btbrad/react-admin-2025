import request from '@/utils/request'
import type { LoginParams } from '@/types/api'

export const login = (data: LoginParams) => request.post('/login', data)
