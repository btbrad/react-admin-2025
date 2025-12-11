import type { MutableRefObject } from 'react'
import type { UserItem } from './api'

export type IAction = 'create' | 'edit' | 'delete'

export interface IModalProps {
  mRef: MutableRefObject<{ open: (type: IAction, data?: UserItem) => void } | undefined>
  update: () => void
}
