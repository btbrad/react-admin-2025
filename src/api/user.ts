import request from '@/utils/request'
import type {
  CreateUserParams,
  DeptItem,
  DeptParams,
  EditUserParams,
  ResultData,
  UserItem,
  UserSearchParams,
  CreateDeptParams,
  EditDeptParams,
  DeleteDeptParams
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

// 创建部门
export const createDeptApi = (data: CreateDeptParams) => request.post('/dept/create', data)

// 编辑部门
export const editDeptApi = (data: EditDeptParams) => request.post('/dept/edit', data)

// 删除部门
export const deleteDeptApi = (data: DeleteDeptParams) => request.post('/dept/delete', data)

// 所有用户列表
export const getAllUserListApi = () => request.get<ResultData<UserItem>>('/users/all/list')
