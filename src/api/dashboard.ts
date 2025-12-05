import type { DashboardLineData, DashboardReport } from '@/types/api'
import request from '@/utils/request'

// 获取工作台汇总数据
export const getReportDataApi = () => request.get<DashboardReport>('/order/dashboard/getReportData')

// 获取工作台折线图数据
export const getLineDataApi = () => request.get<DashboardLineData>('/order/dashboard/getLineData')
