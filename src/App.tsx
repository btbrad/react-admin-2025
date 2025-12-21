import { RouterProvider } from 'react-router-dom'
import router from './router/index.tsx'
import { ConfigProvider, App as AntdApp } from 'antd'
import AntdGlobal from './utils/AntdGlobal.ts'

import zhCN from 'antd/locale/zh_CN'

// for date-picker i18n
import 'dayjs/locale/zh-cn'

import './App.less'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ed6c00'
        }
      }}
      locale={zhCN}
    >
      <AntdApp>
        <AntdGlobal />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
