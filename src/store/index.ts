import type { UserItem } from '@/types/api'
import { create } from 'zustand'

export const useUserStore = create<{
  token: string
  userInfo: {
    userEmail: string
    userName: string
  }
  updateUserInfo: (userInfo: UserItem) => void
}>(set => {
  {
    return {
      token: '',
      userInfo: {
        userEmail: '',
        userName: ''
      },
      updateUserInfo: (userInfo: UserItem) =>
        set(() => ({
          userInfo
        }))
    }
  }
})
