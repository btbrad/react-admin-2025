import type { DashboardLineData, DashboardPieData, DashboardRadarData, DashboardReport } from '@/types/api'
import request from '@/utils/request'

// 获取工作台汇总数据
export const getReportDataApi = () => request.get<DashboardReport>('/order/dashboard/getReportData')

// 获取工作台折线图数据
export const getLineDataApi = () => request.get<DashboardLineData>('/order/dashboard/getLineData')

// 获取城市分布数据
export const getPieCityDataApi = () => request.get<DashboardPieData>('/order/dashboard/getPieCityData')

// 获取年龄分布数据
export const getPieAgeDataApi = () => request.get<DashboardPieData>('/order/dashboard/getPieAgeData')

// 获取雷达图数据
export const getRadarDataApi = () => request.get<DashboardRadarData>('/order/dashboard/getRadarData')
