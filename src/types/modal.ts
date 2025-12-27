import type { MutableRefObject } from 'react'

export type IAction = 'create' | 'edit' | 'delete'

export interface IModalProps<T> {
  mRef: MutableRefObject<{ open: (type: IAction, data?: T) => void } | undefined>
  update: () => void
}
