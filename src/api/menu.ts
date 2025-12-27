import type { CreateMenuParams, DeleteMenuParams, EditMenuParams, MenuItem, MenuQueryParams } from '@/types/api'
import request from '@/utils/request'

// 菜单列表
export const getMenuListApi = (params?: MenuQueryParams) => request.get<MenuItem[]>('/menu/list', params)

// 创建菜单
export const createMenuApi = (data: CreateMenuParams) => request.post('/menu/create', data)

// 编辑菜单
export const editMenuApi = (data: EditMenuParams) => request.post('/menu/edit', data)

// 删除菜单
export const deleteMenuApi = (data: DeleteMenuParams) => request.post('/menu/delete', data)
