import request from '@/utils/request'
import type { UserItem } from '@/types/api'

// 获取用户信息
export const getUserInfoApi = () => request.get<UserItem>('/user/getUserInfo')
