import React from 'react'
import { Layout, Watermark } from 'antd'
import { Outlet } from 'react-router-dom'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import SideMenu from '@/components/Menu'

import styles from './index.module.less'

const { Content, Sider } = Layout

const App: React.FC = () => {
  return (
    <Watermark content='React'>
      <Layout>
        <Sider>
          <SideMenu />
        </Sider>
        <Layout>
          <NavHeader />
          <Content className={styles.content}>
            <div className={styles.wrapper}>
              <Outlet />
            </div>
            <NavFooter />
          </Content>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
