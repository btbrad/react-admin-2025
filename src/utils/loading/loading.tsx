import { Spin } from 'antd'

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4
}

const content = <div style={contentStyle} />

export default function Loading({ tip = 'loading' }: { tip?: string }) {
  return (
    <Spin tip={tip} fullscreen>
      {content}
    </Spin>
  )
}
