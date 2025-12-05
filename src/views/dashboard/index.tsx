import { Button, Card, Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'

import styles from './index.module.less'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/store'
import { getReportDataApi } from '@/api/dashboard'
import type { DashboardReport } from '@/types/api'
import { formatMoney } from '@/utils'
import { useCharts } from '@/hook/useChart'

const Dashboard: React.FC = () => {
  const userInfo = useUserStore(state => state.userInfo)

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户ID',
      children: userInfo.userId
    },
    {
      key: '2',
      label: '邮箱',
      children: userInfo.userEmail
    },
    {
      key: '3',
      label: '状态',
      children: userInfo.state === 1 ? '在职' : '离职'
    },
    {
      key: '4',
      label: '手机号',
      children: userInfo?.mobile
    },
    {
      key: '5',
      label: '岗位',
      children: userInfo.job
    },
    {
      key: '6',
      label: '部门',
      children: userInfo.deptName
    }
  ]

  const [report, setReport] = useState<DashboardReport>()

  const getReportData = async () => {
    const res = await getReportDataApi()
    setReport(res)
  }

  // 初始化折线图
  const [lineRef, lineChart] = useCharts()
  // 初始化饼图
  const [pieCityRef, pieCityChart] = useCharts()
  const [pieAgeRef, pieAgeChart] = useCharts()
  // 初始化雷达图
  const [radarRef, radarChart] = useCharts()

  useEffect(() => {
    lineChart?.setOption({
      legend: {
        data: ['订单数量', '流水'],
        show: true,
        top: '5%'
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单数量',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        },
        {
          name: '流水',
          data: [220, 332, 401, 534, 690, 730, 220],
          type: 'line',
          smooth: true
        }
      ]
    })

    pieCityChart?.setOption({
      title: {
        text: '司机城市分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '司机数量',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '北京' },
            { value: 735, name: '上海' },
            { value: 580, name: '天津' },
            { value: 484, name: '重庆' },
            { value: 300, name: '深圳' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })

    pieAgeChart?.setOption({
      title: {
        text: '司机年龄分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        right: 'right'
      },
      roseType: 'area',
      series: [
        {
          name: '司机数量',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '20岁' },
            { value: 735, name: '30岁' },
            { value: 580, name: '40岁' },
            { value: 484, name: '50岁' },
            { value: 300, name: '60岁' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })

    radarChart?.setOption({
      title: {
        text: '司机模型诊断'
      },
      legend: {
        data: ['司机模型诊断']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '服务态度' },
          { name: '在线时长' },
          { name: '接单率' },
          { name: '评分' },
          { name: '关注度' }
        ]
      },
      series: [
        {
          name: '司机模型诊断',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: '司机模型诊断'
            }
          ]
        }
      ]
    })
  }, [lineChart, pieCityChart, pieAgeChart, radarChart])

  useEffect(() => {
    getReportData()
  }, [])

  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img className={styles.userImg} src='https://api.dicebear.com/7.x/miniavs/svg?seed=1' alt='avatar' />
        <Descriptions title='欢迎！' items={items} />
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>{report?.driverCount}个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>{formatMoney(report?.totalMoney.toString() || '0')}元</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总订单</div>
          <div className={styles.data}>{report?.orderCount}单</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>{report?.cityNum}座</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card title='订单和流水走势图' extra={<Button type='primary'>刷新</Button>}>
          <div ref={lineRef} className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='司机分布' extra={<Button type='primary'>刷新</Button>}>
          <div className={styles.pieChart}>
            <div ref={pieCityRef} className={styles.itemChart}></div>
            <div ref={pieAgeRef} className={styles.itemChart}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='模型诊断' extra={<Button type='primary'>刷新</Button>}>
          <div ref={radarRef} className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}
export default Dashboard
