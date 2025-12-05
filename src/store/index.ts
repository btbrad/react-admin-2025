import type { UserItem } from '@/types/api'
import { create } from 'zustand'

export const useUserStore = create<{
  token: string
  userInfo: UserItem
  updateUserInfo: (userInfo: UserItem) => void
}>(set => {
  {
    return {
      token: '',
      userInfo: {
        _id: '',
        userId: 0,
        userName: '',
        userEmail: '',
        deptId: '',
        state: 0,
        role: 0,
        roleList: '',
        createId: 0,
        deptName: '',
        userImg: '',
        mobile: '',
        job: ''
      },
      updateUserInfo: (userInfo: UserItem) =>
        set(() => ({
          userInfo
        }))
    }
  }
})
