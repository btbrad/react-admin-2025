import * as echarts from 'echarts'
import { useEffect, useRef, useState, type RefObject } from 'react'

export const useCharts = (): [RefObject<HTMLDivElement | null>, echarts.EChartsType | null] => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setChartInstance] = useState<echarts.EChartsType | null>(null)
  useEffect(() => {
    setChartInstance(echarts.init(chartRef.current as HTMLDivElement))
  }, [])
  return [chartRef, chartInstance]
}
