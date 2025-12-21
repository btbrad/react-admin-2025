import request from '@/utils/request'
import type {
  CreateUserParams,
  DeptItem,
  DeptParams,
  EditUserParams,
  ResultData,
  UserItem,
  UserSearchParams
} from '@/types/api'

// 获取用户信息
export const getUserInfoApi = () => request.get<UserItem>('/user/getUserInfo')

// 获取用户列表
export const getUserListApi = (params: UserSearchParams) => request.get<ResultData<UserItem>>('/users/list', params)

// 创建用户
export const createUserApi = (data: CreateUserParams) => request.post('/users/create', data)

// 编辑用户
export const editUserApi = (data: EditUserParams) => request.post('/users/edit', data)

// 删除用户
export const deleteUserApi = (data: { userIds: number[] }) => request.post('/users/delete', data)

// 部门列表
export const getDeptListApi = (data: DeptParams) => request.post<DeptItem[]>('/dept/list', data)
