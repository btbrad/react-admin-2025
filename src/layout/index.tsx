import React, { useEffect } from 'react'
import { Layout, Watermark } from 'antd'
import { Outlet } from 'react-router-dom'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import SideMenu from '@/components/Menu'
import { getUserInfoApi } from '@/api/user'

import styles from './index.module.less'

const { Content, Sider } = Layout

const App: React.FC = () => {
  const getUserInfo = async () => {
    const data = await getUserInfoApi()
    console.log(data)
  }

  useEffect(() => {
    getUserInfo()
  }, [])

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
