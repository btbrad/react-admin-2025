import { Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'

import styles from './index.module.less'

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: '用户ID',
    children: '100001'
  },
  {
    key: '2',
    label: '邮箱',
    children: 'test@example.com'
  },
  {
    key: '3',
    label: '状态',
    children: '在职'
  },
  {
    key: '4',
    label: '手机号',
    children: '13899990000'
  },
  {
    key: '5',
    label: '岗位',
    children: '前端工程师'
  },
  {
    key: '5',
    label: '部门',
    children: '大前端'
  }
]

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img className={styles.userImg} src='https://api.dicebear.com/7.x/miniavs/svg?seed=1' alt='avatar' />
        <Descriptions title='欢迎！' items={items} />
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>100个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>10000元</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总订单</div>
          <div className={styles.data}>2000单</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>50座</div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard
