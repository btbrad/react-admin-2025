import type { MenuItem } from '@/types/api'

/**
 * 格式化金额
 * @param num
 * @returns
 */
export const formatMoney = (num: number | string) => {
  const a = parseFloat(num.toString())
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

/**
 * 获取页面路径
 */
export const getMenuPath = (list: MenuItem[]): string[] => {
  return list.reduce<string[]>((prev: string[], next: MenuItem) => {
    if (next.children && next.children.length && !next.buttons) {
      return [...prev, ...getMenuPath(next.children)]
    } else {
      return next.path ? [...prev, next.path] : prev
    }
  }, [])
}
