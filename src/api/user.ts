import request from '@/utils/request'
import type { ResultData, UserItem, UserSearchParams } from '@/types/api'

// 获取用户信息
export const getUserInfoApi = () => request.get<UserItem>('/user/getUserInfo')

// 获取用户列表
export const getUserListApi = (params: UserSearchParams) => request.get<ResultData<UserItem>>('/users/list', params)
