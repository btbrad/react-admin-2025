import ReactDom from 'react-dom/client'
import Loading from './loading'

// 请求计数
let count = 0
export const showLoading = (tip?: string) => {
  if (count > 0) return
  const dom = document.createElement('div')
  dom.setAttribute('id', 'loading')
  document.body.appendChild(dom)
  ReactDom.createRoot(dom).render(<Loading tip={tip} />)
  count++
}

export const hideLoading = () => {
  if (count < 0) return
  count--
  // if (count !== 0) return
  const dom = document.getElementById('loading')
  if (dom) {
    document.body.removeChild(dom)
  }
}
