import request from '@/utils/request'
import type { CreateUserParams, ResultData, UserItem, UserSearchParams } from '@/types/api'

// 获取用户信息
export const getUserInfoApi = () => request.get<UserItem>('/user/getUserInfo')

// 获取用户列表
export const getUserListApi = (params: UserSearchParams) => request.get<ResultData<UserItem>>('/users/list', params)

// 创建用户
export const createUserApi = (data: CreateUserParams) => request.post('/users/create', data)
