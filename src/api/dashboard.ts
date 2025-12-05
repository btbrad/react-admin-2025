import type { DashboardReport } from '@/types/api'
import request from '@/utils/request'

export const getReportDataApi = () => request.get<DashboardReport>('/order/dashboard/getReportData')
